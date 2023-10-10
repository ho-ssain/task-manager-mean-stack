import mongoose from "mongoose";

const listSheema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
});

export const list = mongoose.model("list", listSheema);
