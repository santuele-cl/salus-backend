import mongoose, { Schema, model } from "mongoose";

const noteSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    open: {
      type: Boolean,
      default: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default model("Note", noteSchema);

// import inc from "mongoose-sequence";
// const AutoIncrement = inc(mongoose);

// noteSchema.plugin(AutoIncrement, {
//   inc_field: "ticket",
//   // disable_hooks: true,
//   // id: "ticketNums",
//   start_seq: 1000,
// });
