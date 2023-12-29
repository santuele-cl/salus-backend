import asyncHandler from "express-async-handler";

import prismaInstance from "../../prisma/prismaClient.js";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890abcdef", 6);

// @desc    Get configuration
// @route   GET /configuration
// @access  Private
const getConfig = asyncHandler(async (req, res) => {
  const config = await prismaInstance.configuration.findFirst();

  if (!config) {
    return res.status(400).json({ message: "No config found." });
  }

  res.status(200).json(config);
});

// @desc    Create new configuration
// @route   POST /configuration
// @access  Private
const postConfig = asyncHandler(async (req, res) => {
  const { name, logo, loginBg } = req.body;

  // @func  Confirm request data
  if (!name || !logo || !loginBg) {
    const errMessage = [];
    if (!name) errMessage.push("Name is missing.");
    if (!logo) errMessage.push("Logo is missing.");
    if (!loginBg) errMessage.push("Login background is missing.");

    return res.status(400).json({ message: errMessage.join(" ") });
  }

  const newConfig = await prismaInstance.configuration.create({
    data: { id: `C${nanoid().toUpperCase()}`, name, logo, loginBg },
  });

  if (newConfig) {
    res.status(201).json({ message: "Configuration created successfully." });
  } else {
    res.status(400).json({ message: "Invalid configuration data received." });
  }
});

// @desc    Update a role
// @route   PATCH /configuration/:id
// @access  Private
const updateConfig = asyncHandler(async (req, res) => {
  const { configId: id } = req.params;
  const { name, logo, loginBg } = req.body;

  //   // Verify Role by Id
  const config = await prismaInstance.configuration.findUnique({
    where: { id },
  });

  if (!config) {
    return res.status(404).json({ message: "Config not found." });
  }

  const updatedConfig = await prismaInstance.configuration.update({
    where: { id },
    data: { name, logo, loginBg },
  });

  if (updatedConfig) {
    res.json({ message: `Config with ${updatedConfig.id} ID updated.` });
  } else {
    res.status(400).json({ message: "Config not updated." });
  }
});

// // @desc    Delete a config
// // @route   Delete /configuration/:id
// // @access  Private
const deleteConfig = asyncHandler(async (req, res) => {
  const { configId: id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Config ID missing." });
  }

  const config = await prismaInstance.configuration.findUnique({
    where: { id },
  });
  if (!config) {
    return res.status(404).json({ message: "Config not found." });
  }

  const deletedConfig = await prismaInstance.configuration.delete({
    where: { id },
  });

  res.status(200).json({
    message: `Configuration with ID ${deletedConfig.id} deleted.`,
  });
});

export { getConfig, postConfig, updateConfig, deleteConfig };
