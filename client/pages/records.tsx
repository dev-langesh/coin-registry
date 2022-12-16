import { GetServerSideProps, GetStaticProps } from "next";
import React, { useEffect } from "react";
import FacultyRecord from "../components/records/FacultyRecord";
import StudentRecord from "../components/records/StudentRecord";
import { connectDb } from "../server/config/connectDb";
import { useAppDispatch } from "../src/app/hooks";
import axios from "axios";
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

export const getServerSideProps: GetServerSideProps = async () => {
  connectDb();

  const req = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/records`
  );

  const data = await req.data;

  return {
    props: {
      studentRecord: data.studentRec,
      facultyRecord: data.facultyRec,
      registeredStudents: data.students,
      registeredFaculties: data.faculties,
    },
  };
};
