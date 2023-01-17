import mongoose from "mongoose";

const ResponseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    formId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Form",
    },
    responses: {
      type: [Object],
      required: true,
    },
  },
  { timestamps: true }
);
