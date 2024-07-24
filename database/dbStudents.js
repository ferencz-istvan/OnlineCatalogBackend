import database from "./db.js";

export async function getStudents() {
  return await database`
    SELECT * FROM students 
    ORDER BY id;
    `;
}

export async function getStudentById(id) {
  return await database`
    SELECT * FROM students
    WHERE id=${id}
    `;
}

export async function addStudent(name, class_id, parent_id, address, user_id) {
  await database`
    INSERT INTO students(name, class_id, parent_id, address, user_id)
    VALUES (${name}, ${class_id},${parent_id}, ${address}, ${user_id})
    `;
}

export async function updateStudent(
  id,
  name,
  class_id,
  parent_id,
  address,
  user_id
) {
  await database`
    UPDATE students
    SET name = ${name}, class_id=${class_id}, parent_id=${parent_id}, address=${address}, user_id=${user_id}
    WHERE id = ${id} 
    `;
}

export async function deleteStudent(id) {
  await database`
    DELETE FROM students
    WHERE id=${id}
    `;
}

export async function searchStudentByUserId(user_id) {
  return await database`
  SELECT * FROM students
  WHERE user_id=${user_id}
  `;
}

export async function searchExtendedStudentByUserId(user_id) {
  return await database`
  SELECT students.*, CONCAT(classes.grade::text,  classes.name) AS class_name, parents.name AS parent_name 
  FROM students
  JOIN classes
  ON students.class_id = classes.id
  JOIN parents
  ON students.parent_id = parents.id
  WHERE students.user_id=${user_id}
  `;
}

export async function classAndParentName(student_id) {
  return await database`
  SELECT CONCAT(classes.grade::text,  classes.name) AS class, parents.name 
  FROM students
  JOIN classes
  ON students.class_id = classes.id
  JOIN parents
  ON students.parent_id = parents.id
  WHERE students.id=${student_id}
  `;
}
