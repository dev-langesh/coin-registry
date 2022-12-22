import { GetServerSideProps, GetStaticProps } from "next";
import React, { useEffect, useRef, useState } from "react";
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
import { CircularProgress } from "@mui/material";

// {
//   studentRecord,
//   registeredStudents,
//   registeredFaculties,
//   facultyRecord,
// }: any

export default function Records() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const isExecuted = useRef(false);

  useEffect(() => {
    async function get() {
      setLoading(true);
      const req = await axios.get(`/api/records`);

      const data = await req.data;
      setLoading(false);

      console.log(data);
      dispatch(setStudentRecord(data.studentRec));
      dispatch(setRegisteredFaculties(data.faculties));
      dispatch(setRegisteredStudents(data.students));
      dispatch(setFacultyRecord(data.facultyRec));
    }

    if (isExecuted.current === false) {
      get();

      isExecuted.current = true;
    }
  }, []);

  return (
    <section className="mt-20 p-4 space-y-5 ">
      {loading ? (
        <div className="flex w-full items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <>
          <StudentRecord />
          <FacultyRecord />
        </>
      )}
    </section>
  );
}

// export const getServerSideProps: GetServerSideProps = async () => {
//   connectDb();

//   const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/records`);

//   const data = await req.json();

//   return {
//     props: {
//       studentRecord: data.studentRec,
//       facultyRecord: data.facultyRec,
//       registeredStudents: data.students,
//       registeredFaculties: data.faculties,
//     },
//   };
// };
