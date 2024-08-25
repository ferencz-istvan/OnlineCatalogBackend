import database from "./db.js";

export async function getClasses() {
  const result = await database.query(
    `SELECT * FROM classes ORDER BY grade, name;`
  );
  return result.rows;
}

export async function getClassById(id) {
  const result = await database.query(`SELECT * FROM classes WHERE id = $1`, [
    id,
  ]);
  return result.rows[0];
}

export async function addClass(name, grade, specialty, conductor_id) {
  await database.query(
    `INSERT INTO classes (name, grade, specialty, conductor_id) VALUES ($1, $2, $3, $4)`,
    [name, grade, specialty, conductor_id]
  );
}

export async function updateClass(id, name, grade, specialty, conductor_id) {
  await database.query(
    `UPDATE classes SET name = $1, grade = $2, specialty = $3, conductor_id = $4 WHERE id = $5`,
    [name, grade, specialty, conductor_id, id]
  );
}

export async function deleteClass(id) {
  await database.query(`DELETE FROM classes WHERE id = $1`, [id]);
}

export async function getClassmates(id) {
  const result = await database.query(
    `SELECT * FROM students WHERE class_id = $1 ORDER BY name`,
    [id]
  );
  return result.rows;
}
