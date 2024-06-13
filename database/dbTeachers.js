import database from "./db.js";

export async function getTeachers() {
  return await database`
    SELECT * FROM teachers 
    ORDER BY id;
    `;
}

export async function getTeacherById(id) {
  return await database`
    SELECT * FROM teachers
    WHERE id=${id}
    `;
}

export async function addTeacher(name, user_id) {
  await database`
    INSERT INTO teachers(name, user_id)
    VALUES (${name}, ${user_id})
    `;
}

export async function updateTeacher(id, name, user_id) {
  await database`
    UPDATE teachers
    SET name = ${name}, user_id = ${user_id}
    WHERE id = ${id} 
    `;
}

export async function deleteTeacherById(id) {
  await database`
    DELETE FROM teachers
    WHERE id=${id}
    `;
}
