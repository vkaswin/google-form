import mongoose, { Schema } from "mongoose";

const TemplateSchema = new Schema(
  {
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
    isDefault: {
      default: false,
      type: Boolean,
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

export default mongoose.model("Template", TemplateSchema);
