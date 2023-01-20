import { Router } from "express";
import { createTemplate, getAllTemplates } from "../controllers/template";

const router = Router();

router.post("/create", createTemplate);
router.get("/all", getAllTemplates);

export default router;
