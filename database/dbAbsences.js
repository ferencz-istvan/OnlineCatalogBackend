import database from "./db.js";

export async function getAbsences() {
  return await database`
    SELECT * FROM absences
    ORDER BY id;
    `;
}

export async function getAbsenceById(id) {
  return await database`
    SELECT * FROM absences
    WHERE id=${id}
    `;
}

export async function addAbsence(status, student_id, subject_id, date) {
  await database`
    INSERT INTO absences(status, student_id, subject_id, date)
    VALUES (${status}, ${student_id},${subject_id}, ${date})
    `;
}

export async function updateAbsence(id, status, student_id, subject_id, date) {
  await database`
    UPDATE absences
    SET status = ${status}, student_id=${student_id}, subject_id=${subject_id}, date=${date}
    WHERE id = ${id} 
    `;
}

export async function deleteAbsence(id) {
  await database`
    DELETE FROM absences
    WHERE id=${id}
    `;
}

export async function getAbsencesOfStudent(student_id) {
  return await database`
  SELECT * FROM absences WHERE student_id=${student_id}
  ORDER BY subject_id
  `;
}

export async function getAbsencesOfClass(class_id, subject_id) {
  return await database`
 	 SELECT absences.* 
	 FROM absences 
	 JOIN students ON absences.student_id=students.id
	  WHERE students.class_id=${class_id} AND absences.subject_id=${subject_id}
	  ORDER BY student_id ASC, date DESC
  `;
}
