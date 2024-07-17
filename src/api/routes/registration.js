import { Router } from "express";
import { addUser } from "../../../database/dbUsers.js";
import bcrypt from "bcrypt";
import { getUserIdByEmail } from "../../../database/dbUsers.js";
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
  console.log(req.body);
  const role = req.body.role;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  const class_id = req.body.class_id;
  let parent_id = req.body.parent_id;
  const address = req.body.address;
  const phone_number = req.body.phone_number;

  try {
    const securePassword = await hashPassword(password);
    await addUser(role, email, username, securePassword);
    const userId = await getUserIdByEmail(email);
    const { user_id } = userId[0];

    //registration depending from role
    switch (role) {
      case "Student":
        if (!parent_id) {
          parent_id = 2;
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
    return res.status(201).json(userId[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating user" });
  }
});

export { registrationRouter };
