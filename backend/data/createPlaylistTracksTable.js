import pool from "../config/db.js";

const createPlaylistTracksTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS playlist_tracks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    playlist_id UUID REFERENCES playlists(id) ON DELETE CASCADE,
    track_id UUID REFERENCES tracks(id),
    added_by UUID REFERENCES users(id),
    position INT,
    added_at TIMESTAMP DEFAULT now()
  )`;

  try {
    console.log(queryText);
    await pool.query(queryText);
    console.log("playlist tracks table created if it doesn't exist");
  } catch (error) {
    console.log("error creating playlist tracks table: ", error);
  }
};

export default createPlaylistTracksTable;
