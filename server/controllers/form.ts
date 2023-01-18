import { Request as HttpRequest, Response as HttpResponse } from "express";
import mongoose from "mongoose";
import Form from "../models/form";
import { screenShotFormPage } from "../utils";

const createForm = async (req: HttpRequest, res: HttpResponse) => {
  let formId: string | undefined;
  try {
    let data = await Form.create(req.body);
    formId = data._id.toString();
    return res.status(200).send({ message: "Success" });
  } catch (error) {
    console.log(error);
  } finally {
    if (!formId) return;
    screenShotFormPage(formId);
  }
};

const getFormById = async (req: HttpRequest, res: HttpResponse) => {
  let {
    params: { formId },
  } = req;

  if (!mongoose.Types.ObjectId.isValid(formId)) {
    return res.status(400).send({ message: "Invalid form id" });
  }

  try {
    let formDetail = await Form.findById(formId);
    return res.status(200).send(formDetail);
  } catch (error) {
    console.log(error);
  }
};

const updateFormById = async (req: HttpRequest, res: HttpResponse) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

const deleteFormById = (req: HttpRequest, res: HttpResponse) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

export { getFormById, createForm, updateFormById, deleteFormById };
