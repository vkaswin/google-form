import { Router } from "express";
import { submitResponse, getFormResponsesById } from "../controllers/response";
import verifyToken from "../middleware/verifyToken";

const router = Router();

router.use(verifyToken);

router.post("/submit", submitResponse);
router.get("/:formId", getFormResponsesById);

export default router;
