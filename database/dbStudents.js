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

export async function addStudent(name, class_id, parent_id, adress, user_id) {
  await database`
    INSERT INTO students(name, class_id, parent_id, adress, user_id)
    VALUES (${name}, ${class_id},${parent_id}, ${adress}, ${user_id})
    `;
}

export async function updateStudent(
  id,
  name,
  class_id,
  parent_id,
  adress,
  user_id
) {
  await database`
    UPDATE students
    SET name = ${name}, class_id=${class_id}, parent_id=${parent_id}, adress=${adress}, user_id=${user_id}
    WHERE id = ${id} 
    `;
}

export async function deleteStudent(id) {
  await database`
    DELETE FROM classes
    WHERE id=${id}
    `;
}
