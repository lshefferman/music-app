import pool from "../config/db.js";

const createPlaylistCollaboratorsTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS playlists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pplaylist_id UUID REFERENCES playlists(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role TEXT DEFAULT 'editor', -- could be 'owner', 'editor', 'viewer'
    added_at TIMESTAMP DEFAULT NOW(),
    UNIQUE (playlist_id, user_id)
    )`;

  try {
    console.log(queryText);
    await pool.query(queryText);
    console.log("playlist collaborators table created if it doesn't exist");
  } catch (error) {
    console.log("error creating playlist collaborators table: ", error);
  }
};

export default createPlaylistCollaboratorsTable;
