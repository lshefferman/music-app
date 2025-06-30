import express from "express";
import {
  getPlaylists,
  getPlaylist,
  createPlaylist,
  deletePlaylist,
  editPlaylist,
} from "../controllers/playlistController.js";

// auth middleware
import authMiddleware from "../middleware/authMiddleware.js";
import { requireCollaboratorRole } from "../utils/roles.js";

const router = express.Router();

router.use(authMiddleware);

// GET all playlists
router.get("/", getPlaylists);

// GET a single playlist
router.get("/:id", getPlaylist);

// POST a new playlist
router.post("/", createPlaylist);

// DELETE a playlist
router.delete("/:id", deletePlaylist);

// EDIT a playlist
router.patch("/:id", requireCollaboratorRole("owner"), editPlaylist);

export default router;
