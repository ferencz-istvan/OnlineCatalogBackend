import { Router } from "express";
import {
  addUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUserById,
  getUserByEmail,
} from "../../../database/dbUsers.js";

import bcrypt from "bcrypt";

async function hashPassword(password) {
  const saltRounds = 12;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(`hashed password: ${hashedPassword}`);
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
    console.log(`secure pw: ${securePassword}`);
    return res.status(201).json({
      role: role,
      email: email,
      username: username,
      password: securePassword,
    });
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
  res.send("Torolve");
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
    console.log(user);
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
    res.status(200).json({ message: "Login Successfull! :D" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error logging in" });
  }
});

export { usersRouter };
