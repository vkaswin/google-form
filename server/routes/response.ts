import { Router } from "express";
import { submitResponse } from "../controllers/response";

const router = Router();

router.post("/submit", submitResponse);

export default router;
