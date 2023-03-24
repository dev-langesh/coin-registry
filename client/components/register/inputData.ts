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
    name: "out_time",
    type: "time",
    placeholder: "Expected leaving time (Eg. 1:10)",
  },
  {
    id: 6,
    name: "status",
    type: "text",
    placeholder: "Status",
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
    type: "time",
    placeholder: "Expected leaving (Eg. 1:10)",
  },
  {
    id: 5,
    name: "status",
    type: "text",
    placeholder: "Status",
  },
];

export const departments = [
  "CSE",
  "IT",
  "ECE",
  "MTECH",
  "MECH",
  "AERO",
  "CIVIL",
  "EEE",
  "BIO",
  'EIE',
  'AIDS',
  'ROBOTICS'
];

export const year = ["I", "II", "III", "IV"];
