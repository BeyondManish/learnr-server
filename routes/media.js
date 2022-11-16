import { Router } from "express";
import { uploadImage, loadAllMedias, deleteImage } from "../controllers/media.js";
import { requireLogin, isAdmin } from "../controllers/auth.js";

const router = Router();

router.get("/files", requireLogin, isAdmin, loadAllMedias);
router.post("/files/upload-image", requireLogin, isAdmin, uploadImage);
router.delete("/files/:id", requireLogin, isAdmin, deleteImage);

export default router;