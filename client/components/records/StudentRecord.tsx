import React from "react";
import TableHeader from "./TableHeader";

export default function StudentRecord({ record, registeredStudents }: any) {
  return (
    <section>
      <TableHeader title="Students" />

      <table className="table table-auto border-collapse w-full">
        <thead>
          <tr>
            <th className="border border-slate-300 p-2">Reg No</th>
            <th className="border border-slate-300 p-2">Name</th>
            <th className="border border-slate-300 p-2">Department</th>
            <th className="border border-slate-300 p-2">Year</th>

            <th className="border border-slate-300 p-2">Purpose</th>
            <th className="border border-slate-300 p-2">Date</th>
            <th className="border border-slate-300 p-2">In time</th>
            <th className="border border-slate-300 p-2">Out time</th>
          </tr>
        </thead>

        <tbody>
          {record.map((d: any) => {
            const student = registeredStudents.find(
              (s: any) => s._id === d.student_id
            );

            return (
              <tr className="hover:bg-slate-100">
                <td className="border border-slate-300 p-2  ">
                  {student.reg_no}
                </td>
                <td className="border border-slate-300 p-2  ">
                  {student.name}
                </td>
                <td className="border border-slate-300 p-2  ">
                  {student.department}
                </td>
                <td className="border border-slate-300 p-2  ">
                  {student.year}
                </td>
                <td className="border border-slate-300 p-2  ">{d.purpose}</td>
                <td className="border border-slate-300 p-2  ">{d.date}</td>
                <td className="border border-slate-300 p-2  ">{d.in_time}</td>
                <td className="border border-slate-300 p-2  ">{d.out_time}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
