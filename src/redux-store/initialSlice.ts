import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  isInvitationOpen: boolean;
}

const initialState: InitialState = {
  isInvitationOpen: false,
};

const initialSlice = createSlice({
  name: "initial",
  initialState,
  reducers: {
    openInvitation: (state) => {
      state.isInvitationOpen = true;
    },
  },
});

export const { openInvitation } = initialSlice.actions;
export default initialSlice.reducer;
