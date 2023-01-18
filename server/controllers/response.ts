import { Response as HttpResponse, Request as HttpRequest } from "express";
import Response from "../models/response";
import Form from "../models/form";
import mongoose from "mongoose";

const submitResponse = async (req: HttpRequest, res: HttpResponse) => {
  if (!req.body) {
    return res.status(400).send({ message: "Invalid data" });
  }

  try {
    await Response.create(req.body);
    res.status(200).send({ message: "Success" });
  } catch (error) {
    console.log(error);
  }
};

const getFormResponsesById = async (req: HttpRequest, res: HttpResponse) => {
  let { params } = req;

  let formId = new mongoose.Types.ObjectId(params.formId);

  try {
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
  } catch (error) {
    console.log(error);
  }
};

export { submitResponse, getFormResponsesById };
