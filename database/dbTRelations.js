import database from "./db.js";

export async function getTRelations() {
  const result = await database.query(`SELECT * FROM teachingrelations`);
  return result.rows;
}

export async function getTRelByClassId(class_id) {
  const result = await database.query(
    `
    SELECT subjects.name AS subject, teachers.name AS teacher
    FROM teachingrelations
    JOIN subjects
    ON subject_id = subjects.id
    JOIN teachers
    ON teacher_id = teachers.id
    WHERE class_id = $1
  `,
    [class_id]
  );
  return result.rows;
}

export async function getSubjectsByClassId(class_id) {
  const result = await database.query(
    `
    SELECT DISTINCT subjects.id, subjects.name, subjects.description
    FROM teachingrelations
    JOIN subjects
    ON subject_id = subjects.id
    WHERE class_id = $1
    ORDER BY subjects.name
  `,
    [class_id]
  );
  return result.rows;
}

export async function getTRelBySubjectId(subject_id) {
  const result = await database.query(
    `SELECT * FROM teachingrelations WHERE subject_id = $1`,
    [subject_id]
  );
  return result.rows;
}

export async function getTRelByTeacherId(teacher_id) {
  const result = await database.query(
    `
    SELECT subjects.name AS subject, teachingrelations.subject_id, CONCAT(classes.grade, classes.name) AS class, teachingrelations.class_id
    FROM teachingrelations
    JOIN subjects
    ON subject_id = subjects.id
    JOIN classes
    ON class_id = classes.id
    WHERE teacher_id = $1
  `,
    [teacher_id]
  );
  return result.rows;
}

export async function getTRelByClassAndSubject(class_id, subject_id) {
  const result = await database.query(
    `SELECT * FROM teachingrelations WHERE class_id = $1 AND subject_id = $2`,
    [class_id, subject_id]
  );
  return result.rows;
}

export async function getTRelBySubjectAndTeacher(subject_id, teacher_id) {
  const result = await database.query(
    `SELECT * FROM teachingrelations WHERE subject_id = $1 AND teacher_id = $2`,
    [subject_id, teacher_id]
  );
  return result.rows;
}

export async function getTRelByTeacherAndClass(teacher_id, class_id) {
  const result = await database.query(
    `SELECT * FROM teachingrelations WHERE teacher_id = $1 AND class_id = $2`,
    [teacher_id, class_id]
  );
  return result.rows;
}

export async function addTRelation(class_id, subject_id, teacher_id) {
  await database.query(
    `INSERT INTO teachingrelations(class_id, subject_id, teacher_id) VALUES ($1, $2, $3)`,
    [class_id, subject_id, teacher_id]
  );
}

export async function deleteTRelation(class_id, subject_id, teacher_id) {
  await database.query(
    `DELETE FROM teachingrelations WHERE class_id = $1 AND subject_id = $2 AND teacher_id = $3`,
    [class_id, subject_id, teacher_id]
  );
}
