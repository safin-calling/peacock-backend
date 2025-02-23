import { Express } from "express";
import authRoutes from "./auth.routes";
import categoryRoutes from "./category.routes";
import feedRoutes from "./feed.routes";

const registerRoutes = (app: Express) => {
  app.use("/auth", authRoutes);
  app.use("/categories", categoryRoutes);
  app.use("/feed", feedRoutes);
};

export default registerRoutes;
