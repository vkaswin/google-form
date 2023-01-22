"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const response_1 = require("../controllers/response");
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const router = (0, express_1.Router)();
router.use(verifyToken_1.default);
router.post("/submit", verifyToken_1.default, response_1.submitResponse);
router.get("/status/:formId", verifyToken_1.default, response_1.checkResponseStatus);
router.get("/:formId", verifyToken_1.default, response_1.getFormResponsesById);
exports.default = router;
