"use client";

import { configureStore } from "@reduxjs/toolkit";
import guestReducer from "./guestSlice";
import galleryReducer from "./gallerySlice";
import initialReducer from "./initialSlice";
import giftReducer from "./giftSlice";

export const store = configureStore({
  reducer: {
    guest: guestReducer,
    gallery: galleryReducer,
    initial: initialReducer,
    gift: giftReducer,
  },
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
