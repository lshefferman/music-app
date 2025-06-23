import pool from "../config/db.js";

// CAN ADDD OTHER STREAMING PLATFORM IDS LATER
const createTracksTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS tracks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    isrc TEXT UNIQUE,
    title TEXT,
    artist TEXT,
    album TEXT,
    spotify_id TEXT,
    duration_ms INT,
    cover_url TEXT
    )`;

  try {
    console.log(queryText);
    await pool.query(queryText);
    console.log("tracks table created if it doesn't exist");
  } catch (error) {
    console.log("error creating tracks table: ", error);
  }
};

export default createTracksTable;
