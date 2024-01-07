import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890abcdef", 16);

import prismaInstance from "../../prisma/prismaClient.js";

const requiredEvalData = ["physicalExamination", "diagnosis"];

const requiredMedicationData = [
  "drugName",
  "strength",
  "form",
  "dosage",
  "frequency",
  "duration",
  "direction",
];

// @desc   GET /users         Private
const getEvaluationByVisitId = asyncHandler(async (req, res) => {
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

  const evaluations = await prismaInstance.evaluation.findUnique({
    where: { visitId },
  });

  if (!evaluations) {
    return res.status(400).json({ message: "No evaluation found." });
  }

  res.status(200).json(evaluations);
});

// @desc   GET /users/:id     Private
const getEvaluation = asyncHandler(async (req, res) => {
  const { evaluationId } = req.params;

  if (!evaluationId) {
    return res.status(400).json({ message: "Evaluation ID does not exist." });
  }

  const evaluation = await prismaInstance.evaluation.findUnique({
    where: { id: evaluationId },
    include: {
      physician: {
        select: { userProfile: { select: { fname: true, lname: true } } },
      },
    },
  });

  if (!evaluation) {
    return res.status(400).json({ message: "Evaluation not found." });
  }

  res.status(200).json(evaluation);
});

// @desc   GET /users/:id     Private
const getAllEvaluations = asyncHandler(async (req, res) => {
  const evaluations = await prismaInstance.evaluation.findMany();

  if (!evaluations.length) {
    return res.status(400).json({ message: "evaluations not found." });
  }

  res.status(200).json(evaluations);
});

// @desc   POST /users        Private
const addEvaluation = asyncHandler(async (req, res) => {
  const { visitId, evaluationData, medicationData } = req.body;
  console.log("req.body addEval", req.body);
  // console.log(medicationData);
  const requestingId = req.userId;

  if (
    !evaluationData ||
    !visitId ||
    !medicationData ||
    !medicationData.length > 0
  ) {
    return res.status(400).json({
      message: "No evaluation data, medication and/or visit ID.",
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
  const validateEvalInput = requiredEvalData.map((field) => {
    if (Object.hasOwn(evaluationData, field)) {
      return true;
    } else {
      missingField.push(field);
      return false;
    }
  });

  const validateMedicationInput = medicationData.map((data) =>
    requiredMedicationData.map((field) => {
      if (Object.hasOwn(data, field)) {
        return true;
      } else {
        missingField.push(field);
        return false;
      }
    })
  );

  console.log("validateEvalInput", validateEvalInput);
  console.log("validateMedicationInput", validateMedicationInput);
  const isInputValid =
    validateEvalInput.every((bool) => bool === true) &&
    validateMedicationInput.map((medData) =>
      medData.every((bool) => bool === true)
    );

  if (!isInputValid) {
    return res.status(400).json({
      message: `The following field is missing [ ${missingField.join(
        " , "
      )} ].`,
    });
  }

  const processMedicationData = medicationData.map((med) => ({
    id: `MED${nanoid().toUpperCase()}`,
    ...med,
  }));
  console.log("processMedicationData", processMedicationData);

  const evaluation = await prismaInstance.evaluation.create({
    data: {
      id: `EV${nanoid().toUpperCase()}`,
      visit: { connect: { id: visitId } },
      physician: { connect: { id: requestingId ? requestingId : "UJFJ802JQ" } },

      medication: {
        createMany: { data: [...processMedicationData] },
      },
      physicalExamination: evaluationData.physicalExamination,
      diagnosis: evaluationData.diagnosis,
      doctorsNote: evaluationData.doctorsNote,
    },
  });

  if (evaluation) {
    res.status(201).json({ message: "Evaluation added successfully." });
  } else {
    res.status(400).json({ message: "Invalid evaluation data received." });
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

export {
  getEvaluationByVisitId,
  getEvaluation,
  getAllEvaluations,
  addEvaluation,
};
