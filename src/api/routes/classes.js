import { Router } from "express";
import {
  addClass,
  getClasses,
  getClassById,
  updateClass,
  deleteClass,
  getClassmates,
} from "../../../database/dbClasses.js";

const classesRouter = Router();

classesRouter.use((req, res, next) => {
  console.log("CLasses:");
  next();
});

classesRouter.get("/", async (req, res) => {
  const classes = await getClasses();
  res.status(200).json(classes);
});

classesRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const classById = await getClassById(id);
  console.log(`classId: ${id}`);
  res.status(200).json(classById[0]);
});

classesRouter.post("/", async (req, res) => {
  const name = req.body.name;
  const grade = req.body.grade;
  const specialty = req.body.specialty;
  const conductor_id = req.body.conductor_id;
  await addClass(name, grade, specialty, conductor_id);
  return res.status(201).json({
    name,
    grade,
    specialty,
    conductor_id,
  });
});

classesRouter.put("/:id", async (req, res) => {
  const name = req.body.name;
  const grade = req.body.grade;
  const specialty = req.body.specialty;
  const conductor_id = req.body.conductor_id;
  const id = req.params.id;
  await updateClass(id, name, grade, specialty, conductor_id);
  const updatedClass = await getClassById(id);
  return res.status(200).json(updatedClass[0]);
});

classesRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await deleteClass(id);
  res.send("Torolve");
  res.status(204);
});

classesRouter.get("/classmates/:id", async (req, res) => {
  const id = req.params.id;
  const classMates = await getClassmates(id);
  res.status(200).json(classMates);
});

export { classesRouter };
