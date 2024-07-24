import database from "./db.js";

export async function getNotes() {
  return await database`
    SELECT * FROM notes
    ORDER BY id;
    `;
}

export async function getNoteById(id) {
  return await database`
    SELECT * FROM notes
    WHERE id=${id}
    `;
}

export async function addNote(value, student_id, subject_id, date) {
  await database`
    INSERT INTO notes(value, student_id, subject_id, date)
    VALUES (${value}, ${student_id},${subject_id}, ${date})
    `;
}

export async function updateNote(id, value, student_id, subject_id, date) {
  await database`
    UPDATE notes
    SET value = ${value}, student_id=${student_id}, subject_id=${subject_id}, date=${date}
    WHERE id = ${id} 
    `;
}

export async function deleteNote(id) {
  await database`
    DELETE FROM notes
    WHERE id=${id}
    `;
}

export async function getNOtesOfStudent(student_id) {
  return await database`
  SELECT * FROM notes WHERE student_id=${student_id}
  ORDER BY subject_id
  `;
}
