import { Button } from "@mui/material";
import React from "react";
import { useAppDispatch } from "../../src/app/hooks";
import {
  openFacultyFilter,
  openStudentFilter,
} from "../../src/features/filter/filterSlice";
import FilterFaculty from "../filter/FilterFaculty";
import Filter from "../filter/Filter";

export default function TableHeader({
  title,
}: {
  title: "Students" | "Faculties";
}) {
  const dispatch = useAppDispatch();

  const openFilter = () => {
    if (title === "Faculties") {
      dispatch(openFacultyFilter());
    } else {
      dispatch(openStudentFilter());
    }
  };
  return (
    <>
      <Filter variant="student" />
      <FilterFaculty />
      <div className="py-4 flex justify-between items-center">
        <span className="text-xl font-semibold text-blue-500">{title}</span>
        <Button
          variant="contained"
          size="small"
          onClick={openFilter}
          className="bg-blue-500 rounded p-2 font-bold  text-white hover:bg-blue-600 tracking-wide  transition-all duration-200"
        >
          Filter
        </Button>
      </div>
    </>
  );
}
