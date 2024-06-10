import axios from "axios";
import { subjects_url } from "../../../utils/urls";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const subjectSlice = createSlice({
  name: "subject",
  initialState: {
    subjects: [],
    message: "",
    loading: false,
    success: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(readSubjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(readSubjects.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.message = action.payload.data.message;
          state.subjects = action.payload.data.data;
        } else {
          state.message = "Cannot read data from server.";
        }

        state.success = action.payload.status;
      })
      .addCase(readSubjects.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(saveSubject.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveSubject.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.message = action.payload.data.message;
          state.subjects = [...state.subjects, action.payload.data.data];
        } else {
          state.message = "Cannot read data from server.";
        }
      })
      .addCase(saveSubject.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(deleteSubject.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSubject.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.message = action.payload.data.message;
          state.subjects = state.subjects.filter(
            (subject) => subject._id !== action.payload.data
          );
        } else {
          state.message = "Cannot read data from server.";
        }
      })
      .addCase(deleteSubject.rejected, (state) => {
        state.loading = false;
      });
  },
});

// read subjects
export const readSubjects = createAsyncThunk(
  "subject/readSubjects",
  async () => {
    try {
      console.log("here");
      const response = await axios.get(subjects_url);

      return {
        status: true,
        data: response.data,
      };
    } catch (error) {
      return {
        state: false,
      };
    }
  }
);

// save subjects
export const saveSubject = createAsyncThunk(
  "subject/createSubject",
  async (subject) => {
    try {
      let response = await axios.post(subjects_url, subject, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return {
        status: false,
        data: response.data,
      };
    } catch (error) {
      return {
        state: false,
      };
    }
  }
);

// delete subject using subject_id
export const deleteSubject = createAsyncThunk(
  "subject/deleteSubject",
  async (subject_id) => {
    try {
      let response = await axios.delete(subjects_url, {
        params: {
          subject_id: subject_id,
        },
      });
      return {
        status: true,
        data: response.data,
      };
    } catch (error) {
      return {
        status: false,
      };
    }
  }
);

export default subjectSlice.reducer;
