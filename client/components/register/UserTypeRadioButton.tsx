import { Radio } from "@mui/material";
import React from "react";

export default function UserTypeRadioButton({ state, setState }: any) {
  const handleRadioButtonChange = (e: any) => {
    setState((prev: any) => {
      return {
        ...prev,
        user: e.target.value,
      };
    });
  };

  return (
    <section className="flex items-center justify-between text-md w-full space-x-7">
      <div className="flex items-center">
        <Radio
          checked={state?.user === "student"}
          onChange={handleRadioButtonChange}
          value="student"
          name="radio-buttons"
          inputProps={{ "aria-label": "Student" }}
        />{" "}
        Student
      </div>
      <div className="flex items-center">
        <Radio
          checked={state?.user === "faculty"}
          onChange={handleRadioButtonChange}
          value="faculty"
          name="radio-buttons"
          inputProps={{ "aria-label": "Faculty" }}
        />{" "}
        Faculty
      </div>
    </section>
  );
}
