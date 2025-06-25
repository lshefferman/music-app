import pool from "../config/db.js";

const createUsersTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    avatar TEXT,
    bio TEXT,
    created_at TIMESTAMP DEFAULT NOW()
)
  `;

  try {
    console.log(queryText);
    await pool.query(queryText);
    console.log("users table created if it doesn't exist");
  } catch (error) {
    console.log("error creating users table: ", error);
  }
};

export default createUsersTable;
