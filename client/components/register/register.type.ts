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
    name: "out_time",
    type: "text",
    placeholder: "Out time",
  },
];

export const registerFaculty = [];
