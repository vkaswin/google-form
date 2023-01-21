import mongoose from "mongoose";
import Form from "../models/form";
import Template from "../models/template";
import { screenShotFormPage, asyncHandler, CustomError } from "../utils";

const createForm = asyncHandler(async (req, res) => {
  let {
    user,
    body: { templateId },
  } = req;

  let [formDetail] = await Template.aggregate([
    {
      $match: {
        ...(templateId
          ? { _id: new mongoose.Types.ObjectId(templateId) }
          : { isDefault: true }),
      },
    },
    {
      $project: {
        _id: 0,
        title: 1,
        colorCode: 1,
        bgCode: 1,
        sections: 1,
        creatorId: user._id,
      },
    },
    { $unset: ["sections._id", "sections.fields._id"] },
  ]);

  let { _id } = await Form.create({
    ...formDetail,
    creatorId: user._id,
  });

  res.status(200).send({ formId: _id });

  screenShotFormPage(_id.toString(), "form");
  res.status(200).send({ message: "success" });
});

const getFormById = asyncHandler(async (req, res) => {
  let {
    params: { formId },
  } = req;

  if (!mongoose.Types.ObjectId.isValid(formId))
    throw new CustomError({ message: "Invalid form id", status: 400 });

  let formDetail = await Form.findById(formId);

  if (!formDetail)
    throw new CustomError({ message: "Form not found", status: 400 });

  res.status(200).send(formDetail);
});

const updateFormById = asyncHandler(async (req, res) => {
  let {
    body,
    params: { formId },
  } = req;

  if (!body) throw new CustomError({ message: "Invalid data", status: 400 });

  await Form.findByIdAndUpdate(formId, body);

  res
    .status(200)
    .send({ message: "Form has been updated successfully", formId });
});

const deleteFormById = asyncHandler(async (req, res) => {
  let {
    params: { formId },
  } = req;

  if (!mongoose.Types.ObjectId.isValid(formId))
    throw new CustomError({ message: "Invalid form id", status: 400 });

  await Form.findByIdAndDelete(formId);

  res
    .status(200)
    .send({ message: "Form has been deleted successfully", formId });
});

const getAllForms = asyncHandler(async (req, res) => {
  let { user } = req;

  let forms = await Form.find(
    {
      creatorId: user._id,
    },
    { title: 1, updatedAt: 1, createdAt: 1 }
  ).sort({ updatedAt: -1 });
  res.status(200).send(forms);
});

export { getFormById, createForm, updateFormById, deleteFormById, getAllForms };
