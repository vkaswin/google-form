import mongoose, { Schema } from "mongoose";

const ResponseSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    formId: {
      type: Schema.Types.ObjectId,
      index: true,
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
              default: null,
              type: Schema.Types.Mixed,
            },
          },
        },
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Response", ResponseSchema);
