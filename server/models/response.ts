import mongoose from "mongoose";

const ResponseSchema = new mongoose.Schema(
  {
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
