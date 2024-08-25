import database from "./db.js";

export async function getAbsences() {
  const result = await database.query(`SELECT * FROM absences ORDER BY id;`);
  return result.rows;
}

export async function getAbsenceById(id) {
  const result = await database.query(`SELECT * FROM absences WHERE id = $1`, [
    id,
  ]);
  return result.rows[0];
}

export async function addAbsence(status, student_id, subject_id, date) {
  await database.query(
    `INSERT INTO absences (status, student_id, subject_id, date) VALUES ($1, $2, $3, $4)`,
    [status, student_id, subject_id, date]
  );
}

export async function updateAbsence(id, status, student_id, subject_id, date) {
  await database.query(
    `UPDATE absences SET status = $1, student_id = $2, subject_id = $3, date = $4 WHERE id = $5`,
    [status, student_id, subject_id, date, id]
  );
}

export async function deleteAbsence(id) {
  await database.query(`DELETE FROM absences WHERE id = $1`, [id]);
}

export async function getAbsencesOfStudent(student_id) {
  const result = await database.query(
    `SELECT * FROM absences WHERE student_id = $1 ORDER BY subject_id`,
    [student_id]
  );
  return result.rows;
}

export async function getAbsencesOfClass(class_id, subject_id) {
  const result = await database.query(
    `
    SELECT absences.* 
    FROM absences 
    JOIN students ON absences.student_id = students.id
    WHERE students.class_id = $1 AND absences.subject_id = $2
    ORDER BY student_id ASC, date DESC
  `,
    [class_id, subject_id]
  );
  return result.rows;
}
