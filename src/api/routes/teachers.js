import { Router } from "express";
import {
  addTeacher,
  getTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacherById,
} from "../../../database/dbTeachers.js";

const teachersRouter = Router();

teachersRouter.use((req, res, next) => {
  console.log("Teachers:");
  next();
});

teachersRouter.get("/", async (req, res) => {
  const teachers = await getTeachers();
  res.status(200).json(teachers);
});

teachersRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const teacherById = await getTeacherById(id);
  console.log(`teacherId: ${id}`);
  res.status(200).json(teacherById[0]);
});

teachersRouter.post("/", async (req, res) => {
  const name = req.body.name;
  const user_id = req.body.user_id;
  await addTeacher(name, user_id);
  return res.status(201).json({
    name: name,
    user_id: user_id,
  });
});

teachersRouter.put("/:id", async (req, res) => {
  const name = req.body.name;
  const user_id = req.body.user_id;
  const id = req.params.id;
  await updateTeacher(id, name, user_id);
  const updatedTeacher = await getTeacherById(id);
  return res.status(200).json(updatedTeacher[0]);
});

teachersRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await deleteTeacherById(id);
  res.send("Torolve");
  res.status(204);
});

export { teachersRouter };
