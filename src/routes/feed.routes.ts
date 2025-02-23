import { Router } from "express";
import get_feed from "../controllers/feed";
import { authorize } from "../middlewares/auth";

const router = Router();

router.get("/", authorize, get_feed);

export default router;
