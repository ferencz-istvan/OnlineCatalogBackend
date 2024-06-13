import { Router } from "express";
import {
  addStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from "../../../database/dbStudents.js";

const studentsRouter = Router();

studentsRouter.use((req, res, next) => {
  console.log("Students:");
  next();
});

studentsRouter.get("/", async (req, res) => {
  const students = await getStudents();
  res.status(200).json(students);
});

studentsRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const studentById = await getStudentById(id);
  console.log(`studentId: ${id}`);
  res.status(200).json(studentById[0]);
});

studentsRouter.post("/", async (req, res) => {
  const name = req.body.name;
  const class_id = req.body.class_id;
  const parent_id = req.body.parent_id;
  const adress = req.body.adress;
  const user_id = req.body.user_id;
  await addStudent(name, class_id, parent_id, adress, user_id);
  return res.status(201).json({
    name,
    class_id,
    parent_id,
    adress,
    user_id,
  });
});

studentsRouter.put("/:id", async (req, res) => {
  const name = req.body.name;
  const class_id = req.body.class_id;
  const parent_id = req.body.parent_id;
  const adress = req.body.adress;
  const user_id = req.body.user_id;
  const id = req.params.id;
  await updateStudent(id, name, class_id, parent_id, adress, user_id);
  const updatedStudent = await getStudentById(id);
  return res.status(200).json(updatedStudent[0]);
});

studentsRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await deleteStudent(id);
  res.send("Torolve");
  res.status(204);
});

export { studentsRouter };
