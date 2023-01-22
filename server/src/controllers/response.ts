import Response from "../models/response";
import Form from "../models/form";
import mongoose from "mongoose";
import { asyncHandler, CustomError } from "../utils";

const submitResponse = asyncHandler(async (req, res) => {
  let { body, user } = req;

  if (!body) throw new CustomError({ message: "Invalid data", status: 400 });

  await Response.create({ ...req.body, userId: user._id });
  res.status(200).send({ message: "Success" });
});

const getFormResponsesById = asyncHandler(async (req, res) => {
  let {
    user,
    params: { formId },
  } = req;

  let [formDetail] = await Form.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(formId) } },
    {
      $project: {
        creatorId: 1,
        colorCode: 1,
        bgCode: 1,
        title: 1,
        fields: {
          $reduce: {
            input: "$sections",
            initialValue: [],
            in: {
              $concatArrays: [
                "$$value",
                {
                  $map: {
                    input: "$$this.fields",
                    as: "field",
                    in: { _id: "$$field._id", title: "$$field.title" },
                  },
                },
              ],
            },
          },
        },
      },
    },
  ]);

  if (!formDetail) {
    throw new CustomError({ message: "Form not found", status: 400 });
  }

  if (formDetail.creatorId.toString() !== user._id) {
    throw new CustomError({
      message:
        "Form creator only have the access to view the submitted responses",
      status: 400,
    });
  }

  let data = await Response.aggregate([
    {
      $match: { formId: new mongoose.Types.ObjectId(formId) },
    },
    {
      $lookup: {
        from: "users",
        foreignField: "_id",
        localField: "userId",
        as: "user",
        pipeline: [{ $project: { name: 1, email: 1 } }],
      },
    },
    {
      $project: {
        responses: 1,
        user: { $first: "$user" },
      },
    },
  ]);

  formDetail.formResponses = data || [];

  res.status(200).send(formDetail);
});

const checkResponseStatus = asyncHandler(async (req, res) => {
  let {
    user,
    params: { formId },
  } = req;

  let data = await Response.findOne({
    formId,
    userId: user._id,
  });

  res.status(200).send({ status: !!data });
});

export { submitResponse, getFormResponsesById, checkResponseStatus };
