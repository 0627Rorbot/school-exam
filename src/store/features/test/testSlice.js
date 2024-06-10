import axios from "axios";
import { subjects_url, upload_url } from "../../../utils/urls";
import { createSlice } from "@reduxjs/toolkit";

export const testSlice = createSlice({
  name: "test",
  initialState: {
    subject_id: "",
    subject_title: "",
    problem_cnt: 0,
    hisotry: [],
  },
  reducers: {
    setSubject_id: (state, action) => {
      state.subject_id = action.payload;
    },
    setSubject_title: (state, action) => {
      state.subject_title = action.payload;
    },
    setProblem_cnt: (state, action) => {
      state.problem_cnt = action.payload;
    },
    setHistory: (state, action) => {
      state.history = action.payload;
    },
  },
});

export const { setSubject_id, setSubject_title, setProblem_cnt, setHistory } =
  testSlice.actions;
export default testSlice.reducer;
