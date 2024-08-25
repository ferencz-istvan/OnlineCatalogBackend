import database from "./db.js";

export async function getTeachers() {
  const result = await database.query(`SELECT * FROM teachers ORDER BY id;`);
  return result.rows;
}

export async function getTeacherById(id) {
  const result = await database.query(`SELECT * FROM teachers WHERE id = $1`, [
    id,
  ]);
  return result.rows[0];
}

export async function addTeacher(name, user_id) {
  await database.query(`INSERT INTO teachers (name, user_id) VALUES ($1, $2)`, [
    name,
    user_id,
  ]);
}

export async function updateTeacher(id, name, user_id) {
  await database.query(
    `UPDATE teachers SET name = $1, user_id = $2 WHERE id = $3`,
    [name, user_id, id]
  );
}

export async function deleteTeacherById(id) {
  await database.query(`DELETE FROM teachers WHERE id = $1`, [id]);
}

export async function searchTeacherByUserId(user_id) {
  const result = await database.query(
    `SELECT * FROM teachers WHERE user_id = $1`,
    [user_id]
  );
  return result.rows;
}
