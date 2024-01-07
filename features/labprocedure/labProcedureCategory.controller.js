import asyncHandler from "express-async-handler";

import prismaInstance from "../../prisma/prismaClient.js";
import { nanoid } from "nanoid";

// @desc    Get all roles
// @route   GET /roles
// @access  Private
const getCategories = asyncHandler(async (req, res) => {
  // const { skip, take } = req.query;
  const categories = await prismaInstance.labProcedureCategory.findMany({
    select: {
      categoryName: true,
      labProcedure: { select: { id: true, procedureName: true } },
    },
  });

  if (!categories?.length) {
    return res.status(400).json({ message: "No categories found." });
  }

  res.status(200).json(categories);
});

// @desc    Create new role
// @route   POST /roles
// @access  Private
const postRole = asyncHandler(async (req, res) => {
  const { roleName } = req.body;

  // Validate roleName
  if (!roleName) {
    return res.status(400).json({ message: "Role name is missing." });
  }

  // @func  Check for duplicate
  const duplicateRole = await prismaInstance.role.findUnique({
    where: { roleName },
  });

  if (duplicateRole) {
    return res.status(409).json({ message: "Role is already existing." });
  }

  // @func  Create and store new role
  const createdRole = await prismaInstance.role.create({
    data: { id: `R${nanoid(4).toUpperCase()}`, roleName },
  });

  if (createdRole) {
    res.status(201).json({ message: "Role created successfully." });
  } else {
    res.status(400).json({ message: "Invalid data received." });
  }
});

// @desc    Update a role
// @route   PATCH /roles/:id
// @access  Private
const updateRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { roleName } = req.body;
  console.log(req.body);

  //   // Verify Role by Id
  const role = await prismaInstance.role.findUnique({ where: { id } });

  if (!role) {
    return res.status(404).json({ message: "Role not found." });
  }

  const updatedRole = await prismaInstance.role.update({
    where: { id },
    data: { roleName },
  });

  if (updatedRole) {
    res.json({ message: `${updatedRole.roleName} updated.` });
  } else {
    res.status(400).json({ message: "Role not created." });
  }
});

// // @desc    Delete a role
// // @route   Delete /roles/:id
// // @access  Private
const deleteRole = asyncHandler(async (req, res) => {
  const { roleId: id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Role ID missing." });
  }

  const role = await prismaInstance.role.findUnique({ where: { id } });
  if (!role) {
    return res.status(404).json({ message: "Role not found." });
  }

  const deletedRole = await prismaInstance.role.delete({ where: { id } });

  res.status(200).json({
    message: `Role ${deletedRole.roleName} with ID ${deletedRole.id} deleted.`,
  });
});

export { getCategories };
