import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { helloRouter } from "./src/api/routes/helloWorld.js";
import { usersRouter } from "./src/api/routes/users.js";
import { teachersRouter } from "./src/api/routes/teachers.js";
import { parentsRouter } from "./src/api/routes/parents.js";
import { subjectsRouter } from "./src/api/routes/subjectt.js";
import { classesRouter } from "./src/api/routes/classes.js";
import { studentsRouter } from "./src/api/routes/students.js";
import { notesRouter } from "./src/api/routes/notes.js";
import { absencesRouter } from "./src/api/routes/absences.js";
import { tRelationRouter } from "./src/api/routes/tRelations.js";
import { registrationRouter } from "./src/api/routes/registration.js";

import { loginRouter } from "./src/api/routes/login.js";
import { searchByUserRouter } from "./src/api/routes/searchByUserId.js";

import { verifyJWT } from "./src/api/middlewares/verifyJWT.js";

const port = 3000;

const server = express();

const corsOptions = {
  origin: "*",
  methods: "*",
  allowedHeaders: "*",
};

server.use(cors(corsOptions));

//ez normál esetben nem biztonságos, mert így mindenki hozzáfér a szerverhez
//res.header("Access-Control-Allow-Headers", "*");
/* server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
}); */

server.use((req, res, next) => {
  console.log("A request has been received");
  next();
});

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use("/login", loginRouter);
server.use("/registration", registrationRouter);
server.use("/classes", classesRouter);

server.use(verifyJWT);

server.use("/", helloRouter);
server.use("/users", usersRouter);
server.use("/teachers", teachersRouter);
server.use("/parents", parentsRouter);
server.use("/subjects", subjectsRouter);
server.use("/students", studentsRouter);
server.use("/notes", notesRouter);
server.use("/absences", absencesRouter);
server.use("/relations", tRelationRouter);
server.use("/srcbyuser", searchByUserRouter);

server.use((_req, res) => {
  res.json({ errorMesssage: "Can't find this page" }).status(404);
});

server.listen(port, () => {
  console.log(`The server started on the following port -> localhost:${port} `);
});
