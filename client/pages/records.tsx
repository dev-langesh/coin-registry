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
