import database from "./db.js";

export async function getParents() {
  const result = await database.query(`SELECT * FROM parents ORDER BY id;`);
  return result.rows;
}

export async function getParentById(id) {
  const result = await database.query(`SELECT * FROM parents WHERE id = $1`, [
    id,
  ]);
  return result.rows[0];
}

export async function getParentByPhoneNumber(phoneNumber) {
  const result = await database.query(
    `SELECT * FROM parents WHERE phone_number = $1`,
    [phoneNumber]
  );
  return result.rows;
}

export async function addParent(name, phone_number, user_id) {
  await database.query(
    `INSERT INTO parents (name, phone_number, user_id) VALUES ($1, $2, $3)`,
    [name, phone_number, user_id]
  );
}

export async function updateParent(id, name, phone_number, user_id) {
  await database.query(
    `UPDATE parents SET name = $1, phone_number = $2, user_id = $3 WHERE id = $4`,
    [name, phone_number, user_id, id]
  );
}

export async function deleteParentById(id) {
  await database.query(`DELETE FROM parents WHERE id = $1`, [id]);
}

export async function searchParentByUserId(user_id) {
  const result = await database.query(
    `SELECT * FROM parents WHERE user_id = $1`,
    [user_id]
  );
  return result.rows;
}

export async function getParentIdByPhoneNumber(phoneNumber) {
  const result = await database.query(
    `SELECT id FROM parents WHERE phone_number = $1`,
    [phoneNumber]
  );
  return result.rows[0];
}
