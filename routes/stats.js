import { Router } from "express";
import { requireLogin, isAdmin } from "../controllers/auth.js";
import { getStats } from "../controllers/stats.js";


const router = Router();

router.get("/stats", requireLogin, isAdmin, getStats);

export default router;