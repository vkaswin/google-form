import Template from "../models/template";
import { asyncHandler, CustomError } from "../utils";

const createTemplate = asyncHandler(async (req, res) => {
  if (!req.body)
    throw new CustomError({ message: "Invalid data", status: 400 });

  await Template.create(req.body);
});

const getAllTemplates = asyncHandler(async (req, res) => {
  let templates = await Template.find(
    { isDefault: false },
    { title: 1, createdAt: 1, updatedAt: 1 }
  );
  res.status(200).send(templates);
});

export { createTemplate, getAllTemplates };
