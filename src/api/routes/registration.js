import { Router } from "express";
import bcrypt from "bcrypt";
import {
  addUser,
  getUserByEmail,
  getUserIdByEmail,
} from "../../../database/dbUsers.js";
import { addStudent } from "../../../database/dbStudents.js";
import { addTeacher } from "../../../database/dbTeachers.js";
import { addParent } from "../../../database/dbParents.js";

async function hashPassword(password) {
  const saltRounds = 12;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

const registrationRouter = Router();

registrationRouter.use((req, res, next) => {
  console.log("Registration");
  next();
});

registrationRouter.post("/", async (req, res) => {
  const email = req.body.email;
  const usersWithSameEmail = await getUserByEmail(email);
  if (usersWithSameEmail.length >= 1) {
    return res
      .status(409)
      .json({ message: "That email is already registrated" });
  }

  const role = req.body.role;
  const username = req.body.username;
  const password = req.body.password;

  const class_id = req.body.class_id;
  let parent_id = req.body.parent_id;
  const address = req.body.address;
  const phone_number = req.body.phone_number;
  console.log("USERNAME!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  console.log(username);

  try {
    const securePassword = await hashPassword(password);
    await addUser(role, email, username, securePassword);
    const userId = await getUserIdByEmail(email);
    const user_id = userId;
    console.log("USER ID !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log(user_id);
    //const { user_id } = userId;

    //registration depending from role
    switch (role) {
      case "Student":
        if (!parent_id) {
          parent_id = 12;
        }
        await addStudent(
          username,
          parseInt(class_id),
          parent_id,
          address,
          user_id
        );
        break;
      case "Parent":
        await addParent(username, phone_number, user_id);
        break;
      case "Teacher":
        await addTeacher(username, user_id);
        break;
      default:
        console.log("Error in student/parent/teacher registration.");
    }
    return res.status(200).json(userId[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating user" });
  }
});
/* registrationRouter.post("/", async (req, res) => {
  const email = req.body.email;
  const usersWithSameEmail = await getUserByEmail(email);
  if (usersWithSameEmail.rows.length >= 1) {
    return res
      .status(409)
      .json({ message: "That email is already registrated" });
  }

  const role = req.body.role;
  const username = req.body.username;
  const password = req.body.password;

  const class_id = req.body.class_id;
  let parent_id = req.body.parent_id;
  const address = req.body.address;
  const phone_number = req.body.phone_number;

  try {
    const securePassword = await hashPassword(password);
    await addUser(role, email, username, securePassword);
    const userIdResult = await getUserIdByEmail(email);
    const userId = userIdResult.rows[0].user_id;

    //registration depending from role
    switch (role) {
      case "Student":
        if (!parent_id) {
          parent_id = 12;
        }
        await addStudent(
          username,
          parseInt(class_id),
          parent_id,
          address,
          userId
        );
        break;
      case "Parent":
        await addParent(username, phone_number, userId);
        break;
      case "Teacher":
        await addTeacher(username, userId);
        break;
      default:
        console.log("Error in student/parent/teacher registration.");
    }
    return res.status(200).json({ userId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating user" });
  }
}); */

export { registrationRouter };
