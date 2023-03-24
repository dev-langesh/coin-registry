import React, { useEffect, useState } from "react";
import { registerStudent, inputType, registerFaculty } from "./inputData";
import axios from "axios";
import { format } from "date-fns";
import CheckBoxGroup from "./CheckBoxGroup";
import UserTypeRadioButton from "./UserTypeRadioButton";
import RegisterInputFields from "./RegisterInputFields";
import AlertSection from "./AlertSection";
import QrCode from "../qrcode/QrCode";

const initialState = {
  user: "student",
  reg_no: "",
  name: "",
  department: "",
  year: "",
  purpose: "",
  out_time: "",
  in_time: "",
  date: "",
  status: "",
  registered: false,
  updateStatus: false,
};

export default function RegisterForm({hideQrcode, token }: { token?: any ,hideQrcode?:Boolean}) {
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

  async function verifyToken() {
    setLoading(true);

    if (token) {
      const req = await axios.get(`/api/register/verify/${token}`);

      const data = req.data;

      if (data.error) {
        setError({ open: true, data: "Invalid token" });
      }
    }

    setLoading(false);
  }

  useEffect(() => {
    setInputs(registerStudent);
  }, []);

  useEffect(() => {
    if (state.user === "student") setInputs(registerStudent);
    else setInputs(registerFaculty);

    if (state.registered) {
      const blackList = ["name", "department", "year"];

      setInputs((prev: any) => {
        const filteredInputs = prev.filter((input: inputType) => {
          return !blackList.includes(input.name);
        });

        return filteredInputs;
      });
    }
  }, [state.user]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    verifyToken();

    setLoading(true);

    const date = format(new Date(), "dd-MM-yyyy");
    const in_time = format(new Date(), "hh:mm");

    state.date = date;
    state.in_time = in_time;

    let apiEndpoint;

    if (state.user === "faculty") {
      apiEndpoint = `/api/register/faculty`;
    } else {
      apiEndpoint = `/api/register/student`;
    }

    const req = await axios.post(apiEndpoint, state);

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

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-6 shadow-2xl rounded-md p-6 mb-10 w-11/12"
    >
      <h1 className="text-center text-2xl text-blue-500 font-bold">Register</h1>

      <main className="grid grid-cols-12 px-4 gap-4 place-content-center justify-items-center">
        <div className="col-span-12 md:col-span-3">
          <UserTypeRadioButton state={state} setState={setState} />
          <CheckBoxGroup
            inputs={inputs}
            setInputs={setInputs}
            state={state}
            setState={setState}
          />
        </div>

        <div className="col-span-12 md:col-span-6 space-y-6">
          <RegisterInputFields
            state={state}
            setState={setState}
            inputs={inputs}
          />

          <button className="bg-blue-500 w-full p-2 font-bold  text-white hover:bg-blue-600 tracking-wide hover:tracking-widest transition-all duration-200">
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>

        {!hideQrcode && <div className="hidden md:block md:col-span-3">
          <QrCode />
        </div>}
      </main>

      <AlertSection
        error={error}
        message={message}
        setError={setError}
        setMessage={setMessage}
      />
    </form>
  );
}
