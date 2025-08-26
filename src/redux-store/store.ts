"use client";

import { configureStore } from "@reduxjs/toolkit";
import galleryReducer from "./gallerySlice";
import initialReducer from "./initialSlice";

export const store = configureStore({
  reducer: {
    gallery: galleryReducer,
    initial: initialReducer,
  },
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
