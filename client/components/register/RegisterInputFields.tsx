import React from "react";
import { inputType } from "./inputData";

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
