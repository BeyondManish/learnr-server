import { Router } from "express";
import { uploadImage } from "../controllers/files.js";

const router = Router();

router.post("/upload-image", uploadImage);

export default router;