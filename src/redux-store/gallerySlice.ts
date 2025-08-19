import { createSlice } from "@reduxjs/toolkit";

interface GalleryState {
  isOpen: boolean;
}

const initialState: GalleryState = {
  isOpen: false,
};

const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    openGallery: (state) => {
      state.isOpen = true;
    },
    closeGallery: (state) => {
      state.isOpen = false;
    },
    toggleGallery: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { openGallery, closeGallery, toggleGallery } = gallerySlice.actions;
export default gallerySlice.reducer;
