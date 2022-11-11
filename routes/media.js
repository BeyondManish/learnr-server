import { Router } from "express";
import { uploadImage } from "../controllers/media.js";
import { requireLogin, isAdmin } from "../controllers/auth.js";

const router = Router();

router.post("/files/upload-image", requireLogin, isAdmin, uploadImage);

export default router;