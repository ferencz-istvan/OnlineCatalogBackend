/* import postgres from "postgres"; */
import database from "./db.js";

export async function getClasses() {
  return await database`
    SELECT * FROM classes 
    ORDER BY id;
    `;
}

export async function getClassById(id) {
  return await database`
    SELECT * FROM classes
    WHERE id=${id}
    `;
}

export async function addClass(name, grade, specialty, conductor_id) {
  await database`
    INSERT INTO classes(name, grade, specialty, conductor_id)
    VALUES (${name}, ${grade},${specialty}, ${conductor_id})
    `;
}

export async function updateClass(id, name, grade, specialty, conductor_id) {
  await database`
    UPDATE classes
    SET name = ${name}, grade=${grade}, specialty=${specialty}, conductor_id=${conductor_id}
    WHERE id = ${id} 
    `;
}

export async function deleteClass(id) {
  await database`
    DELETE FROM classes
    WHERE id=${id}
    `;
}
