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
exports.getAllTemplates = exports.createTemplate = void 0;
const template_1 = __importDefault(require("../models/template"));
const utils_1 = require("../utils");
const createTemplate = (0, utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body)
        throw new utils_1.CustomError({ message: "Invalid data", status: 400 });
    yield template_1.default.create(req.body);
}));
exports.createTemplate = createTemplate;
const getAllTemplates = (0, utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let templates = yield template_1.default.find({ isDefault: false }, { title: 1, createdAt: 1, updatedAt: 1 });
    res.status(200).send(templates);
}));
exports.getAllTemplates = getAllTemplates;
