import express from "express";
import cors from "cors";
import pool from "./config/db.js";
import dotenv from "dotenv";

import playlistRoutes from "./routes/playlistRoutes.js";
import createPlaylistTable from "./data/createPlaylistTable.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api/playlists", playlistRoutes);

// Create table before starting server
createPlaylistTable();

// server running
app.listen(PORT, () => {
  console.log("Server is listening on port", PORT);
});
