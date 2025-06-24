import pool from "../config/db.js";

export const getPlaylistsService = async () => {
  const result = await pool.query("SELECT * FROM playlists");
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
  creatorId
) => {
  const result = await pool.query(
    "INSERT INTO playlists (name, description, image, creator_id) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, description, image, creatorId]
  );
  return result.rows;
};

export const editPlaylistService = async (id, name, image, description) => {
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
