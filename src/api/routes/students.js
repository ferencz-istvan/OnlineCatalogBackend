import { Router } from "express";
import {
  addStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  classAndParentName,
  getAllChildOfParent,
  updateStudentParentId,
  updateParentOfStudent,
} from "../../../database/dbStudents.js";
import { getParentIdByPhoneNumber } from "../../../database/dbParents.js";

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
  const address = req.body.address;
  const user_id = req.body.user_id;
  await addStudent(name, class_id, parent_id, address, user_id);
  return res.status(201).json({
    name,
    class_id,
    parent_id,
    address,
    user_id,
  });
});

studentsRouter.put("/:id", async (req, res) => {
  console.log("elértem idáig");
  const name = req.body.name;
  const class_id = req.body.class_id;
  const parent_id = req.body.parent_id;
  const address = req.body.address;
  const user_id = req.body.user_id;
  const id = req.params.id;
  console.log(`${name}+${class_id}+${parent_id}+${address}+${user_id}+${id}`);
  await updateStudent(id, name, class_id, parent_id, address, user_id);
  const updatedStudent = await getStudentById(id);
  return res.status(200).json(updatedStudent[0]);
});

studentsRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await deleteStudent(id);
  res.send("Torolve");
  res.status(204);
});

studentsRouter.get("/classAndParent/:id", async (req, res) => {
  const student_id = req.params.id;
  const classAndParent = await classAndParentName(student_id);
  res.status(200).json(classAndParent);
});

studentsRouter.get("/ofParent/:id", async (req, res) => {
  const id = req.params.id;
  const studentsOfParent = await getAllChildOfParent(id);
  console.log(`parent: ${id}`);
  res.status(200).json(studentsOfParent);
});

//i work on this function
studentsRouter.patch("/:id/parentWithPhoneNum", async (req, res) => {
  const id = req.params.id;
  const phoneNumber = req.body.phone_number;
  //await updateStudentParentId(id, phoneNumber);
  const parentId = getParentIdByPhoneNumber(phoneNumber);
  if (!parentId || parentId.length === 0 || parentId === 0) {
    throw new Error(`Parent with phone number ${phoneNumber} not found`);
  }
  await updateStudentParentId(id, parentId[0]);
  const updatedStudent = await getStudentById(id);
  return res.status(200).json(updatedStudent[0]);
});

studentsRouter.patch("/parentOfStudent/:id", async (req, res) => {
  const student_id = req.params.id;
  const parent_id = req.body.parent_id;
  await updateParentOfStudent(student_id, parent_id);
  const updatedStudent = await getStudentById(student_id);
  return res.status(200).json(updatedStudent[0]);
});

export { studentsRouter };
