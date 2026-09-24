import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchFavouriteIds,
  addFavouriteId,
  removeFavouriteId,
} from "../../services/favourites.js";

export const fetchFavourites = createAsyncThunk(
  "favourites/fetchFavourites",
  async (uid) => {
    return await fetchFavouriteIds(uid);
  }
);

export const toggleFavourite = createAsyncThunk(
  "favourites/toggleFavourite",
  async ({ uid, teacherId, isFavourite }) => {
    if (isFavourite) {
      await removeFavouriteId(uid, teacherId);
    } else {
      await addFavouriteId(uid, teacherId);
    }
    return { teacherId, isFavourite };
  }
);

const favouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    ids: [],
    isLoading: false,
  },
  reducers: {
    clearFavourites: (state) => {
      state.ids = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavourites.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFavourites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ids = action.payload;
      })
      .addCase(toggleFavourite.fulfilled, (state, action) => {
        const { teacherId, isFavourite } = action.payload;
        if (isFavourite) {
          state.ids = state.ids.filter((id) => id !== teacherId);
        } else {
          state.ids.push(teacherId);
        }
      });
  },
});

export const { clearFavourites } = favouritesSlice.actions;
export default favouritesSlice.reducer;