import { Router, json } from "express";
import {
  addUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUserById,
  getUserByEmail,
} from "../../../database/dbUsers.js";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();
//idk how can i use next two rows
import { promises as fsPromises } from "fs";
import path from "path";

async function hashPassword(password) {
  const saltRounds = 12;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  //console.log(`hashed password: ${hashedPassword}`);
  return hashedPassword;
}

const loginRouter = Router();

loginRouter.use((req, res, next) => {
  console.log("login");
  next();
});

async function verifyPassword(providedPassword, storedHashedPassword) {
  try {
    const isValid = await bcrypt.compare(
      providedPassword,
      storedHashedPassword
    );
    return isValid;
  } catch (err) {
    console.error(err);
    return false;
  }
}

loginRouter.post("/", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = (await getUserByEmail(email))[0];
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const accessToken = jwt.sign(
      {
        username: user.username,
        email: user.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    const refreshToken = jwt.sign(
      {
        username: user.username,
        email: user.email,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    //have to save refresh token somehow
    res.status(200).json({
      accessToken,
      refreshToken,
      message: "Login Successfull",
      user_id: user.user_id,
      role: user.role,
      email: user.email,
      username: user.username,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error logging in" });
  }
});

export { loginRouter };
