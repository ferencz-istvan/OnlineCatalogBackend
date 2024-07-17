import { Router, json } from "express";
import {
  addUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUserById,
  getUserByEmail,
  getUserIdByEmail,
} from "../../../database/dbUsers.js";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();
import { promises as fsPromises } from "fs";
import path from "path";

async function hashPassword(password) {
  const saltRounds = 12;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

const usersRouter = Router();

usersRouter.use((req, res, next) => {
  console.log("Users:");
  next();
});

usersRouter.get("/", async (req, res) => {
  const users = await getUsers();
  res.status(200).json(users);
});

usersRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const userById = await getUserById(id);
  console.log(`userId: ${id}`);
  res.status(200).json(userById[0]);
});

usersRouter.post("/", async (req, res) => {
  const role = req.body.role;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  try {
    const securePassword = await hashPassword(password);
    await addUser(role, email, username, securePassword);
    const userId = await getUserIdByEmail(email);
    console.log(`getuserbyemail email: ${email}`);
    console.log(userId);
    return res.status(201).json(userId[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating user" });
  }
});

usersRouter.put("/:id", async (req, res) => {
  const role = req.body.role;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const id = req.params.id;
  await updateUser(id, role, email, username, password);
  const updatedUser = await getUserById(id);
  return res.status(200).json(updatedCity[0]);
});

usersRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await deleteUserById(id);
  res.send("Deleted");
  res.status(204);
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

usersRouter.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = (await getUserByEmail(email))[0];
    /* console.log(user); */
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // Login successful, return a token or session
    console.log(`login successfull`);
    /*     res.status(200).json({ token: generateToken(user) }); */
    //try to generating a  token
    const accessToken = jwt.sign(
      {
        username: user.username,
        email: user.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "200s" }
    );
    const refreshToken = jwt.sign(
      {
        username: user.username,
        email: user.email,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    //Saving refreshToken with current user
    /* const otherUsers = */
    //end of generating token
    res
      .status(200)
      .json({ accessToken, refreshToken, message: "Login Successfull! :D" })
      .cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error logging in" });
  }
});

//Add midleware to verify JWT token for protedted routes
/* usersRouter.use(async (req, res, next) => {
  const token = req.header("Autorization").replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({
      message: "Invalid token",
    });
  }
}); */

//Example of a protected route
usersRouter.get("/protected", async (req, res) => {
  res.status(200).json({
    message: "Welcome, " + req.users.username,
  });
});

export { usersRouter };
