export type inputType = {
  id: number;
  name: string;
  type: string;
  placeholder: string;
};

export const registerStudent: inputType[] = [
  {
    id: 1,
    name: "reg_no",
    type: "text",
    placeholder: "Register Number",
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
    name: "out_time",
    type: "text",
    placeholder: "Out time",
  },
];

export const registerFaculty = [
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
    placeholder: "Out time",
  },
];
