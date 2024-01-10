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

const getAllLabOrders = asyncHandler(async (req, res) => {
  const laborders = await prismaInstance.labOrders.findMany({});

  if (!laborders?.length) {
    return res.status(400).json({ message: "No laboratory orders found." });
  }

  res.status(200).json(laborders);
});

// @desc   GET /users         Private
const getLabOrdersByPatientChartId = asyncHandler(async (req, res) => {
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

  const laborders = await prismaInstance.labOrders.findMany({
    where: { id: patientChartId },
    include: {
      labProcedure: {
        select: {
          procedureName: true,
          id: true,
          createdAt: true,
          labProcedureCategory: { select: { categoryName: true } },
        },
      },
      requestingPhysician: {
        select: {
          id: true,
          clinicalDepartment: true,
          userProfile: {
            select: {
              lname: true,
              mname: true,
              fname: true,
              contactNumber: true,
              email: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  if (!laborders?.length) {
    return res.status(400).json({ message: "No visits found." });
  }

  res.status(200).json(laborders);
});

// @desc   GET /users/:id     Private
const getLabOrderById = asyncHandler(async (req, res) => {
  const { labOrderId } = req.params;

  if (!labOrderId) {
    return res.status(400).json({ message: "Laboratory Order ID Missing" });
  }

  const laborder = await prismaInstance.labOrders.findUnique({
    where: { id: labOrderId },
  });

  if (!laborder) {
    return res.status(400).json({ message: "Laboratory order not found." });
  }

  res.status(200).json(laborder);
});

// @desc   POST /laborders        Private
const createLabOrder = asyncHandler(async (req, res) => {
  const { patientChartId, labOrderData } = req.body;
  const requestingId = req.userId;

  if (!labOrderData || !patientChartId) {
    return res.status(400).json({
      message: "Laboratory order data or patient chart ID is/are missing.",
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

  //  @desc Create lab order
  const { labProcedureId, ...therest } = labOrderData;
  const laborder = await prismaInstance.labOrders.create({
    data: {
      id: `LO${nanoid().toUpperCase()}`,
      patientChart: { connect: { id: patientChartId } },
      requestingPhysician: {
        connect: { id: requestingId ? requestingId : "UJFJ802JQ" },
      },
      clinicName: "",
      labProcedure: { connect: { id: labProcedureId } },
      ...therest,
    },
  });

  if (laborder) {
    res.status(201).json({ message: "Laboratory order created successfully." });
  } else {
    res
      .status(400)
      .json({ message: "Invalid laboratory order data received." });
  }
});

// @desc   PATCH /users/:id   Private
const updateLabOrder = asyncHandler(async (req, res) => {
  const { labOrderId: id } = req.params;
  const { updatedLabOrderData } = req.body;

  if (!updatedLabOrderData) {
    return res.status(400).json({ message: "No update data." });
  }

  // @func  Check if user exist
  const laborder = await prismaInstance.labOrders.findUnique({ where: { id } });

  if (!laborder) {
    return res.status(404).json({ message: "Laborator order not found." });
  }

  const updatedlaborder = await prismaInstance.labOrders.update({
    where: { id: id },
    data: { ...updatedLabOrderData },
  });

  res.json({ message: `${updatedlaborder.id} updated.` });
});

// @desc   Delete /users/:id  Private
const deleteLabOrder = asyncHandler(async (req, res) => {
  const { labOrderId: id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Patient Chart ID is missing." });
  }

  // @func  Check if user exist
  // const user = await prismaInstance.user.findUnique({ where: { id } });
  const laborder = await prismaInstance.labOrders.findUnique({
    where: { id },
  });

  if (!laborder) {
    return res.status(400).json({ message: "Laboratory order not found." });
  }

  // @func  Delete
  const deleteLabOrder = await prismaInstance.labOrders.delete({
    where: { id },
  });
  const message = `Laboroty order with ID ${deleteLabOrder.id} deleted.`;

  res.status(200).json({ message });
});

export {
  getAllLabOrders,
  getLabOrdersByPatientChartId,
  getLabOrderById,
  createLabOrder,
  updateLabOrder,
  deleteLabOrder,
};
