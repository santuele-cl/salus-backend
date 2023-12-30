import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890abcdef", 10);

import prismaInstance from "../../prisma/prismaClient.js";

const required = [
  "fname",
  "mname",
  "lname",
  "age",
  "gender",
  "bdate",
  "bplace",
  "civilStatus",
  "occupation",
  "contactNumber",
  "email",
  "address",
  "isSmoking",
  "isCovidVaccinated",
  "isDengvaxiaVaccinated",
];

function exclude(user, keys) {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key))
  );
}

// @desc    GET /patients Private
const getPatients = asyncHandler(async (req, res) => {
  const patients = await prismaInstance.patient.findMany({});

  if (!patients?.length) {
    return res.status(400).json({ message: "No patient found." });
  }

  res.status(200).json(patients);
});

// @desc    GET /patients/:id Private
const getPatientById = asyncHandler(async (req, res) => {
  const { patientId: id } = req.params;

  const patient = await prismaInstance.patient.findUnique({
    where: { id },
    include: { patientProfile: true, patientChart: true },
  });

  if (!patient) {
    return res.status(400).json({ message: "Patient not found." });
  }

  res.status(200).json(patient);
});

// @desc   POST /patients Private
const addPatient = asyncHandler(async (req, res) => {
  const { profile } = req.body;

  if (!profile) {
    return res.status(400).json({
      message: "Patient profile info is missing.",
    });
  }

  // @desc Validate patient profile input throw missing field
  const missingField = [];
  const validateInput = required.map((field) => {
    if (Object.hasOwn(profile, field)) {
      return true;
    } else {
      missingField.push(field);
      return false;
    }
  });

  const isInputValid = validateInput.every((bool) => bool === true);

  if (!isInputValid) {
    return res.status(400).json({
      message: `The following field is missing [ ${missingField.join(
        " , "
      )} ].`,
    });
  }

  // @desc Throw error if email is already taken
  const duplicate = await prismaInstance.patientProfile.findUnique({
    where: { email: profile.email },
  });

  if (duplicate) {
    return res.status(409).json({ message: "Email already taken." });
  }

  const patient = await prismaInstance.patient.create({
    data: {
      id: `PP${nanoid().toUpperCase()}`,
      patientChart: {
        create: {
          id: `PPC${nanoid().toUpperCase()}`,
        },
      },
      patientProfile: {
        create: {
          id: `PPP${nanoid().toUpperCase()}`,
          ...profile,
        },
      },
    },
  });

  if (patient) {
    res.status(201).json({ message: "Patient data inputted successfully." });
  } else {
    res
      .status(400)
      .json({ message: "Invalid patient data received. Try again." });
  }
});

// @desc   PATCH /patients/:id Private
const updatePatient = asyncHandler(async (req, res) => {
  const { updatedProfile } = req.body;
  const { patientId: id } = req.params;

  const updatedPatient = await prismaInstance.patient.update({
    where: { id },
    data: {
      patientProfile: { update: { ...updatedProfile } },
    },
  });

  if (!updatedPatient) {
    res.json({ message: "An unknown error has occured. Try again." });
  }
  res.json({ message: `Patient with ID ${id} updated.` });
});

// @desc   Delete /patients/:id Private
const deletePatient = asyncHandler(async (req, res) => {
  const { patientId: id } = req.params;

  const patient = await prismaInstance.patient.findUnique({ where: { id } });

  if (!patient) {
    return res.status(400).json({ message: "Patient not found." });
  }

  // @func  Delete
  const deletedPatient = await prismaInstance.patient.delete({ where: { id } });

  const message = `Patient with ID ${deletedPatient.id} deleted.`;

  res.status(200).json({ message });
});

export {
  getPatientById,
  getPatients,
  addPatient,
  updatePatient,
  deletePatient,
};
