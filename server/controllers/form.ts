import mongoose from "mongoose";
import Form from "../models/form";
import { screenShotFormPage, asyncHandler, CustomError } from "../utils";

const createForm = asyncHandler(async (req, res) => {
  let data = await Form.create(req.body);
  res.status(200).send({ message: "Success" });
  let formId = data._id.toString();
  screenShotFormPage(formId);
});

const getFormById = asyncHandler(async (req, res) => {
  let {
    params: { formId },
  } = req;

  if (!mongoose.Types.ObjectId.isValid(formId))
    throw new CustomError({ message: "Invalid form id", status: 400 });

  let formDetail = await Form.findById(formId);
  res.status(200).send(formDetail);
});

const updateFormById = asyncHandler(async (req, res) => {
  //
});

const deleteFormById = asyncHandler(async (req, res) => {
  //
});

export { getFormById, createForm, updateFormById, deleteFormById };
