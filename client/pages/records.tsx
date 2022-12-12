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
  const srecordReq = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/records/students`
  );

  const studentReq = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/records/registered-students`
  );

  const fReq = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/records/registered-faculties`
  );

  const frecordReq = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/records/faculties`
  );

  const studentRecord = await srecordReq.json();
  const registeredStudents = await studentReq.json();
  const registeredFaculties = await fReq.json();
  const facultyRecord = await frecordReq.json();

  return {
    props: {
      studentRecord,
      facultyRecord,
      registeredStudents,
      registeredFaculties,
    },
    revalidate: 3,
  };
};
