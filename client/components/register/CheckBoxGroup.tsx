import React, { useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel, FormGroup } from "@mui/material";
import { inputType, registerStudent, registerFaculty } from "./inputData";

export default function CheckBoxGroup({
  setState,
  state,
  inputs,
  setInputs,
}: any) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.name;

    if (name === "registered") {
      const blackList = ["name", "department", "year"];

      const filteredInputs = inputs.filter((input: inputType) => {
        return !blackList.includes(input.name);
      });

      if (e.target.checked) {
        setInputs(filteredInputs);
      } else if (state.user === "student") {
        setInputs(registerStudent);
      } else if (state.user === "faculty") {
        setInputs(registerFaculty);
      }
    }

    setState((prev: any) => {
      return {
        ...prev,
        [name]: e.target.checked,
      };
    });
  }

  return (
    <section>
      <FormGroup className="flex items-center">
        <FormControlLabel
          control={
            <Checkbox
              name="registered"
              onChange={handleChange}
              checked={state.registered}
            />
          }
          label="Already Registered"
        />
        {/* <FormControlLabel
          control={
            <Checkbox
              name="updateStatus"
              onChange={handleChange}
              checked={state.updateStatus}
            />
          }
          label="Update Status"
        /> */}
      </FormGroup>
    </section>
  );
}
