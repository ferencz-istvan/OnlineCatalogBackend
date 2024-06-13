import { Router } from "express";
import {
  addAbsence,
  getAbsences,
  getAbsenceById,
  updateAbsence,
  deleteAbsence,
} from "../../../database/dbAbsences.js";

const absencesRouter = Router();

absencesRouter.use((req, res, next) => {
  console.log("Absences:");
  next();
});

absencesRouter.get("/", async (req, res) => {
  const absences = await getAbsences();
  res.status(200).json(absences);
});

absencesRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const absenceById = await getAbsenceById(id);
  console.log(`noteId: ${id}`);
  res.status(200).json(absenceById[0]);
});

absencesRouter.post("/", async (req, res) => {
  const status = req.body.status;
  const student_id = req.body.student_id;
  const subject_id = req.body.subject_id;
  const date = req.body.date;
  await addAbsence(status, student_id, subject_id, date);
  return res.status(201).json({
    status,
    student_id,
    subject_id,
    date,
  });
});

absencesRouter.put("/:id", async (req, res) => {
  const status = req.body.status;
  const student_id = req.body.student_id;
  const subject_id = req.body.subject_id;
  const date = req.body.date;
  const id = req.params.id;
  await updateAbsence(id, status, student_id, subject_id, date);
  const updatedAbsence = await getAbsenceById(id);
  return res.status(200).json(updatedAbsence[0]);
});

absencesRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await deleteAbsence(id);
  res.send("Torolve");
  res.status(204);
});

export { absencesRouter };
