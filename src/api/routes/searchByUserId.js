import { Router } from "express";
import { searchExtendedStudentByUserId } from "../../../database/dbStudents.js";
import { searchTeacherByUserId } from "../../../database/dbTeachers.js";
import { searchParentByUserId } from "../../../database/dbParents.js";

const searchByUserRouter = Router();

searchByUserRouter.use((req, res, next) => {
  console.log("search by a user id");
  next();
});

searchByUserRouter.get("/students/:id", async (req, res) => {
  const user_id = req.params.id;
  const data = await searchExtendedStudentByUserId(user_id);
  res.status(200).json(data[0]);
});

searchByUserRouter.get("/teachers/:id", async (req, res) => {
  const user_id = req.params.id;
  const data = await searchTeacherByUserId(user_id);
  res.status(200).json(data[0]);
});

searchByUserRouter.get("/parents/:id", async (req, res) => {
  const user_id = req.params.id;
  const data = await searchParentByUserId(user_id);
  res.status(200).json(data[0]);
});

export { searchByUserRouter };
