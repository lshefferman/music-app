import pool from "../config/db.js";

export const createPlaylistTrackService = async (
  playlistId,
  trackId,
  userId,
  position
) => {
  const trackExists = await pool.query("SELECT id FROM tracks WHERE id = $1", [
    trackId,
  ]);
  if (trackExists.rowCount === 0) {
    throw new Error("Track does not exist");
  }

  const result = await pool.query(
    "INSERT INTO playlist_tracks (playlist_id, track_id, added_by, position) VALUES ($1, $2, $3, $4) RETURNING *",
    [playlistId, trackId, userId, position]
  );
  return result.rows[0];
};

export const getPlaylistTrackService = async (playlistId) => {
  const result = await pool.query(
    "SELECT pt.id AS playlist_track_id, pt.position, pt.added_by, pt.added_at, t.* FROM playlist_tracks pt JOIN tracks t ON pt.track_id = t.id WHERE pt.playlist_id = $1 ORDER BY pt.position ASC",
    [playlistId]
  );
  return result.rows;
};

export const deletePlaylistTrackService = async (playlistId, trackId) => {
  const result = await pool.query(
    `DELETE FROM playlist_tracks WHERE playlist_id = $1 AND track_id = $2 RETURNING *`,
    [playlistId, trackId]
  );
  return result.rows[0];
};
