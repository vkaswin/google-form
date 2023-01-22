"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const form_1 = require("../controllers/form");
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const router = (0, express_1.Router)();
router.post("/create", verifyToken_1.default, form_1.createForm);
router.get("/all", verifyToken_1.default, form_1.getAllForms);
router.get("/:formId", form_1.getFormById);
router
    .route("/:formId")
    .put(verifyToken_1.default, form_1.updateFormById)
    .delete(verifyToken_1.default, form_1.deleteFormById);
exports.default = router;
