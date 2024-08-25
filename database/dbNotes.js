import database from "./db.js";

export async function getNotes() {
  const result = await database.query(`SELECT * FROM notes ORDER BY id;`);
  return result.rows;
}

export async function getNoteById(id) {
  const result = await database.query(`SELECT * FROM notes WHERE id = $1`, [
    id,
  ]);
  return result.rows[0];
}

export async function addNote(value, student_id, subject_id, date) {
  await database.query(
    `INSERT INTO notes (value, student_id, subject_id, date) VALUES ($1, $2, $3, $4)`,
    [value, student_id, subject_id, date]
  );
}

export async function updateNote(id, value, student_id, subject_id, date) {
  await database.query(
    `UPDATE notes SET value = $1, student_id = $2, subject_id = $3, date = $4 WHERE id = $5`,
    [value, student_id, subject_id, date, id]
  );
}

export async function deleteNote(id) {
  await database.query(`DELETE FROM notes WHERE id = $1`, [id]);
}

export async function getNotesOfStudent(student_id) {
  const result = await database.query(
    `SELECT * FROM notes WHERE student_id = $1 ORDER BY subject_id`,
    [student_id]
  );
  return result.rows;
}

export async function getNotesOfClass(class_id, subject_id) {
  const result = await database.query(
    `
    SELECT notes.* 
    FROM notes 
    JOIN students ON notes.student_id = students.id
    WHERE students.class_id = $1 AND notes.subject_id = $2
    ORDER BY notes.student_id ASC, notes.date DESC
  `,
    [class_id, subject_id]
  );
  return result.rows;
}
