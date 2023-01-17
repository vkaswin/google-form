import { Router } from "express";
import FormRoutes from "./form";
import ResponseRoutes from "./response";

const router = Router();

router.use("/api/form", FormRoutes).use("/api/response", ResponseRoutes);

export default router;
