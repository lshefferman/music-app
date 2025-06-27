import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import dotenv from "dotenv";

import {
  findUserByEmail,
  checkUserExists,
  createUser,
} from "../models/userModel.js";

dotenv.config();
const SALT_ROUNDS = 10;

// Utility
const createToken = (id) =>
  jwt.sign({ _id: id }, process.env.SECRET, { expiresIn: "3d" });

// Response helper
const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({ status, message, data });
};

// Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return handleResponse(res, 400, "Email and password are required");

  try {
    // debug
    // console.log("Checking user:", email);
    const user = await findUserByEmail(email);
    // console.log("User found:", user);

    if (!user) return handleResponse(res, 401, "Invalid credentials");

    const match = await bcrypt.compare(password, user.password);
    if (!match) return handleResponse(res, 401, "Invalid credentials");

    const { id } = user;
    const token = createToken(id);

    handleResponse(res, 200, "User found", { id, email, token });
  } catch (err) {
    console.error("Login error:", err.message, err.stack);
    handleResponse(res, 500, "Server error");
  }
};

// Signup
export const signupUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return handleResponse(res, 400, "All fields are required");

  if (!validator.isEmail(email))
    return handleResponse(res, 400, "Invalid email");

  if (!validator.isStrongPassword(password))
    return handleResponse(res, 400, "Weak password");

  try {
    const exists = await checkUserExists(email, username);
    if (exists)
      return handleResponse(res, 409, "Email or username already exist");

    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(password, salt);
    const newUser = await createUser(username, email, hash);

    const { id, email: savedEmail } = newUser;
    const token = createToken(newUser.id);

    handleResponse(res, 200, "User created", { id, email: savedEmail, token });
  } catch (err) {
    console.error("Signup error:", err.message, err.stack);
    handleResponse(res, 500, "Server error");
  }
};
