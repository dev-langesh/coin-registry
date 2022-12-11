import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

interface record {
  studentRecord: any[];
  facultyRecord: any[];
  registeredStudents: any[];
  registeredFaculties: any[];
}

const initialState: record = {
  studentRecord: [],
  facultyRecord: [],
  registeredFaculties: [],
  registeredStudents: [],
};

export const recordSlice = createSlice({
  name: "record",
  initialState,
  reducers: {
    setStudentRecord: (state, action) => {
      state.studentRecord = action.payload;
    },
    setFacultyRecord: (state, action) => {
      state.facultyRecord = action.payload;
    },
    setRegisteredStudents: (state, action) => {
      state.registeredStudents = action.payload;
    },
    setRegisteredFaculties: (state, action) => {
      state.registeredFaculties = action.payload;
    },
  },
});

export const {
  setFacultyRecord,
  setRegisteredFaculties,
  setRegisteredStudents,
  setStudentRecord,
} = recordSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getStudentRecord = (state: RootState) =>
  state.record.studentRecord;
export const getFacultyRecord = (state: RootState) =>
  state.record.facultyRecord;
export const getRegisteredStudents = (state: RootState) =>
  state.record.registeredStudents;
export const getRegisteredFaculties = (state: RootState) =>
  state.record.registeredFaculties;

export default recordSlice.reducer;
