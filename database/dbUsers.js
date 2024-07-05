import database from "./db.js";

export async function getUsers() {
  return await database`
    SELECT * FROM users 
    ORDER BY user_id;
    `;
}

export async function getUserById(id) {
  return await database`
    SELECT * FROM users
    WHERE user_id=${id}
    `;
}

export async function addUser(role, email, username, password) {
  await database`
    INSERT INTO users(role, email, username, password)
    VALUES (${role}, ${email}, ${username}, ${password} )
    `;
}

export async function updateUser(id, role, email, username, password) {
  await database`
    UPDATE users
    SET role = ${role}, email = ${email}, username = ${username}, password=${password}
    WHERE user_id = ${id} 
    `;
}

export async function deleteUserById(id) {
  await database`
    DELETE FROM users
    WHERE user_id=${id}
    `;
}

export async function getUserByEmail(email) {
  return await database`
  SELECT * FROM users
  WHERE email=${email}
  `;
}
