import mongoose from "mongoose";
import Form from "../models/form";
import { screenShotFormPage, asyncHandler, CustomError } from "../utils";

const createForm = asyncHandler(async (req, res) => {
  let data = await Form.create(req.body);
  res.status(200).send({ message: "Success" });
  let formId = data._id.toString();
  screenShotFormPage(formId, "form");
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
  //
});

const deleteFormById = asyncHandler(async (req, res) => {
  //
});

const getAllForms = asyncHandler(async (req, res) => {
  let forms = await Form.find({}, { title: 1 });
  res.status(200).send(forms);
});

export { getFormById, createForm, updateFormById, deleteFormById, getAllForms };
