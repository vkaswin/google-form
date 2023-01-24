"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllForms = exports.deleteFormById = exports.updateFormById = exports.createForm = exports.getFormById = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const form_1 = __importDefault(require("../models/form"));
const template_1 = __importDefault(require("../models/template"));
const utils_1 = require("../utils");
const createForm = (0, utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { user, body: { templateId }, } = req;
    let [formDetail] = yield template_1.default.aggregate([
        {
            $match: Object.assign({}, (templateId
                ? { _id: new mongoose_1.default.Types.ObjectId(templateId) }
                : { isDefault: true })),
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
    let form = yield form_1.default.create(Object.assign(Object.assign({}, formDetail), { creatorId: user._id }));
    yield (0, utils_1.screenShotFormPage)(form._id.toString(), "form");
    res.status(200).send({
        _id: form._id,
        title: form.title,
        createdAt: form.createdAt,
        updatedAt: form.updatedAt,
    });
}));
exports.createForm = createForm;
const getFormById = (0, utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { params: { formId }, } = req;
    if (!mongoose_1.default.Types.ObjectId.isValid(formId))
        throw new utils_1.CustomError({ message: "Invalid form id", status: 400 });
    let formDetail = yield form_1.default.findById(formId);
    if (!formDetail)
        throw new utils_1.CustomError({ message: "Form not found", status: 400 });
    res.status(200).send(formDetail);
}));
exports.getFormById = getFormById;
const updateFormById = (0, utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { body, user, params: { formId }, } = req;
    if (!mongoose_1.default.Types.ObjectId.isValid(formId))
        throw new utils_1.CustomError({ message: "Invalid form id", status: 400 });
    let form = yield form_1.default.findById(formId, { creatorId: 1 });
    if (form && form.creatorId.toString() !== user._id)
        throw new utils_1.CustomError({
            message: "Form creator only have edit access",
            status: 400,
        });
    if (!body)
        throw new utils_1.CustomError({ message: "Invalid data", status: 400 });
    yield form_1.default.findByIdAndUpdate(formId, body);
    res
        .status(200)
        .send({ message: "Form has been updated successfully", formId });
}));
exports.updateFormById = updateFormById;
const deleteFormById = (0, utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { params: { formId }, } = req;
    if (!mongoose_1.default.Types.ObjectId.isValid(formId))
        throw new utils_1.CustomError({ message: "Invalid form id", status: 400 });
    yield form_1.default.findByIdAndDelete(formId);
    res
        .status(200)
        .send({ message: "Form has been deleted successfully", formId });
}));
exports.deleteFormById = deleteFormById;
const getAllForms = (0, utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { user } = req;
    let forms = yield form_1.default.find({
        creatorId: user._id,
    }, { title: 1, updatedAt: 1, createdAt: 1 }).sort({ updatedAt: -1 });
    res.status(200).send(forms);
}));
exports.getAllForms = getAllForms;
