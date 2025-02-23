import { Express } from "express";
import authRoutes from "./auth.routes";
import categoryRoutes from "./category.routes";

const registerRoutes = (app: Express) => {
  app.use("/auth", authRoutes);
  app.use("/categories", categoryRoutes);
};

export default registerRoutes;
