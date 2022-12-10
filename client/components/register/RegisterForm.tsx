import { Radio } from "@mui/material";
import React, { ReactHTML, useEffect, useState } from "react";
import { registerStudent, inputType, registerFaculty } from "./register.type";

export default function RegisterForm() {
  const [inputs, setInputs] = useState<inputType[]>([]);
  const [state, setState] = useState<any>({
    user: "student",
  });

  useEffect(() => {
    setInputs(registerStudent);
  }, []);

  useEffect(() => {
    if (state.user === "student") setInputs(registerStudent);
    else setInputs(registerFaculty);
  }, [state.user]);

  const handleRadioButtonChange = (e: any) => {
    setState((prev: any) => {
      return {
        ...prev,
        user: e.target.value,
      };
    });
  };

  const handleChange = (e: any) => {
    setState((prev: any) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(state);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-6 shadow-2xl rounded-md p-6"
    >
      <h1 className="text-center text-3xl text-blue-500 font-bold">Register</h1>

      <section className="flex items-center justify-around">
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

      {inputs.map((input: inputType) => {
        return (
          <input
            className="border px-4 py-2"
            onChange={handleChange}
            key={input.id}
            name={input.name}
            placeholder={input.placeholder}
            type={input.type}
          />
        );
      })}
      <textarea
        className="border px-4 py-2"
        name="purpose"
        id="purpose"
        cols={30}
        rows={5}
        placeholder="Purpose"
        onChange={handleChange}
      ></textarea>

      <button className="bg-blue-500 p-2 font-bold text-xl text-white hover:bg-blue-600 tracking-wide hover:tracking-widest transition-all duration-200">
        Submit
      </button>
    </form>
  );
}
