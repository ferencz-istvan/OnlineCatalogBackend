import database from "./db.js";

export async function getSubjects() {
  const result = await database.query(`SELECT * FROM subjects ORDER BY id;`);
  return result.rows;
}

export async function getSubjectById(id) {
  const result = await database.query(`SELECT * FROM subjects WHERE id = $1`, [
    id,
  ]);
  return result.rows[0];
}

export async function addSubject(description, name) {
  await database.query(
    `INSERT INTO subjects (description, name) VALUES ($1, $2)`,
    [description, name]
  );
}

export async function updateSubject(id, name, description) {
  await database.query(
    `UPDATE subjects SET name = $1, description = $2 WHERE id = $3`,
    [name, description, id]
  );
}

export async function deleteSubject(id) {
  await database.query(`DELETE FROM subjects WHERE id = $1`, [id]);
}
