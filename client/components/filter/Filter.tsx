import { Alert, Snackbar } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../src/app/hooks";
import {
  closeStudentFilter,
  isStudentFilterOpen,
} from "../../src/features/filter/filterSlice";
import { setStudentRecord } from "../../src/features/records/recordSlice";
import Button from "./Button";
import { filterStudent, inputType } from "./filterOptions";

export default function Filter({
  variant,
}: {
  variant: "student" | "faculty";
}) {
  const [values, setValues] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<{ open: boolean; data: string }>({
    open: false,
    data: "",
  });

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

    setLoading(true);

    const req = await axios.post(`/api/filter-student`, values);

    const data = await req.data;

    setLoading(false);

    if (!data.error) {
      dispatch(setStudentRecord(data));
    } else {
      setError({
        open: true,
        data: data.error,
      });
    }

    closeFilter();
  };

  const clearFilter = async () => {
    setLoading(true);

    setValues({});

    const req = await axios.get(`/api/students`);

    const data = await req.data;

    setLoading(false);

    dispatch(setStudentRecord(data));

    closeFilter();
  };

  const closeFilter = () => {
    dispatch(closeStudentFilter());
  };

  const closeError = () => {
    setError((prev) => ({
      ...prev,
      open: false,
    }));
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
              className="border p-2 text-sm"
              key={f.id}
              {...f}
              id={`${f.id}`}
            />
          );
        })}
        <Button
          type="submit"
          loading={loading}
          text="Apply"
          clickHandler={handleSubmit}
        />
        <Button
          type="button"
          loading={loading}
          text="Clear Filters"
          clickHandler={clearFilter}
        />
      </form>

      <Snackbar open={error.open} autoHideDuration={4000} onClose={closeError}>
        <Alert onClose={closeError} severity="error" sx={{ width: "100%" }}>
          {error.data}
        </Alert>
      </Snackbar>
    </section>
  );
}
