import { Router } from "express";
import {
  addNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
} from "../../../database/dbNotes.js";

const notesRouter = Router();

notesRouter.use((req, res, next) => {
  console.log("Notes:");
  next();
});

notesRouter.get("/", async (req, res) => {
  const notes = await getNotes();
  res.status(200).json(notes);
});

notesRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const noteById = await getNoteById(id);
  console.log(`noteId: ${id}`);
  res.status(200).json(noteById[0]);
});

notesRouter.post("/", async (req, res) => {
  const value = req.body.value;
  const student_id = req.body.student_id;
  const subject_id = req.body.subject_id;
  const date = req.body.date;
  await addNote(value, student_id, subject_id, date);
  return res.status(201).json({
    value,
    student_id,
    subject_id,
    date,
  });
});

notesRouter.put("/:id", async (req, res) => {
  const value = req.body.value;
  const student_id = req.body.student_id;
  const subject_id = req.body.subject_id;
  const date = req.body.date;
  const id = req.params.id;
  await updateNote(id, value, student_id, subject_id, date);
  const updatedNote = await getNoteById(id);
  return res.status(200).json(updatedNote[0]);
});

notesRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await deleteNote(id);
  res.send("Torolve");
  res.status(204);
});

export { notesRouter };
