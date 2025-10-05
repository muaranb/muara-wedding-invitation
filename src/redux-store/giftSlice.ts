import { createSlice } from "@reduxjs/toolkit";

interface GiftState {
  isOpen: boolean;
}

const initialState: GiftState = {
  isOpen: false,
};

const giftSlice = createSlice({
  name: "gift",
  initialState,
  reducers: {
    openGift: (state) => {
      state.isOpen = true;
    },
    closeGift: (state) => {
      state.isOpen = false;
    },
    toggleGift: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { openGift, closeGift, toggleGift } = giftSlice.actions;
export default giftSlice.reducer;
