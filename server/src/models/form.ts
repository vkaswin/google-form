import mongoose, { Schema } from "mongoose";

const FormSchema = new Schema(
  {
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    bgCode: {
      type: String,
      required: true,
    },
    colorCode: {
      type: String,
      required: true,
    },
    sections: {
      required: true,
      type: [
        {
          title: {
            default: "",
            type: String,
          },
          description: {
            default: "",
            type: String,
          },
          fields: {
            required: true,
            type: [
              {
                title: {
                  default: "",
                  type: String,
                },
                description: {
                  default: "",
                  type: String,
                },
                fieldType: {
                  type: String,
                  required: true,
                },
                options: {
                  default: [],
                  type: [String],
                },
                other: {
                  default: false,
                  type: Boolean,
                },
                rules: {
                  default: {},
                  type: {
                    required: {
                      value: Boolean,
                      message: String,
                    },
                    pattern: {
                      value: String,
                      message: String,
                    },
                    minlength: {
                      value: Number,
                      message: String,
                    },
                    maxlength: {
                      value: Number,
                      message: String,
                    },
                    min: {
                      value: String,
                      message: String,
                    },
                    max: {
                      value: String,
                      message: String,
                    },
                  },
                },
              },
            ],
          },
        },
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Form", FormSchema);
