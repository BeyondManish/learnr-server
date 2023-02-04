import { Router } from "express";
import { requireLogin, isAdmin, restrictTo } from "../controllers/auth.js";
import { getUserPostsStats } from "../controllers/stats.js";


const router = Router();

router.get("/stats", requireLogin, restrictTo("admin", "user"), getUserPostsStats);

export default router;