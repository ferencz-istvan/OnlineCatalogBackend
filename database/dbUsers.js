import database from "./db.js";

export async function getUsers() {
  const result = await database.query(`SELECT * FROM users ORDER BY user_id;`);
  return result.rows;
}

export async function getUserById(id) {
  const result = await database.query(
    `SELECT * FROM users WHERE user_id = $1`,
    [id]
  );
  return result.rows[0];
}

export async function addUser(role, email, username, password) {
  await database.query(
    `INSERT INTO users (role, email, username, password) VALUES ($1, $2, $3, $4)`,
    [role, email, username, password]
  );
}

export async function updateUser(id, role, email, username, password) {
  await database.query(
    `UPDATE users SET role = $1, email = $2, username = $3, password = $4 WHERE user_id = $5`,
    [role, email, username, password, id]
  );
}

export async function deleteUserById(id) {
  await database.query(`DELETE FROM users WHERE user_id = $1`, [id]);
}

/* export async function getUserByEmail(email) {
  const result = await database.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  return result.rows;
} */

export async function getUserByEmail(email) {
  try {
    const result = await database.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );
    return result.rows;
  } catch (error) {
    console.error(error);
    return []; // or throw error;
  }
}

export async function getUserIdByEmail(email) {
  const result = await database.query(
    `SELECT user_id FROM users WHERE email = $1`,
    [email]
  );
  return result.rows[0].user_id;
}
