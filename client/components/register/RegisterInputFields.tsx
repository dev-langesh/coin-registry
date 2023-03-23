import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { departments, inputType, year } from "./inputData";

export default function RegisterInputFields({ state, setState, inputs }: any) {
  const handleChange = (e: any) => {
    setState((prev: any) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <section className="space-y-6">
      {inputs.map((input: inputType) => {
        if (input.name === "department" || input.name === "year") {
          return (
            <FormControl key={input.id} fullWidth>
              <InputLabel className="capitalize" id="demo-simple-select-label">
                {input.name}
              </InputLabel>
              <Select
                className="rounded-none"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={state[input.name]}
                label={input.name}
                name={input.name}
                onChange={handleChange}
                variant="outlined"
                size="small"
              >
                {input.name === "department" &&
                  departments.map((dep: string) => {
                    return <MenuItem value={dep}>{dep}</MenuItem>;
                  })}

                {input.name === "year" &&
                  year.map((yr: string) => {
                    return <MenuItem value={yr}>{yr}</MenuItem>;
                  })}
              </Select>
            </FormControl>
          );
        }

        return (
          <div key={input.id} className="space-y-6 flex flex-col">
            <input
              className="border px-4 py-2 text-sm"
              onChange={handleChange}
              name={input.name}
              value={state[input.name]}
              placeholder={input.placeholder}
              type={input.type}
            />

            {input.name === "out_time" && (
              <textarea
                className="border px-4 py-2 text-sm"
                name="purpose"
                id="purpose"
                cols={30}
                rows={5}
                value={state.purpose}
                placeholder="Purpose"
                onChange={handleChange}
                key={100}
              ></textarea>
            )}
          </div>
        );
      })}
    </section>
  );
}
