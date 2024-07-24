import database from "./db.js";

export async function getParents() {
  return await database`
    SELECT * FROM parents 
    ORDER BY id;
    `;
}

export async function getParentById(id) {
  return await database`
    SELECT * FROM parents
    WHERE id=${id}
    `;
}

export async function addParent(name, phone_number, user_id) {
  await database`
    INSERT INTO parents(name, phone_number, user_id)
    VALUES (${name}, ${phone_number}, ${user_id})
    `;
}

export async function updateParent(id, name, phone_number, user_id) {
  await database`
    UPDATE parents
    SET name = ${name}, phone_number=${phone_number}, user_id = ${user_id}
    WHERE id = ${id} 
    `;
}

export async function deleteParentById(id) {
  await database`
    DELETE FROM parents
    WHERE id=${id}
    `;
}

export async function searchParentByUserId(user_id) {
  return await database`
  SELECT * FROM parents
  WHERE user_id=${user_id}
  `;
}
