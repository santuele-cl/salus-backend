import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890abcdef", 16);

import prismaInstance from "../../prisma/prismaClient.js";

const required = [
  "heightInCm",
  "weightInKl",
  "bpSystolic",
  "bpDiastolic",
  "pulseRate",
  "respiratoryRate",
  "bodyTempInCelsius",
  "oxygenSaturation",
];

// @desc   GET /users         Private
const getVitalsByVisitId = asyncHandler(async (req, res) => {
  const { visitId } = req.params;

  if (!visitId) {
    return res.status(400).json({ message: "Visit ID  is missing." });
  }

  const visit = await prismaInstance.visit.findUnique({
    where: { id: visitId },
  });

  if (!visit) {
    return res.status(400).json({ message: "Visit ID does not exist." });
  }

  const vitals = await prismaInstance.vitals.findUnique({
    where: { visitId },
  });

  if (!vitals) {
    return res.status(400).json({ message: "No vitals found." });
  }

  res.status(200).json(vitals);
});

// @desc   GET /users/:id     Private
const getVital = asyncHandler(async (req, res) => {
  const { vitalsId } = req.params;

  if (!vitalsId) {
    return res.status(400).json({ message: "Vitals ID does not exist." });
  }

  const vitals = await prismaInstance.vitals.findUnique({
    where: { id: vitalsId },
    include: {
      nurse: {
        select: {
          userProfile: {
            select: {
              fname: true,
              lname: true,
              email: true,
              contactNumber: true,
            },
          },
        },
      },
    },
  });

  if (!vitals) {
    return res.status(400).json({ message: "Vitals not found." });
  }

  res.status(200).json(vitals);
});

// @desc   GET /users/:id     Private
const getAllVitals = asyncHandler(async (req, res) => {
  const vitals = await prismaInstance.vitals.findMany();

  if (!vitals.length) {
    return res.status(400).json({ message: "vitals not found." });
  }

  res.status(200).json(vitals);
});

// @desc   POST /users        Private
const addVitals = asyncHandler(async (req, res) => {
  const { visitId, vitalsData } = req.body;
  const requestingId = req.userId;

  if (!vitalsData || !visitId) {
    return res.status(400).json({
      message: "Vitals info is missing.",
    });
  }

  const visit = await prismaInstance.visit.findUnique({
    where: { id: visitId },
  });

  if (!visit) {
    return res.status(400).json({
      message: "Visit ID does not exist.",
    });
  }

  // @desc Validate visit data input
  const missingField = [];
  const validateInput = required.map((field) => {
    if (Object.hasOwn(vitalsData, field)) {
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

  const vitals = await prismaInstance.vitals.create({
    data: {
      id: `V${nanoid().toUpperCase()}`,
      visit: { connect: { id: visitId } },
      nurse: { connect: { id: requestingId ? requestingId : "UZOPWLJ29" } },
      ...vitalsData,
    },
  });

  if (vitals) {
    res.status(201).json({ message: "Vitals added successfully." });
  } else {
    res.status(400).json({ message: "Invalid vitals data received." });
  }
});

// @desc   PATCH /users/:id   Private
const updateVitals = asyncHandler(async (req, res) => {
  const { visitId: id } = req.body;

  // @func  Check if user exist
  const visit = await prismaInstance.visit.findUnique({ where: { id } });
  if (!visit) {
    return res.status(404).json({ message: "Visit not found." });
  }

  const updatedVisit = await prismaInstance.user.update({
    where: { id: id },
    data: { username: username },
  });

  res.json({ message: `${updatedUser.username} updated.` });
});

// @desc   Delete /users/:id  Private
const deleteVitals = asyncHandler(async (req, res) => {
  const { patientChartId: id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Patient Chart ID is missing." });
  }

  // @func  Check if user exist
  // const user = await prismaInstance.user.findUnique({ where: { id } });
  const patientChart = await prismaInstance.patientChart.findUnique({
    where: { id },
  });

  if (!user) {
    return res.status(400).json({ message: "Patient Chart not found." });
  }

  // @func  Delete
  const deleteUser = await prismaInstance.user.delete({ where: { id } });
  const message = `Username ${deleteUser.username} with ID ${deleteUser.id} deleted.`;

  res.status(200).json({ message });
});

export { getVitalsByVisitId, getAllVitals, getVital, addVitals };
