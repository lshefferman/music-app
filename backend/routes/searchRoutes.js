import express from "express";
import { searchTrack } from "../controllers/searchController.js";

const router = express.Router();

// search for a track
router.get("/", searchTrack);

export default router;
