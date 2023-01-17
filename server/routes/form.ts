import { Router } from "express";
import {
  createForm,
  getFormById,
  updateFormById,
  deleteFormById,
} from "../controllers/form";

const router = Router();

router.post("/create", createForm);
router
  .route("/:formId")
  .get(getFormById)
  .put(updateFormById)
  .delete(deleteFormById);

export default router;
