import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice.js";
import teachersReducer from "./teachers/teachersSlice.js";
import favouritesReducer from "./favourites/favouritesSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    teachers: teachersReducer,
    favourites: favouritesReducer,
  },
});