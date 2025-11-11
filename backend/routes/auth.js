import express from "express";
import { generateToken } from "../lib/auth.js";

const { UserService } = require("../services/user.js");
const argon2 = require("argon2");

const router = express.Router();

// /api/register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const passHash = await argon2.hash(password);
  const u = UserService.add({ passHash, username });

  if (u == "exits") return res.status(400).json({ msg: "User already exists" });

  res.status(201).json({ msg: "User registered", username });
});

// /api/login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = UserService.find(username);

  if (user == undefined)
    return res.status(400).json({ msg: "Invalid credentials" });

  const v = await argon2.verify(user.passHash, password);

  if (!v) return res.status(400).json({ msg: "Invalid credentials" });

  const token = generateToken();

  res.json({ token });
});

export default router;
