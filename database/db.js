import pg from "pg";
const { Pool } = pg;
import dotenv from "dotenv";
dotenv.config();

const database = new Pool({
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE,
  username: process.env.PGUSER,
  password: process.env.PASSWORD,
  timezone: "Europe/Bucharest",
});

export async function createUsersTable() {
  await database.query(`CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    role TEXT NOT NULL,
    email TEXT NOT NULL,
    username TEXT NOT NULL,
    Password TEXT NOT NULL
  )`);
}

export async function createTeachersSubjectsParentsTable() {
  await database.query(`CREATE TABLE IF NOT EXISTS teachers (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    user_id INTEGER REFERENCES users(user_id)
  )`);
  await database.query(`CREATE TABLE IF NOT EXISTS subjects (
    id SERIAL PRIMARY KEY,
    description TEXT,
    name TEXT
  )`);
  await database.query(`CREATE TABLE IF NOT EXISTS parents (
    id SERIAL PRIMARY KEY,
    name TEXT,
    phone_number TEXT,
    user_id INTEGER REFERENCES users(user_id)
  )`);
}

export async function createClassesTable() {
  await database.query(`CREATE TABLE IF NOT EXISTS classes (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    grade SMALLINT NOT NULL,
    specialty TEXT,
    conductor_id INTEGER REFERENCES teachers(id)
  )`);
}

export async function createStudentsTable() {
  await database.query(`CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    class_id INTEGER REFERENCES classes(id),
    parent_id INTEGER REFERENCES parents(id),
    address TEXT,
    user_id INTEGER REFERENCES users(user_id)
  )`);
}

export async function createNotesAbsencesTable() {
  await database.query(`CREATE TABLE IF NOT EXISTS notes (
    id SERIAL PRIMARY KEY, 
    value SMALLINT NOT NULL,
    student_id INTEGER REFERENCES students(id),
    subject_id INTEGER REFERENCES subjects(id),
    date TIMESTAMP WITH TIME ZONE NOT NULL
  )`);
  await database.query(`CREATE TABLE IF NOT EXISTS absences (
    id SERIAL PRIMARY KEY,
    status TEXT NOT NULL,
    student_id INTEGER REFERENCES students(id),
    subject_id INTEGER REFERENCES subjects(id),
    date TIMESTAMP WITH TIME ZONE NOT NULL
  )`);
}

export async function createTeachingRelationsTable() {
  await database.query(`CREATE TABLE IF NOT EXISTS teachingrelations (
    class_id INTEGER REFERENCES classes(id),
    subject_id INTEGER REFERENCES subjects(id),
    teacher_id INTEGER REFERENCES teachers(id),
    PRIMARY KEY (class_id, subject_id, teacher_id)
  )`);
}

export default database;
