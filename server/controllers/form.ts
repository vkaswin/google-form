import { Request as HttpRequest, Response as HttpResponse } from "express";
import Form from "../models/form";

const createForm = async () => {
  try {
    let data = await Form.create();
  } catch (error) {
    console.log(error);
  }
};
