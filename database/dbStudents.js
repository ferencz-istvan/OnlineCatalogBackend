import database from "./db.js";

export async function getStudents() {
  const result = await database.query(`SELECT * FROM students ORDER BY id;`);
  return result.rows;
}

export async function getStudentById(id) {
  const result = await database.query(`SELECT * FROM students WHERE id = $1`, [
    id,
  ]);
  return result.rows[0];
}

export async function addStudent(name, class_id, parent_id, address, user_id) {
  await database.query(
    `INSERT INTO students (name, class_id, parent_id, address, user_id) VALUES ($1, $2, $3, $4, $5)`,
    [name, class_id, parent_id, address, user_id]
  );
}

export async function updateStudent(
  id,
  name,
  class_id,
  parent_id,
  address,
  user_id
) {
  await database.query(
    `UPDATE students SET name = $1, class_id = $2, parent_id = $3, address = $4, user_id = $5 WHERE id = $6`,
    [name, class_id, parent_id, address, user_id, id]
  );
}

export async function deleteStudent(id) {
  await database.query(`DELETE FROM students WHERE id = $1`, [id]);
}

export async function searchStudentByUserId(user_id) {
  const result = await database.query(
    `SELECT * FROM students WHERE user_id = $1`,
    [user_id]
  );
  return result.rows;
}

export async function searchExtendedStudentByUserId(user_id) {
  const result = await database.query(
    `
    SELECT students.*, CONCAT(classes.grade::text,  classes.name) AS class_name, parents.name AS parent_name 
    FROM students
    JOIN classes
    ON students.class_id = classes.id
    JOIN parents
    ON students.parent_id = parents.id
    WHERE students.user_id = $1
  `,
    [user_id]
  );
  return result.rows;
}

export async function classAndParentName(student_id) {
  const result = await database.query(
    `
    SELECT CONCAT(classes.grade::text,  classes.name) AS class, parents.name 
    FROM students
    JOIN classes
    ON students.class_id = classes.id
    JOIN parents
    ON students.parent_id = parents.id
    WHERE students.id = $1
  `,
    [student_id]
  );
  return result.rows[0];
}

export async function getAllChildOfParent(parent_id) {
  const result = await database.query(
    `SELECT * FROM students WHERE parent_id = $1`,
    [parent_id]
  );
  return result.rows;
}

export async function updateStudentParentId(id, parentId) {
  await database.query(`UPDATE students SET parent_id = $1 WHERE id = $2`, [
    parentId,
    id,
  ]);
}

export async function updateParentOfStudent(student_id, parent_id) {
  await database.query(`UPDATE students SET parent_id = $1 WHERE id = $2`, [
    parent_id,
    student_id,
  ]);
}
