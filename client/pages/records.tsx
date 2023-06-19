import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../src/app/hooks";
import axios from "axios";
import {
  setFacultyRecord,
  setRegisteredFaculties,
  setRegisteredStudents,
  setStudentRecord,
} from "../src/features/records/recordSlice";
import { CircularProgress } from "@mui/material";
import Record from "../components/records/Record";
import Link from "next/link";

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
    <section className=" md:mt-20 p-4 space-y-5 ">
      <Link
        className="bg-blue-500 p-2 text-white rounded-sm shadow-md"
        target="_blank"
        href="/api/report"
      >
        Download Report
      </Link>
      {loading ? (
        <div className="flex w-full items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <>
          <Record type="Student" />
          <Record type="Faculty" />
        </>
      )}
    </section>
  );
}
