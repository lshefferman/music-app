import pool from "../config/db.js";

export const createPlaylistTrackService = async (
  playlistId,
  trackId,
  userId,
  position
) => {
  const result = await pool.query(
    "INSERT INTO playlist_tracks (playlist_id, track_id, added_by, position) VALUES ($1, $2, $3, $4) RETURNING *",
    [playlistId, trackId, userId, position]
  );
  return result.rows;
};
