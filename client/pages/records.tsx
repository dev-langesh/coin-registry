import { GetStaticProps } from "next";
import React, { useEffect } from "react";
import FacultyRecord from "../components/records/FacultyRecord";
import StudentRecord from "../components/records/StudentRecord";
import { useAppDispatch } from "../src/app/hooks";
import {
  setFacultyRecord,
  setRegisteredFaculties,
  setRegisteredStudents,
  setStudentRecord,
} from "../src/features/records/recordSlice";

export default function Records({
  studentRecord,
  registeredStudents,
  registeredFaculties,
  facultyRecord,
}: any) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setStudentRecord(studentRecord));
    dispatch(setRegisteredFaculties(registeredFaculties));
    dispatch(setRegisteredStudents(registeredStudents));
    dispatch(setFacultyRecord(facultyRecord));
  }, []);

  return (
    <section className="mt-20 p-4 space-y-5">
      <StudentRecord />
      <FacultyRecord />
    </section>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  console.log(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/records`);
  const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/records`);

  const data = await req.json();

  console.log(data);

  return {
    props: {
      studentRecord: data.studentRec,
      facultyRecord: data.facultyRec,
      registeredStudents: data.students,
      registeredFaculties: data.faculties,
    },
    revalidate: 3,
  };
};
