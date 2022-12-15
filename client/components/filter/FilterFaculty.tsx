import axios from "axios";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../src/app/hooks";
import {
  closeFacultyFilter,
  isFacultyFilterOpen,
} from "../../src/features/filter/filterSlice";
import { setFacultyRecord } from "../../src/features/records/recordSlice";
import { filterFaculty, inputType } from "./filterOptions";

export default function FilterFaculty() {
  const [values, setValues] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  const isOpen = useAppSelector(isFacultyFilterOpen);

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

    setLoading(true);

    const req = await axios.post(`/api/filter-faculty`, values);

    const data = await req.data;

    dispatch(setFacultyRecord(data));

    setLoading(false);

    closeFilter();
  };

  const closeFilter = () => {
    dispatch(closeFacultyFilter());
  };

  const clearFilter = async () => {
    setLoading(true);

    const req = await axios.get(`/api/faculties`);

    const data = await req.data;

    setLoading(false);

    dispatch(setFacultyRecord(data));

    closeFilter();
  };

  return (
    <section>
      <div
        onClick={closeFilter}
        className={`${
          isOpen ? "" : "hidden"
        } absolute bg-black/30 w-screen h-screen top-0 left-0 flex items-center justify-center`}
      ></div>
      <form
        onSubmit={handleSubmit}
        className={`${
          isOpen ? "" : "hidden"
        } absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-white flex flex-col p-4 shadow-black/20 shadow-xl rounded space-y-4`}
        action=""
      >
        <h1 className="text-center text-xl font-semibold">Filter Faculty</h1>
        {filterFaculty.map((f: inputType) => {
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
        <button
          type="submit"
          className="bg-blue-500 p-2 font-bold text-xl text-white hover:bg-blue-600 tracking-wide hover:tracking-widest transition-all duration-200"
        >
          {loading ? "Loading..." : "Apply"}
        </button>{" "}
        <button
          onClick={clearFilter}
          type="button"
          className="bg-blue-500 p-2 font-bold text-xl text-white hover:bg-blue-600 tracking-wide hover:tracking-widest transition-all duration-200"
        >
          {loading ? "Loading..." : "Clear Filter"}
        </button>{" "}
      </form>
    </section>
  );
}
