"use client";

import { configureStore } from "@reduxjs/toolkit";
import galleryReducer from "./gallerySlice";

export const store = configureStore({
  reducer: {
    gallery: galleryReducer,
  },
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
