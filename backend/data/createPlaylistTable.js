import pool from "../config/db.js";

// NEED TO ADD USER TABLE DEPENDENCY TO CREATOR ID LATER
const createPlaylistTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS playlists (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT, 
    creator_id INTEGER,
    is_public BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
)
  `;

  try {
    console.log(queryText);
    await pool.query(queryText);
    console.log("playlist table created if it doesn't exist");
  } catch (error) {
    console.log("error creating playlist table: ", error);
  }
};

export default createPlaylistTable;
