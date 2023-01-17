import mongoose from "mongoose";
import Response from "../models/response";
import { Response as HttpResponse, Request as HttpRequest } from "express";

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

export { submitResponse };
