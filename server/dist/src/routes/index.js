"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const form_1 = __importDefault(require("./form"));
const response_1 = __importDefault(require("./response"));
const user_1 = __importDefault(require("./user"));
const template_1 = __importDefault(require("./template"));
const router = (0, express_1.Router)();
router
    .use("/api/form", form_1.default)
    .use("/api/response", response_1.default)
    .use("/api/user", user_1.default)
    .use("/api/template", template_1.default);
exports.default = router;
