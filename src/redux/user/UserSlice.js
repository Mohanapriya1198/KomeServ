import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    list: [],
    details: {},
    status: "false",
    error: "",
  },
  reducers: {
    getData(state, action) {
      const list = action.payload.data;
      state.list = list?.data;

      state.status = action.payload.status;
      state.error = action.payload.error;
    },
    getDetails(state, action) {
      state.details = action.payload.data;
      state.status = action.payload.status;
      state.error = action.payload.error;
    },
    addData(state, action) {
      state.status = action.payload.status;
      state.error = action.payload.error;
    },
    updateData(state, action) {
      state.status = action.payload.status;
      state.error = action.payload.error;
    },
    deleteData(state, action) {
      state.status = action.payload.status;
      state.error = action.payload.error;
    },
  },
});

export const UserAction = UserSlice.actions;

export default UserSlice.reducer;
