import express from "express";
import { searchTrack } from "../controllers/searchController.js";

// auth middleware
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

// search for a track
router.get("/", searchTrack);

export default router;
