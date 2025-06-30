import pool from "../config/db.js";

export const getPlaylistsService = async (userId) => {
  const result = await pool.query(
    `
    SELECT DISTINCT p.*
    FROM playlists p
    LEFT JOIN playlist_collaborators pc ON p.id = pc.playlist_id
    WHERE p.creator_id = $1 OR pc.user_id = $1
    `,
    [userId]
  );
  return result.rows;
};

export const getPlaylistByIdService = async (id) => {
  const result = await pool.query("SELECT * FROM playlists where id = $1", [
    id,
  ]);
  return result.rows[0];
};

export const createPlaylistService = async (
  name,
  description,
  image,
  isCollaborative,
  creatorId
) => {
  const result = await pool.query(
    "INSERT INTO playlists (name, description, image, is_collaborative, creator_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, description, image, isCollaborative, creatorId]
  );
  return result.rows;
};

export const editPlaylistService = async (id, name, description, image) => {
  const result = await pool.query(
    "UPDATE playlists SET name = $1, description = $2, image = $3 WHERE id = $4 RETURNING *",
    [name, description, image, id]
  );
  return result.rows[0];
};

export const deletePlaylistService = async (id) => {
  const result = await pool.query(
    "DELETE FROM playlists WHERE id=$1 RETURNING *",
    [id]
  );
  return result.rows[0];
};
