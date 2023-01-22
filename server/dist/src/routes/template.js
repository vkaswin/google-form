"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const template_1 = require("../controllers/template");
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const router = (0, express_1.Router)();
router.use(verifyToken_1.default);
router.post("/create", template_1.createTemplate);
router.get("/all", template_1.getAllTemplates);
exports.default = router;
