import { Express } from "express";
import authRoutes from "./auth.routes";

const registerRoutes = (app: Express) => {
  app.use("/auth", authRoutes);
};

export default registerRoutes;
