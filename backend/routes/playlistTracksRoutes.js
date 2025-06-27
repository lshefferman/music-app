import express from "express";
import {
  createPlaylistTrack,
  getPlaylistTracks,
} from "../controllers/playlistTracksControllers.js";

// auth middleware
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

// ADD a track to a playlist
router.post("/playlists/:playlistId/tracks", createPlaylistTrack);

// GET all tracks in a playlist
router.get("/playlists/:playlistId/tracks", getPlaylistTracks);

export default router;
