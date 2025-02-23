import { Router } from "express";
import {
  get_categories,
  subscribe_category,
  unsubscribe_category,
} from "../controllers/categories";
import { authorize } from "../middlewares/auth";

const router = Router();

router.get("/", get_categories);
router.post("/subscribe", authorize, subscribe_category);
router.post("/unsubscribe", authorize, unsubscribe_category);

export default router;
