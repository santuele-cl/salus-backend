import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { isValidObjectId } from "mongoose";

import User from "../models/user.model.js";
import Note from "../models/note.model.js";

const VALID_USER_ROLES = ["employee", "manager", "admin"];

const isValidRole = (roleReference, roleInput) => {
  return roleInput.every((role) => roleReference.includes(role));
};

// @desc    Get all users
// @route   GET /users
// @access  Private
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}, { __v: 0, password: 0 }).lean();

  if (!users?.length) {
    return res.status(400).json({ message: "No users found." });
  }

  res.status(200).json(users);
});

// @desc    Create new user
// @route   POST /users
// @access  Private
const createNewUser = asyncHandler(async (req, res) => {
  const { username, password, roles } = req.body;

  // @func  Confirm request data
  if (!username || !password || !Array.isArray(roles) || !roles?.length) {
    const errMessage = [];
    if (!username) errMessage.push("Username is missing.");
    if (!password) errMessage.push("Password is missing.");
    if (!Array.isArray(roles)) errMessage.push("Roles must be of type array.");
    if (!roles?.length) errMessage.push("Roles must not be empty.");

    return res.status(400).json({ message: errMessage.join(" ") });
  }

  // @func  Validate role
  if (!isValidRole(VALID_USER_ROLES, roles)) {
    return res.status(400).json({ message: "Invalid role." });
  }

  // @func  Check for duplicate
  const duplicate = await User.findOne({ username }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Username already taken." });
  }

  // @func  Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // @func  Create and store new user
  const userObject = { username, password: hashedPassword, roles };
  const user = await User.create(userObject);

  if (user) {
    res.status(201).json({ message: "User created successfully." });
  } else {
    res.status(400).json({ message: "Invalid user data received." });
  }
});

// @desc    Update a user
// @route   PATCH /users/:id
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  const { id, username, roles, active, password } = req.body;

  // @func  Confirm data
  if (
    !id ||
    !username ||
    !Array.isArray(roles) ||
    !roles.length ||
    typeof active !== "boolean"
  ) {
    return res.status(400).json({ message: "Invalid data received." });
  }
  // @func  Validate role
  if (!isValidRole(VALID_USER_ROLES, roles)) {
    return res.status(400).json({ message: "Invalid role." });
  }

  // @func  Validate ID
  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid ID." });
  }

  // @func  Check if user exist

  const user = await User.findById(id).exec();
  if (!user) {
    return res.status(400).json({ message: "User not found." });
  }

  // @func  Check duplicate
  const duplicate = await User.findOne({ username }).lean().exec();

  // @note  Allow updates to the original user
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Username already taken." });
  }

  // @func  Update user
  user.username = username;
  user.roles = roles;
  user.active = active;

  // @func  Optional: Update password
  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
  }

  const updatedUser = await user.save();

  res.json({ message: `${updatedUser.username} updated.` });
});

// @desc    Delete a user
// @route   Delete /users/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "User ID missing." });
  }

  // @func  Validate ID
  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid ID." });
  }

  // @func  Abort delete if user note(s) exist
  const note = await Note.findOne({ user: id }).lean().exec();

  if (note) {
    return res.status(400).json({ message: "User has assigned note(s)." });
  }

  // @func  Check if user exist
  const user = await User.findById(id).exec();
  if (!user) {
    return res.status(400).json({ message: "User not found." });
  }

  // @func  Delete
  const result = await user.deleteOne();
  const message = `Username ${result.username} with ID ${result._id} deleted.`;
  res.status(200).json({ message });
});

export { getAllUsers, createNewUser, updateUser, deleteUser };
