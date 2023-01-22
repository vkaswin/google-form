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
exports.CustomError = exports.generateJwtToken = exports.asyncHandler = exports.screenShotFormPage = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const puppeteer_1 = __importDefault(require("puppeteer"));
const path_1 = __importDefault(require("path"));
const screenShotFormPage = (formId, folderName) => __awaiter(void 0, void 0, void 0, function* () {
    const filePath = path_1.default.join(process.cwd(), "public", folderName, `${formId}.png`);
    const url = `http://localhost:3000/google-form#/form/${formId}/preview`;
    const browser = yield puppeteer_1.default.launch();
    const page = yield browser.newPage();
    yield page.goto(url, { waitUntil: "networkidle0" });
    yield page.screenshot({
        path: filePath,
    });
    yield browser.close();
});
exports.screenShotFormPage = screenShotFormPage;
const generateJwtToken = (payload) => {
    return (0, jsonwebtoken_1.sign)(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};
exports.generateJwtToken = generateJwtToken;
class CustomError extends Error {
    constructor({ message, status }) {
        super(message);
        this.status = status;
    }
}
exports.CustomError = CustomError;
const asyncHandler = (cb) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield cb(req, res, next);
        }
        catch (error) {
            res
                .status((error === null || error === void 0 ? void 0 : error.status) || 500)
                .send({ message: (error === null || error === void 0 ? void 0 : error.message) || "Internal Server Error" });
            console.log(error);
        }
    });
};
exports.asyncHandler = asyncHandler;
