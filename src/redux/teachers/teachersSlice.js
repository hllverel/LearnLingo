import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchTeachersPage,
  fetchAllTeachers as fetchAllTeachersApi,
  PAGE_SIZE,
} from "../../services/teachers.js";

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

export const fetchAllTeachers = createAsyncThunk(
  "teachers/fetchAllTeachers",
  async () => {
    return await fetchAllTeachersApi();
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
    allTeachers: [],
    isLoadingAll: false,
    filters: { language: "", level: "", price: "" },
    visibleCount: PAGE_SIZE,
  },
  reducers: {
    setFilter: (state, action) => {
      const { field, value } = action.payload;
      state.filters[field] = value;
      state.visibleCount = PAGE_SIZE;
    },
    loadMoreFiltered: (state) => {
      state.visibleCount += PAGE_SIZE;
    },
  },
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
      })
      .addCase(fetchAllTeachers.pending, (state) => {
        state.isLoadingAll = true;
      })
      .addCase(fetchAllTeachers.fulfilled, (state, action) => {
        state.isLoadingAll = false;
        state.allTeachers = action.payload;
      })
      .addCase(fetchAllTeachers.rejected, (state) => {
        state.isLoadingAll = false;
      });
  },
});

export const { setFilter, loadMoreFiltered } = teachersSlice.actions;
export default teachersSlice.reducer;