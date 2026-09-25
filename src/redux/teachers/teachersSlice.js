import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTeachersPage } from "../../services/teachers.js";

export const fetchTeachers = createAsyncThunk(
  "teachers/fetchTeachers",
  async () => {
    return await fetchTeachersPage();
  }
);

export const fetchMoreTeachers = createAsyncThunk(
  "teachers/fetchMoreTeachers",
  async (lastKey) => {
    return await fetchTeachersPage(lastKey);
  }
);

const teachersSlice = createSlice({
  name: "teachers",
  initialState: {
    items: [],
    lastKey: null,
    hasMore: true,
    isLoading: false,
    isLoadingMore: false,
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
        state.items = action.payload.teachers;
        state.lastKey = action.payload.lastKey;
        state.hasMore = action.payload.hasMore;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchMoreTeachers.pending, (state) => {
        state.isLoadingMore = true;
      })
      .addCase(fetchMoreTeachers.fulfilled, (state, action) => {
        state.isLoadingMore = false;
        state.items = [...state.items, ...action.payload.teachers];
        state.lastKey = action.payload.lastKey;
        state.hasMore = action.payload.hasMore;
      })
      .addCase(fetchMoreTeachers.rejected, (state, action) => {
        state.isLoadingMore = false;
        state.error = action.error.message;
      });
  },
});

export default teachersSlice.reducer;