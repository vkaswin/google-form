import Response from "../models/response";
import Form from "../models/form";
import mongoose from "mongoose";
import { asyncHandler, CustomError } from "../utils";

const submitResponse = asyncHandler(async (req, res) => {
  if (!req.body)
    throw new CustomError({ message: "Invalid data", status: 400 });

  await Response.create(req.body);
  res.status(200).send({ message: "Success" });
});

const getFormResponsesById = asyncHandler(async (req, res) => {
  let { params } = req;

  let formId = new mongoose.Types.ObjectId(params.formId);

  let [formDetail] = await Form.aggregate([
    { $match: { _id: formId } },
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

  let [{ responses }] = await Response.aggregate([
    {
      $match: { formId },
    },
    {
      $group: {
        _id: formId,
        responses: {
          $push: "$responses",
        },
      },
    },
  ]);

  formDetail.responses = responses;

  res.status(200).send(formDetail);
});

export { submitResponse, getFormResponsesById };
