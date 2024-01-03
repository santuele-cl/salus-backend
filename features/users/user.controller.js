import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890abcdef", 8);

import prismaInstance from "../../prisma/prismaClient.js";

function exclude(user, keys) {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key))
  );
}

// @desc   GET /users         Private
const getUsers = asyncHandler(async (req, res) => {
  const users = await prismaInstance.user.findMany({
    include: { role: true, clinicalDepartment: true },
  });

  if (!users?.length) {
    return res.status(400).json({ message: "No users found." });
  }
  const filteredUsers = users.map((user) => exclude(user, ["password"]));

  res.status(200).json(filteredUsers);
});

// @desc   GET /users/:id     Private
const getUserById = asyncHandler(async (req, res) => {
  const { userId: id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "User not found." });
  }

  const user = await prismaInstance.user.findUnique({
    where: { id },
    include: { userProfile: true, role: { select: { roleName: true } } },
  });

  if (!user) {
    return res.status(400).json({ message: "User not found." });
  }

  // const filteredUser = exclude(user, ["password"]);

  res.status(200).json(user);
});

// @desc   POST /users        Private
const createNewUser = asyncHandler(async (req, res) => {
  const { username, password, roleId, profile } = req.body;

  // @func  Confirm request data
  if (!username || !password || !roleId) {
    const errMessage = [];
    if (!username) errMessage.push("Username is missing.");
    if (!password) errMessage.push("Password is missing.");
    if (!roleId) errMessage.push("Role ID is missing.");

    return res.status(400).json({ message: errMessage.join(" ") });
  }

  // @func  Check for duplicate
  const duplicate = await prismaInstance.user.findUnique({
    where: { username },
  });

  if (duplicate) {
    return res.status(409).json({ message: "Username already taken." });
  }

  // @func  Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // @func  Create and store new user
  // const user = await prismaInstance.user.create({data: {}})
  const user = await prismaInstance.user.create({
    data: {
      id: `U${nanoid().toUpperCase()}`,
      username,
      password: hashedPassword,
      role: { connect: { id: roleId } },
      userProfile: {
        create: { id: `P${nanoid().toUpperCase()}`, ...profile },
      },
    },
  });

  if (user) {
    res.status(201).json({ message: "User created successfully." });
  } else {
    res.status(400).json({ message: "Invalid user data received." });
  }
});

// @desc   PATCH /users/:id   Private
const updateUser = asyncHandler(async (req, res) => {
  const { updatedData } = req.body;
  const { userId: id } = req.params;

  // @func  Check if user exist
  const user = await prismaInstance.user.findUnique({ where: { id } });
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  const updatedUser = await prismaInstance.user.update({
    where: { id: id },
    data: { ...updatedData },
  });

  res.json({ message: `${updatedUser.username} updated.` });
});

// @desc   Delete /users/:id  Private
const deleteUser = asyncHandler(async (req, res) => {
  const { userId: id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "User ID missing." });
  }

  // @func  Check if user exist
  // const user = await prismaInstance.user.findUnique({ where: { id } });
  const user = await prismaInstance.user.findUnique({ where: { id } });

  if (!user) {
    return res.status(400).json({ message: "User not found." });
  }

  // @func  Delete
  const deleteUser = await prismaInstance.user.delete({ where: { id } });
  const message = `Username ${deleteUser.username} with ID ${deleteUser.id} deleted.`;

  res.status(200).json({ message });
});

export { getUserById, getUsers, createNewUser, updateUser, deleteUser };
