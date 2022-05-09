import { createSlice } from "@reduxjs/toolkit";

const SideBarSlice = createSlice({
  name: "sideBar",
  initialState: {
    data: "",
    status: false,
  },
  reducers: {
    addData(state, action) {
      state.data = action.payload.data;
      state.status = action.payload.status;
    },
  },
});

export const SideBarAction = SideBarSlice.actions;

export default SideBarSlice.reducer;
