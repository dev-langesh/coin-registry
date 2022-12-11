import axios from "axios";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../src/app/hooks";
import {
  closeStudentFilter,
  isStudentFilterOpen,
} from "../../src/features/filter/filterSlice";
import { setRegisteredStudents } from "../../src/features/records/recordSlice";
import { filterStudent, inputType } from "./filterOptions";

export default function FilterStudent() {
  const [values, setValues] = useState<any>({});

  const isOpen = useAppSelector(isStudentFilterOpen);

  const dispatch = useAppDispatch();

  const handleChange = async (e: any) => {
    setValues((prev: any) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const req = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/record/filter-student`,
      values
    );

    const data = await req.data;

    console.log(data);

    dispatch(setRegisteredStudents(data));
  };

  const closeFilter = () => {
    dispatch(closeStudentFilter());
  };

  return (
    <section>
      <div
        onClick={closeFilter}
        className={`${
          isOpen ? "" : "hidden"
        } absolute bg-black/30 w-screen h-screen top-0 left-0 `}
      ></div>
      <form
        onSubmit={handleSubmit}
        className={`${
          isOpen ? "" : "hidden"
        } absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-white flex flex-col p-4 shadow-black/20 shadow-xl rounded space-y-4`}
        action=""
      >
        <h1 className="text-center text-xl font-semibold">Filter Student</h1>
        {filterStudent.map((f: inputType) => {
          return (
            <input
              onChange={handleChange}
              value={values[f.name]}
              className="border p-2"
              key={f.id}
              {...f}
              id={`${f.id}`}
            />
          );
        })}
        <button className="bg-blue-500 p-2 font-bold text-xl text-white hover:bg-blue-600 tracking-wide hover:tracking-widest transition-all duration-200">
          Apply
        </button>{" "}
      </form>
    </section>
  );
}
