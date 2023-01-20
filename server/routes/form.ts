import { Router } from "express";
import {
  createForm,
  getFormById,
  updateFormById,
  deleteFormById,
  getAllForms,
} from "../controllers/form";

const router = Router();

router.post("/create", createForm);
router.get("/all", getAllForms);
router
  .route("/:formId")
  .get(getFormById)
  .put(updateFormById)
  .delete(deleteFormById);

export default router;
