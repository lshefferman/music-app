import pool from "../config/db.js";

export const addCollaboratorService = async (playlistId, userId, role) => {
  const result = await pool.query(
    `INSERT INTO playlist_collaborators (playlist_id, user_id, role) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING`,
    [playlistId, userId, role]
  );
  return result.rows;
};

export const removeCollaboratorService = async (playlistId, userId) => {
  const result = await pool.query(
    `DELETE FROM playlist_collaborators WHERE playlist_id = $1 AND user_id = $2`,
    [playlistId, userId]
  );
  return result.rows[0];
};

export const getAllCollaboratorsService = async (playlistId) => {
  const result = await pool.query(
    `SELECT u.id, u.username, u.avatar, pc.role
           FROM playlist_collaborators pc
           JOIN users u ON pc.user_id = u.id
           WHERE pc.playlist_id = $1`,
    [playlistId]
  );
};

export const getCollaboratorRoleService = async (playlistId, userId) => {
  const result = await pool.query(
    `SELECT role FROM playlist_collaborators WHERE playlist_id = $1 AND user_id = $2`,
    [playlistId, userId]
  );
};
