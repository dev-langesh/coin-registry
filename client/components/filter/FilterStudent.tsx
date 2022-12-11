import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../src/app/hooks";
import {
  closeStudentFilter,
  isStudentFilterOpen,
} from "../../src/features/filter/filterSlice";
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

    console.log(values);
  };

  const closeFilter = () => {
    dispatch(closeStudentFilter());
  };

  return (
    <div
      onClick={closeFilter}
      className={`${
        isOpen ? "" : "hidden"
      } absolute bg-black/30 w-screen h-screen top-0 left-0 flex items-center justify-center`}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white flex flex-col p-4 shadow-black/20 shadow-xl rounded space-y-4"
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
    </div>
  );
}
