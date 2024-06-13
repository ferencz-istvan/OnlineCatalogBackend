import { Router } from "express";
import {
  addUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUserById,
} from "../../../database/dbUsers.js";

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
  await addUser(role, email, username, password);
  return res.status(201).json({
    role: role,
    email: email,
    username: username,
    password: password,
  });
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

export { usersRouter };
