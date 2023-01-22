import { Router } from "express";
import { createTemplate, getAllTemplates } from "../controllers/template";
import verifyToken from "../middleware/verifyToken";

const router = Router();

router.use(verifyToken);

router.post("/create", createTemplate);
router.get("/all", getAllTemplates);

export default router;
