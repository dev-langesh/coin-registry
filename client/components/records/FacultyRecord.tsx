import React from "react";
import TableHeader from "./TableHeader";

export default function FacultyRecord({ record, registeredFaculties }: any) {
  return (
    <section>
      <TableHeader title="Faculties" />

      <table className="table table-auto border-collapse w-full">
        <thead>
          <tr>
            <th className="border border-slate-300 p-2">Faculty ID</th>
            <th className="border border-slate-300 p-2">Name</th>
            <th className="border border-slate-300 p-2">Department</th>

            <th className="border border-slate-300 p-2">Purpose</th>
            <th className="border border-slate-300 p-2">Date</th>
            <th className="border border-slate-300 p-2">In time</th>
            <th className="border border-slate-300 p-2">Out time</th>
          </tr>
        </thead>

        <tbody>
          {record.map((d: any) => {
            const faculty = registeredFaculties.find(
              (f: any) => f._id === d.faculty_id
            );

            return (
              <tr className="hover:bg-slate-100">
                <td className="border border-slate-300 p-2  ">
                  {faculty.faculty_id}
                </td>
                <td className="border border-slate-300 p-2  ">
                  {faculty.name}
                </td>
                <td className="border border-slate-300 p-2  ">
                  {faculty.department}
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
