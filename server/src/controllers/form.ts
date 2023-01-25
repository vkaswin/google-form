import mongoose from "mongoose";
import Form from "../models/form";
import Template from "../models/template";
import { asyncHandler, CustomError } from "../utils";

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

  let form = await Form.create({
    ...formDetail,
    creatorId: user._id,
  });

  res.status(200).send({
    _id: form._id,
    title: form.title,
    createdAt: form.createdAt,
    updatedAt: form.updatedAt,
  });
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
    user,
    params: { formId },
  } = req;

  if (!mongoose.Types.ObjectId.isValid(formId))
    throw new CustomError({ message: "Invalid form id", status: 400 });

  let form = await Form.findById(formId, { creatorId: 1 });

  if (form && form.creatorId.toString() !== user._id)
    throw new CustomError({
      message: "Form creator only have edit access",
      status: 400,
    });

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
  let { user, query } = req;

  let limit = query.limit ? +query.limit : 25;
  let page = query.page ? +query.page : 1;
  let skip = (page - 1) * limit;

  let filterQuery = {
    creatorId: user._id,
    ...(query.search && {
      title: { $regex: query.search, $options: "i" },
    }),
  };

  let total = await Form.find(filterQuery).countDocuments();

  let forms = await Form.find(filterQuery, {
    title: 1,
    updatedAt: 1,
    createdAt: 1,
  })
    .sort({ updatedAt: -1 })
    .limit(limit)
    .skip(skip);

  res.status(200).send({
    list: forms,
    pageMeta: {
      page,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
});

export { getFormById, createForm, updateFormById, deleteFormById, getAllForms };
