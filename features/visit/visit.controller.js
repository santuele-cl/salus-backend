import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890abcdef", 16);

import prismaInstance from "../../prisma/prismaClient.js";

function exclude(item, keysToRemove) {
  return Object.fromEntries(
    Object.entries(item).filter(([key]) => !keysToRemove.includes(key))
  );
}

const required = ["chiefComplaint", "hpi", "serviceDepartmentId"];

const getAllVisits = asyncHandler(async (req, res) => {
  const visits = await prismaInstance.visit.findMany();

  if (!visits?.length) {
    return res.status(400).json({ message: "No visits found." });
  }

  res.status(200).json(visits);
});

// @desc   GET /users         Private
const getVisitsByPatientChartId = asyncHandler(async (req, res) => {
  const { patientChartId } = req.params;

  if (!patientChartId) {
    return res.status(400).json({ message: "Patient Chart ID is missing." });
  }

  const patientChart = await prismaInstance.patientChart.findUnique({
    where: { id: patientChartId },
  });

  if (!patientChart) {
    return res.status(400).json({ message: "Patient Chart not found." });
  }

  const visits = await prismaInstance.visit.findMany({
    where: { patientChartId },
    include: {
      serviceDepartment: true,
      vitals: {
        include: {
          nurse: {
            select: {
              userProfile: {
                select: {
                  fname: true,
                  lname: true,
                  contactNumber: true,
                  email: true,
                },
              },
            },
          },
        },
      },
      evaluation: {
        include: {
          physician: {
            select: {
              userProfile: {
                select: {
                  fname: true,
                  lname: true,
                  contactNumber: true,
                  email: true,
                },
              },
            },
          },
          medication: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  if (!visits?.length) {
    return res.status(400).json({ message: "No visits found." });
  }

  res.status(200).json(visits);
});

// @desc   GET /users/:id     Private
const getVisitById = asyncHandler(async (req, res) => {
  const { visitId } = req.params;

  if (!visitId) {
    return res.status(400).json({ message: "Visit ID Missing" });
  }

  const visit = await prismaInstance.visit.findUnique({
    where: { id: visitId },
  });

  if (!visit) {
    return res.status(400).json({ message: "Visit not found." });
  }

  res.status(200).json(visit);
});

// @desc   POST /users        Private
const createVisit = asyncHandler(async (req, res) => {
  const { patientChartId, visitData } = req.body;
  console.log(visitData?.serviceDepartmentId);
  if (!visitData || !patientChartId) {
    return res.status(400).json({
      message: "Patient profile info is missing.",
    });
  }

  const patientChart = await prismaInstance.patientChart.findUnique({
    where: { id: patientChartId },
  });

  if (!patientChart) {
    return res.status(400).json({
      message: "Patient Chart ID info does not exist.",
    });
  }

  const serviceDepartment = await prismaInstance.serviceDepartment.findUnique({
    where: { id: visitData["serviceDepartmentId"] },
  });

  if (!serviceDepartment) {
    return res.status(400).json({
      message: "Service Department ID does not exist.",
    });
  }

  // @desc Validate visit data input
  const missingField = [];
  const validateInput = required.map((field) => {
    if (Object.hasOwn(visitData, field)) {
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

  //  @desc Create visit

  const { serviceDepartmentId, ...therest } = visitData;

  const visit = await prismaInstance.visit.create({
    data: {
      id: `V${nanoid().toUpperCase()}`,
      patientChart: {
        connect: { id: patientChartId },
      },
      serviceDepartment: { connect: { id: visitData["serviceDepartmentId"] } },
      ...therest,
    },
  });

  if (visit) {
    res.status(201).json({ message: "Visit created successfully." });
  } else {
    res.status(400).json({ message: "Invalid visit data received." });
  }
});

// @desc   PATCH /users/:id   Private
const updateVisit = asyncHandler(async (req, res) => {
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
const deleteVisit = asyncHandler(async (req, res) => {
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

export {
  getAllVisits,
  getVisitsByPatientChartId,
  getVisitById,
  createVisit,
  updateVisit,
  deleteVisit,
};
