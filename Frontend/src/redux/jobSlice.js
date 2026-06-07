import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",

  initialState: {
    allJobs: [],
    allAdminJobs: [],
    allAppliedJobs: [],
    singleJob: null,
    searchedQuery: "",
  },

  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },

    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },

    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },

    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },

    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
  },
});

export const { setAllJobs, setSearchedQuery, setSingleJob, setAllAdminJobs, setAllAppliedJobs } =
  jobSlice.actions;

export default jobSlice.reducer;
