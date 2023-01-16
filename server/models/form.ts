import mongoose from "mongoose";

const FormSchema = new mongoose.Schema(
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
    sections: {
      _id: false,
      required: true,
      type: [
        {
          title: {
            type: String,
          },
          description: {
            type: String,
          },
          fields: {
            _id: false,
            required: true,
            type: [
              {
                title: String,
                formType: String,
                description: String,
                options: {
                  type: [String],
                  default: null,
                },
                other: {
                  enabled: Boolean,
                  checked: Boolean,
                },
                rules: {
                  default: {},
                  type: {
                    required: {
                      value: Boolean,
                      message: Boolean,
                    },
                    pattern: {
                      value: Boolean,
                      message: String,
                    },
                    minlength: {
                      value: Boolean,
                      message: Boolean,
                    },
                    maxlength: {
                      value: Boolean,
                      message: String,
                    },
                    min: {
                      value: Boolean,
                      message: Boolean,
                    },
                    max: {
                      value: Boolean,
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
