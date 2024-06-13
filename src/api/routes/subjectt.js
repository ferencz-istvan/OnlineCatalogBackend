import { Router } from "express";
import {
  addSubject,
  getSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
} from "../../../database/dbSubject.js";

const subjectsRouter = Router();

subjectsRouter.use((req, res, next) => {
  console.log("Subjects:");
  next();
});

subjectsRouter.get("/", async (req, res) => {
  const subjects = await getSubjects();
  res.status(200).json(subjects);
});

subjectsRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const subjectById = await getSubjectById(id);
  console.log(`subjectId: ${id}`);
  res.status(200).json(subjectById[0]);
});

subjectsRouter.post("/", async (req, res) => {
  const description = req.body.description;
  const name = req.body.name;
  await addSubject(description, name);
  return res.status(201).json({
    description,
    name,
  });
});

subjectsRouter.put("/:id", async (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const id = req.params.id;
  await updateSubject(id, name, description);
  const updatedSubject = await getSubjectById(id);
  return res.status(200).json(updatedSubject[0]);
});

subjectsRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await deleteSubject(id);
  res.send("Torolve");
  res.status(204);
});

export { subjectsRouter };
