import express from "express";
import {
  createPlaylistTrack,
  deletePlaylistTrack,
  getPlaylistTracks,
} from "../controllers/playlistTracksControllers.js";

// auth middleware
import authMiddleware from "../middleware/authMiddleware.js";
import { requireCollaboratorRole } from "../utils/roles.js";

const router = express.Router();

router.use(authMiddleware);

// ADD a track to a playlist
router.post(
  "/playlists/:playlistId/tracks",
  requireCollaboratorRole("editor"),
  createPlaylistTrack
);

// GET all tracks in a playlist
router.get("/playlists/:playlistId/tracks", getPlaylistTracks);

// DELETE track from a playlist
router.delete(
  "/:playlistId/tracks/:trackId",
  requireCollaboratorRole("editor"),
  deletePlaylistTrack
);

export default router;
