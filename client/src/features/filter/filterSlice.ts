import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  studentFilter: {
    open: false,

    options: {
      reg_no: "",
      name: "",
      department: "",
      year: "",
      date: "",
    },
  },
  facultyFilter: {
    open: false,
    options: {
      faculty_id: "",
      name: "",
      department: "",
      date: "",
    },
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    openStudentFilter: (state) => {
      state.studentFilter.open = true;
    },

    openFacultyFilter: (state) => {
      state.facultyFilter.open = true;
    },

    closeStudentFilter: (state) => {
      state.studentFilter.open = false;
    },

    closeFacultyFilter: (state) => {
      state.facultyFilter.open = false;
    },

    applyStudentFilter: (state, action) => {
      state.studentFilter.options = action.payload;
    },

    applyFacultyFilter: (state, action) => {
      state.facultyFilter.options = action.payload;
    },

    clearStudentFilter: (state) => {
      state.studentFilter.options = initialState.studentFilter.options;
    },

    clearFacultyFilter: (state) => {
      state.facultyFilter.options = initialState.facultyFilter.options;
    },
  },
});

export const {
  clearFacultyFilter,
  clearStudentFilter,
  closeFacultyFilter,
  closeStudentFilter,
  applyFacultyFilter,
  applyStudentFilter,
  openFacultyFilter,
  openStudentFilter,
} = filterSlice.actions;

export default filterSlice.reducer;

export const isStudentFilterOpen = (state: any) =>
  state.filter.studentFilter.open;
export const isFacultyFilterOpen = (state: any) =>
  state.filter.facultyFilter.open;
