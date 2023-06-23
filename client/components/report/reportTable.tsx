import React, { useEffect, useState } from "react";

export default function ReportTable({ data, maxRecordCount, maxUsed }: any) {
  const departments = {
    CSE: 0,
    IT: 0,
    AIDS: 0,
    ECE: 0,
    EEE: 0,
    MECH: 0,
    MTECH: 0,
    BME: 0,
    CIVIL: 0,
    EIE: 0,
    RA: 0,
  };

  const [count, setCount] = useState<any>(departments);

  useEffect(() => {
    if (data) {
      setCount(data);
    }
  }, [data]);

  return (
    <div className="flex items-start gap-20">
      <table className="table table-auto border-collapse ">
        <thead>
          <tr>
            <th className="border border-slate-300 p-2">Department</th>{" "}
            <th className="border border-slate-300 p-2">
              Registered Students Count
            </th>
          </tr>
        </thead>

        <tbody>
          {Object.keys(count).map((dep, i) => {
            return (
              <tr className="hover:bg-slate-100">
                <td className="border border-slate-300 p-2  ">{dep}</td>
                <td className="border border-slate-300 p-2  ">{count[dep]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {maxUsed && maxRecordCount && (
        <div className="space-y-2">
          <h1 className="font-bold text-xl">Max Usage</h1>
          <h1>
            <span className="font-bold text-slate-600 pr-3">Reg_no:</span>{" "}
            {maxUsed.reg_no}
          </h1>
          <h1>
            <span className="font-bold text-slate-600 pr-3">Name:</span>{" "}
            {maxUsed.name}
          </h1>
          <h1>
            <span className="font-bold text-slate-600 pr-3">Department:</span>{" "}
            {maxUsed.department}
          </h1>

          <h1>
            <span className="font-bold text-slate-600 pr-3">Record Count:</span>{" "}
            {maxRecordCount}
          </h1>
        </div>
      )}
    </div>
  );
}
