import { Router } from "express";
import {
  createForm,
  getFormById,
  updateFormById,
  deleteFormById,
  getAllForms,
} from "../controllers/form";
import verifyToken from "../middleware/verifyToken";

const router = Router();

router.use(verifyToken);
router.post("/create", createForm);
router.get("/all", getAllForms);
router
  .route("/:formId")
  .get(getFormById)
  .put(updateFormById)
  .delete(deleteFormById);

export default router;
