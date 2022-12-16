import { Alert, Radio, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { registerStudent, inputType, registerFaculty } from "./register.type";
import axios from "axios";

const initialState = {
  user: "student",
  reg_no: "",
  name: "",
  department: "",
  year: "",
  purpose: "",
  out_time: "",
  status: "",
};

export default function RegisterForm() {
  const [inputs, setInputs] = useState<inputType[]>([]);
  const [state, setState] = useState<any>(initialState);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<{ open: boolean; data: string }>({
    open: false,
    data: "",
  });
  const [message, setMessage] = useState<{ open: boolean; data: string }>({
    open: false,
    data: "",
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

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    setLoading(true);

    console.log(state);

    const req = await axios.post(`/api/register`, state);

    const data = await req.data;

    setLoading(false);

    console.log(data);

    if (data.error) {
      setError({ open: true, data: data.error });
    } else {
      setMessage({
        open: true,
        data: data.message,
      });
      setState(initialState);
    }
  };

  const closeError = () => {
    setError((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const closeMessage = () => {
    setMessage((prev) => ({
      ...prev,
      open: false,
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-6 shadow-2xl rounded-md p-6 mb-10"
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
          <div key={input.id} className="space-y-6 flex flex-col">
            <input
              className="border px-4 py-2"
              onChange={handleChange}
              name={input.name}
              value={state[input.name]}
              placeholder={input.placeholder}
              type={input.type}
            />
            {input.name === "out_time" && (
              <textarea
                className="border px-4 py-2"
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

      <button className="bg-blue-500 p-2 font-bold text-xl text-white hover:bg-blue-600 tracking-wide hover:tracking-widest transition-all duration-200">
        {loading ? "Loading..." : "Submit"}
      </button>
      <Snackbar open={error.open} autoHideDuration={4000} onClose={closeError}>
        <Alert onClose={closeError} severity="error" sx={{ width: "100%" }}>
          {error.data}
        </Alert>
      </Snackbar>
      <Snackbar
        open={message.open}
        autoHideDuration={4000}
        onClose={closeMessage}
      >
        <Alert onClose={closeMessage} severity="success" sx={{ width: "100%" }}>
          {message.data}
        </Alert>
      </Snackbar>
    </form>
  );
}
