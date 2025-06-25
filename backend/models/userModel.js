import pool from "../config/db.js";

// Find user by email
export const findUserByEmail = async (email) => {
  const result = await pool.query(
    "SELECT id, username, email, password FROM users WHERE email = $1",
    [email]
  );
  return result.rows[0];
};

// Check if user exists by email or username
export const checkUserExists = async (email, username) => {
  const result = await pool.query(
    "SELECT id FROM users WHERE email = $1 OR username = $2",
    [email, username]
  );
  return result.rows.length > 0;
};

// Create new user
export const createUser = async (username, email, passwordHash) => {
  const result = await pool.query(
    `INSERT INTO users (username, email, password)
     VALUES ($1, $2, $3)
     RETURNING id, username, email`,
    [username, email, passwordHash]
  );
  return result.rows[0];
};
