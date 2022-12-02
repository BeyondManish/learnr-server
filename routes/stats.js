import { Router } from "express";
import { requireLogin, isAdmin, restrictTo } from "../controllers/auth.js";
import { getStats } from "../controllers/stats.js";


const router = Router();

router.get("/stats", requireLogin, restrictTo("admin", "author"), getStats);

export default router;