import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GuestState {
  id: string | null;
  name: string | null;
}

const initialState: GuestState = {
  id: null,
  name: null,
};

const guestSlice = createSlice({
  name: "guest",
  initialState,
  reducers: {
    setGuest: (state, action: PayloadAction<GuestState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
    clearGuest: (state) => {
      state.id = null;
      state.name = null;
    },
  },
});

export const { setGuest, clearGuest } = guestSlice.actions;
export default guestSlice.reducer;
