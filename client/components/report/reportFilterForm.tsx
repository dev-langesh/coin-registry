import React, { useEffect, useState } from "react";
import Button from "../filter/Button";
import axios from "axios";
import Link from "next/link";

export default function ReportFilterForm({ setState: setData }: any) {
  const [state, setState] = useState({ from: "", to: "" });
  const [record, setRecord] = useState([]);
  const [loading, setLoading] = useState(false);

  function changeHandler(e: any) {
    setState((p) => {
      return {
        ...p,
        [e.target.name]: e.target.value,
      };
    });
  }

  async function submitHandler(e: any) {
    e.preventDefault();

    setLoading(true);

    const api = "http://localhost:8000/record";

    const res = await axios.post(api, state);

    console.log(res.data);

    if (res.status == 200) {
      setData(res.data);
    }

    setLoading(false);
  }

  return (
    <div>
      <form onSubmit={submitHandler} action="">
        <div className="flex gap-6 p-6">
          <div>
            <label className="font-bold" htmlFor="">
              From Date:{" "}
            </label>
            <input
              name="from"
              onChange={changeHandler}
              type="date"
              className="p-2 ml-2 border"
              placeholder="From date"
            />
          </div>

          <div>
            <label className="font-bold" htmlFor="">
              To Date:{" "}
            </label>
            <input
              name="to"
              type="date"
              onChange={changeHandler}
              className="p-2 ml-2 border"
              placeholder="To date"
            />
          </div>

          <button className="bg-blue-500 text-white py-1 px-6" type="submit">
            {loading ? "Loading..." : "Submit"}{" "}
          </button>

          <Link
            href={`http://localhost:8000/report?from=${state.from}&to=${state.to}`}
            target="blank"
          >
            <span className="bg-blue-500 text-white py-2 px-6 inline-block">
              Download Report
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
}
