import { Router } from "express";
import FormRoutes from "./form";
import ResponseRoutes from "./response";
import UserRoutes from "./user";

const router = Router();

router
  .use("/api/form", FormRoutes)
  .use("/api/response", ResponseRoutes)
  .use("/api/user", UserRoutes);

export default router;
