import { Router } from "express";
import {
  submitResponse,
  getFormResponsesById,
  checkResponseStatus,
} from "../controllers/response";
import verifyToken from "../middleware/verifyToken";

const router = Router();

router.use(verifyToken);

router.post("/submit", verifyToken, submitResponse);
router.get("/status/:formId", verifyToken, checkResponseStatus);
router.get("/:formId", verifyToken, getFormResponsesById);

export default router;
