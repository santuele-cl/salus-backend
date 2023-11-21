import asyncHandler from "express-async-handler";

import prismaInstance from "../../prisma/prismaClient.js";

// @desc    Get all roles
// @route   GET /roles
// @access  Private
const getRoles = asyncHandler(async (req, res) => {
  // const { skip, take } = req.query;
  const roles = await prismaInstance.role
    .findMany
    //   {
    //   skip: parseInt(skip),
    //   take: parseInt(take),
    // }
    ();

  if (!roles?.length) {
    return res.status(400).json({ message: "No roles found." });
  }

  res.status(200).json(roles);
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
  const createdRole = await prismaInstance.role.create({ data: { roleName } });

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
  const { roleId: id, roleName } = req.body;
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
  const { roleId: id } = req.body;

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

export { getRoles, postRole, updateRole, deleteRole };
