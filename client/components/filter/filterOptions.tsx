export type inputType = {
  id: number;
  name: string;
  type: string;
  placeholder: string;
};

export const filterStudent: inputType[] = [
  {
    id: 1,
    name: "reg_no",
    type: "text",
    placeholder: "Register Number (Eg. 2101131)",
  },
  {
    id: 2,
    name: "name",
    type: "text",
    placeholder: "Name",
  },
  {
    id: 3,
    name: "department",
    type: "text",
    placeholder: "department",
  },
  {
    id: 4,
    name: "year",
    type: "text",
    placeholder: "year",
  },
  {
    id: 5,
    name: "date",
    type: "text",
    placeholder: "Date (Eg.12-10-2022)",
  },
];

export const filterFaculty = [
  {
    id: 1,
    name: "faculty_id",
    type: "text",
    placeholder: "Faculty ID",
  },
  {
    id: 2,
    name: "name",
    type: "text",
    placeholder: "Name",
  },
  {
    id: 3,
    name: "department",
    type: "text",
    placeholder: "Department",
  },
  {
    id: 4,
    name: "out_time",
    type: "text",
    placeholder: "Out time (Eg. 1:10)",
  },
];
