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
      _id: false,
      required: true,
      type: [
        {
          type: {
            fieldId: {
              required: true,
              type: String,
            },
            response: {
              required: true,
              type: mongoose.SchemaTypes.Mixed,
            },
          },
        },
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Response", ResponseSchema);
