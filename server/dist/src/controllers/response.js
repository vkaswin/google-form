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
exports.checkResponseStatus = exports.getFormResponsesById = exports.submitResponse = void 0;
const response_1 = __importDefault(require("../models/response"));
const form_1 = __importDefault(require("../models/form"));
const mongoose_1 = __importDefault(require("mongoose"));
const utils_1 = require("../utils");
const submitResponse = (0, utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { body, user } = req;
    if (!body)
        throw new utils_1.CustomError({ message: "Invalid data", status: 400 });
    yield response_1.default.create(Object.assign(Object.assign({}, req.body), { userId: user._id }));
    res.status(200).send({ message: "Success" });
}));
exports.submitResponse = submitResponse;
const getFormResponsesById = (0, utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { params } = req;
    let formId = new mongoose_1.default.Types.ObjectId(params.formId);
    let [formDetail] = yield form_1.default.aggregate([
        { $match: { _id: formId } },
        {
            $project: {
                creatorId: 1,
                colorCode: 1,
                bgCode: 1,
                title: 1,
                fields: {
                    $reduce: {
                        input: "$sections",
                        initialValue: [],
                        in: {
                            $concatArrays: [
                                "$$value",
                                {
                                    $map: {
                                        input: "$$this.fields",
                                        as: "field",
                                        in: { _id: "$$field._id", title: "$$field.title" },
                                    },
                                },
                            ],
                        },
                    },
                },
            },
        },
    ]);
    let [{ responses }] = yield response_1.default.aggregate([
        {
            $match: { formId },
        },
        {
            $group: {
                _id: formId,
                responses: {
                    $push: "$responses",
                },
            },
        },
    ]);
    formDetail.responses = responses;
    res.status(200).send(formDetail);
}));
exports.getFormResponsesById = getFormResponsesById;
const checkResponseStatus = (0, utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { user, params: { formId }, } = req;
    let data = yield response_1.default.findOne({
        formId,
        userId: user._id,
    });
    res.status(200).send({ status: !!data });
}));
exports.checkResponseStatus = checkResponseStatus;
