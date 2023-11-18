import asyncHandler from "express-async-handler";
import { isValidObjectId } from "mongoose";

import Note from "../models/note.model.js";
import User from "../models/user.model.js";

// @desc    Get all notes
// @routes  GET /notes
// @access  Private
const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({}, { __v: 0 })
    .lean()
    .populate({
      path: "user",
      select: ["username", "active"],
    });

  if (!notes?.length) {
    return res.status(404).json({ message: "No notes found." });
  }

  res.status(200).json(notes);
});

// @desc    Get all notes
// @routes  GET /notes
// @access  Private
const createNewNote = asyncHandler(async (req, res) => {
  const { username, title, text } = req.body;

  // @func  Validate data
  if (!username || !title || !text) {
    return res.status(400).json({ message: "Missing note field(s)." });
  }

  // @func  Check for duplicate title
  const duplicate = await Note.findOne({ title }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Note title already taken." });
  }

  // @func  Validate user
  const user = await User.findOne({ username }, { password: 0, __v: 0 }).lean();

  if (!user) {
    return res.status(400).json({ message: "User not found." });
  }

  // @func  Create new note
  const note = await Note.create({ user: user?._id, title, text });

  if (note) {
    res.status(201).json({ message: "Note created succesfully." });
  } else {
    res.status(400).json({ message: "Invalid data received." });
  }
});

// @desc    Get all notes
// @routes  GET /notes
// @access  Private
const updateNote = asyncHandler(async (req, res) => {
  const { id, user, title, text, open, completed } = req.body;

  // @func  Validate data
  if (
    !id ||
    !user ||
    !title ||
    !text ||
    typeof open !== "boolean" ||
    typeof completed !== "boolean"
  ) {
    return res
      .status(400)
      .json({ message: "Invalid data received or missing field(s)." });
  }

  // @func  TODO: Validate user
  // if(!)

  // @func  Validate note ID
  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid note ID." });
  }

  // @func  Find note
  const note = await Note.findById(id).exec();

  if (!note) {
    return res.status(404).json({ message: "Note not found." });
  }

  note.user = user;
  note.title = title;
  note.text = text;
  note.open = open;
  note.completed = completed;

  const result = await note.save();

  if (!result) {
    return res.status(400).json({ message: "Invalid data received." });
  }

  res.status(200).json({ message: "Note successfully updated." });
});

// @desc    Get all notes
// @routes  GET /notes
// @access  Private
const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // @func  Validate id
  if (!id) {
    return res.status(400).json({ message: "Note ID missing." });
  }

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid note ID." });
  }

  // @func  Check if note exist
  const note = await Note.findById(id).exec();

  if (!note) {
    return res.status(400).json({ message: "Note not found." });
  }

  const result = await note.deleteOne();

  if (!result) {
    return res.status(400).json({ message: "Invalid data received." });
  }

  res.status(200).json({ message: "Note successfully deleted." });
});

export { getAllNotes, createNewNote, updateNote, deleteNote };
