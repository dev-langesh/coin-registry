import React, { useEffect, useState } from "react";
import { registerStudent, inputType } from "./register.type";

export default function RegisterForm() {
  const [inputs, setInputs] = useState<inputType[]>([]);

  useEffect(() => {
    setInputs(registerStudent);
  }, []);

  return (
    <form className="flex flex-col space-y-6 shadow-2xl rounded-md p-6">
      <h1 className="text-center text-3xl text-blue-500 font-bold">Register</h1>

      {inputs.map((input: inputType) => {
        return (
          <input
            className="border px-4 py-2"
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
      ></textarea>

      <button className="bg-blue-500 p-2 font-bold text-xl text-white hover:bg-blue-600 tracking-wide hover:tracking-widest transition-all duration-200">
        Submit
      </button>
    </form>
  );
}
