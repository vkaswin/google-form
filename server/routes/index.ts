import { Router } from "express";
import FormRoutes from "./form";
import ResponseRoutes from "./response";
import UserRoutes from "./user";
import TemplateRoutes from "./template";

const router = Router();

router
  .use("/api/form", FormRoutes)
  .use("/api/response", ResponseRoutes)
  .use("/api/user", UserRoutes)
  .use("/api/template", TemplateRoutes);

export default router;
