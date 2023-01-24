import Template from "../models/template";
import { asyncHandler, CustomError } from "../utils";

const createTemplate = asyncHandler(async (req, res) => {
  if (!req.body)
    throw new CustomError({ message: "Invalid data", status: 400 });

  let template = await Template.create(req.body);

  res.status(200).send({
    _id: template._id,
    title: template.title,
    createdAt: template.createdAt,
    updatedAt: template.updatedAt,
  });
});

const getAllTemplates = asyncHandler(async (req, res) => {
  let templates = await Template.find(
    { isDefault: false },
    { title: 1, createdAt: 1, updatedAt: 1 }
  );
  res.status(200).send(templates);
});

export { createTemplate, getAllTemplates };
