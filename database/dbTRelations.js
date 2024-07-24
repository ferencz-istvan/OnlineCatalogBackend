//TRelation is a shortand for teaching relation
import database from "./db.js";

export async function getTRelations() {
  return await database`
    SELECT * FROM teachingrelations`;
}

export async function getTRelByClassId(class_id) {
  return await database`
    SELECT subjects.name AS subject, teachers.name AS teacher
    FROM teachingrelations
    JOIN subjects
    ON subject_id = subjects.id
    JOIN teachers
    ON teacher_id = teachers.id
    WHERE class_id=${class_id}
    `;
}

export async function getTRelBySubjectId(subject_id) {
  return await database`
    SELECT * FROM teachingrelations
    WHERE subject_id=${subject_id}
    `;
}

export async function getTRelByTeacherId(teacher_id) {
  return await database`
    SELECT * FROM teachingrelations
    WHERE teacher_id=${teacher_id}
    `;
}

export async function getTRelByClassAndSubject(class_id, subject_id) {
  //console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDd");
  return await database`
    SELECT * FROM teachingrelations
    WHERE class_id=${class_id} AND subject_id=${subject_id}
    `;
}

export async function getTRelBySubjectAndTeacher(subject_id, teacher_id) {
  return await database`
    SELECT * FROM teachingrelations
    WHERE subject_id=${subject_id} AND teacher_id=${teacher_id}
    `;
}

export async function getTRelByTeacherAndClass(teacher_id, class_id) {
  return await database`
    SELECT * FROM teachingrelations
    WHERE teacher_id=${teacher_id} AND class_id=${class_id}
    `;
}

export async function addTRelation(class_id, subject_id, teacher_id) {
  await database`
    INSERT INTO teachingrelations(class_id, subject_id, teacher_id)
    VALUES (${class_id}, ${subject_id},${teacher_id})
    `;
}

export async function deleteTRelation(class_id, subject_id, teacher_id) {
  await database`
    DELETE FROM teachingrelations
    WHERE class_id=${class_id} 
    AND subject_id=${subject_id} 
    AND teacher_id=${teacher_id}
    `;
}
