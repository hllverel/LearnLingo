import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTeachers as fetchTeachersApi } from "../../services/teachers.js";

export const fetchTeachers = createAsyncThunk(
  "teachers/fetchTeachers",
  async () => {
    return await fetchTeachersApi();
  }
);

const teachersSlice = createSlice({
  name: "teachers",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default teachersSlice.reducer;