import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import pool from "../config/db.js";

dotenv.config();

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    const result = await pool.query("SELECT id FROM users WHERE id = $1", [
      _id,
    ]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = { id: result.rows[0].id };

    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

export default authMiddleware;
