import express from 'express';
import { getYoutubePlaylistItems } from '../controllers/youtube.js';
const router = express.Router();

router.get('/playlist/:playlistId', getYoutubePlaylistItems);

export default router;