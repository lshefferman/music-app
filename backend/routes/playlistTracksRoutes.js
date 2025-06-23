import express from "express";
import { createPlaylistTrack } from "../controllers/playlistTracksControllers.js";

const router = express.Router();

// ADD a track to a playlist
router.post("/:playlistId/tracks", createPlaylistTrack);

export default router;
