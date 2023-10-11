import mongoose from "mongoose";

const taskSheema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  _listId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

export const task = mongoose.model("task", taskSheema);
