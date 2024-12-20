import { createSlice } from "@reduxjs/toolkit";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "../../Components/App/localStorageHandle";

const userData = getFromLocalStorage("userData");

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    userLogged: userData,
  },
  reducers: {
    loginUser: (state, action) => {
      state.userLogged = action.payload;
      setToLocalStorage("userData", action.payload);
    },
    logoutUser: (state) => {
      state.userLogged = null;
      removeFromLocalStorage("userData");
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
