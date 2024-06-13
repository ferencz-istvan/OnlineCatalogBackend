import database from "./db.js";

export async function getSubjects() {
  return await database`
    SELECT * FROM subjects 
    ORDER BY id;
    `;
}

export async function getSubjectById(id) {
  return await database`
    SELECT * FROM subjects
    WHERE id=${id}
    `;
}

export async function addSubject(description, name) {
  await database`
    INSERT INTO subjects(description, name)
    VALUES (${description}, ${name})
    `;
}

export async function updateSubject(id, description, name) {
  await database`
    UPDATE subjects
    SET name = ${name}, description=${description}
    WHERE id = ${id} 
    `;
}

export async function deleteSubject(id) {
  await database`
    DELETE FROM subjects
    WHERE id=${id}
    `;
}
