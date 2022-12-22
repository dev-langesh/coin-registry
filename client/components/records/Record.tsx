import { useEffect, useState } from "react";
import { studentRecord } from "../../server/models/record.model";
import { useAppSelector } from "../../src/app/hooks";

import {
  getFacultyRecord,
  getRegisteredFaculties,
  getRegisteredStudents,
  getStudentRecord,
} from "../../src/features/records/recordSlice";
import { facultyInputs, studentInputs } from "./inputData";
import TableHeader from "./TableHeader";

export default function Record({ type }: { type: "Student" | "Faculty" }) {
  const [inputs, setInputs] = useState<string[]>([]);
  const [users, setUsers] = useState<any>([]);
  const [records, setRecords] = useState<any>([]);

  const studentRecords = useAppSelector(getStudentRecord);
  const students = useAppSelector(getRegisteredStudents);
  const facultyRecords = useAppSelector(getFacultyRecord);
  const faculties = useAppSelector(getRegisteredFaculties);

  let id = 0;

  useEffect(() => {
    if (type == "Student") {
      setInputs(studentInputs);
      setUsers(students);
      setRecords(studentRecords);
    } else {
      setInputs(facultyInputs);
      setUsers(faculties);
      setRecords(facultyRecords);
    }
  }, []);

  return (
    <section>
      <TableHeader title={type == "Student" ? "Students" : "Faculties"} />

      <div className="max-h-80  overflow-auto shadow-md">
        <table className="table table-auto border-collapse w-full ">
          <thead>
            <tr>
              {inputs.map((text: String) => {
                return (
                  <th key={id++} className="border border-slate-300 p-2">
                    {text}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {records.map((record: any) => {
              let user;

              if (type === "Student")
                user = users.find((u: any) => u._id === record.student_id);
              else user = users.find((f: any) => f._id === record.faculty_id);

              return (
                <tr key={record._id} className="hover:bg-slate-100">
                  <td className="border border-slate-300 p-2  ">
                    {type == "Student" ? user.reg_no : user.faculty_id}
                  </td>
                  <td className="border border-slate-300 p-2  ">{user.name}</td>
                  <td className="border border-slate-300 p-2  ">
                    {user.department}
                  </td>

                  {type === "Student" && (
                    <td className="border border-slate-300 p-2  ">
                      {user.year}
                    </td>
                  )}

                  <td className="border border-slate-300 p-2  ">
                    {record.purpose}
                  </td>
                  <td className="border border-slate-300 p-2  ">
                    {record.status}
                  </td>
                  <td className="border border-slate-300 p-2  ">
                    {record.date}
                  </td>
                  <td className="border border-slate-300 p-2  ">
                    {record.in_time}
                  </td>
                  <td className="border border-slate-300 p-2  ">
                    {record.out_time}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
