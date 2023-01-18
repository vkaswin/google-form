import { Router } from "express";
import { submitResponse, getFormResponsesById } from "../controllers/response";

const router = Router();

router.post("/submit", submitResponse);
router.get("/:formId", getFormResponsesById);

export default router;
