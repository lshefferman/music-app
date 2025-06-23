import express from "express";
import cors from "cors";
import pool from "./config/db.js";
import dotenv from "dotenv";

import playlistRoutes from "./routes/playlistRoutes.js";
import playlistTrackRoutes from "./routes/playlistTracksRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";

import createPlaylistTable from "./data/createPlaylistTable.js";
import createTracksTable from "./data/createTracksTable.js";
import createPlaylistTracksTable from "./data/createPlaylistTracksTable.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api/playlists", playlistRoutes);
app.use("/api", playlistTrackRoutes);
app.use("/api/search", searchRoutes);

// Create tables and before starting server
const startServer = async () => {
  try {
    await createTracksTable();
    await createPlaylistTable();
    await createPlaylistTracksTable();

    // run server
    app.listen(PORT, () => {
      console.log("Server is listening on port", PORT);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
