"use client";

import { configureStore } from "@reduxjs/toolkit";
import guestReducer from "./guestSlice";
import galleryReducer from "./gallerySlice";
import initialReducer from "./initialSlice";

export const store = configureStore({
  reducer: {
    guest: guestReducer,
    gallery: galleryReducer,
    initial: initialReducer,
  },
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
