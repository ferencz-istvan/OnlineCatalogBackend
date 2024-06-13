import { Router } from "express";
import {
  addTRelation,
  getTRelations,
  getTRelByClassId,
  getTRelBySubjectId,
  getTRelByTeacherId,
  deleteTRelation,
  getTRelByClassAndSubject,
  getTRelBySubjectAndTeacher,
  getTRelByTeacherAndClass,
} from "../../../database/dbTRelations.js";

const tRelationRouter = Router();

tRelationRouter.use((req, res, next) => {
  console.log("Relations:");
  next();
});

tRelationRouter.get("/", async (req, res) => {
  const relations = await getTRelations();
  res.status(200).json(relations);
});

tRelationRouter.get("/withClass", async (req, res) => {
  const class_id = req.body.class_id;
  const relation = await getTRelByClassId(class_id);
  res.status(200).json(relation);
});

tRelationRouter.get("/withSubject", async (req, res) => {
  const subject_id = req.body.subject_id;
  const relation = await getTRelBySubjectId(subject_id);
  res.status(200).json(relation);
});

tRelationRouter.get("/withTeacher", async (req, res) => {
  const teacher_id = req.body.teacher_id;
  const relation = await getTRelByTeacherId(teacher_id);
  res.status(200).json(relation);
});

tRelationRouter.get(
  /^\/(withClass&Subject|withSubject&Class)$/,
  async (req, res) => {
    const class_id = req.body.class_id;
    const subject_id = req.body.subject_id;
    const relation = await getTRelByClassAndSubject(class_id, subject_id);
    res.status(200).json(relation);
  }
);

tRelationRouter.get(
  /^\/(withSubject&Teacher|withTeacher&Subject)$/,
  async (req, res) => {
    const subject_id = req.body.subject_id;
    const teacher_id = req.body.teacher_id;
    const relation = await getTRelBySubjectAndTeacher(subject_id, teacher_id);
    res.status(200).json(relation);
  }
);

tRelationRouter.get(
  /^\/(withClass&Teacher|withTeacher&Class)$/,
  async (req, res) => {
    const teacher_id = req.body.teacher_id;
    const class_id = req.body.class_id;
    const relation = await getTRelByTeacherAndClass(teacher_id, class_id);
    res.status(200).json(relation);
  }
);

tRelationRouter.post("/", async (req, res) => {
  const class_id = req.body.class_id;
  const subject_id = req.body.subject_id;
  const teacher_id = req.body.teacher_id;
  await addTRelation(class_id, subject_id, teacher_id);
  return res.status(201).json({
    class_id,
    subject_id,
    teacher_id,
  });
});

tRelationRouter.delete("/", async (req, res) => {
  const class_id = req.body.class_id;
  const subject_id = req.body.subject_id;
  const teacher_id = req.body.teacher_id;
  await deleteTRelation(class_id, subject_id, teacher_id);
  res.send("Torolve");
  res.status(204);
});

export { tRelationRouter };
