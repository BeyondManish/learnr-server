import { Router } from "express";
import { uploadImage, loadAllMedias, deleteImage } from "../controllers/media.js";
import { requireLogin, isAdmin, restrictTo } from "../controllers/auth.js";

const router = Router();

router.get("/files", requireLogin, restrictTo("admin", "author"), loadAllMedias);
router.post("/files/upload-image", requireLogin, uploadImage);
router.delete("/files/:id", requireLogin, isAdmin, deleteImage);

export default router;