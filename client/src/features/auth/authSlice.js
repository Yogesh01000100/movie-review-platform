import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    sessionState: false,
  },
  reducers: {
    login: (state, action) => {
      state.user = {
        uid: action.payload.uid,
        email: action.payload.email,
        displayName: action.payload.displayName,
        photoURL: action.payload.photoURL,
      };
    },
    logout: (state) => {
      state.user = null;
      state.sessionState = false;
    },
    sessionState: (state, action) => {
      state.sessionState = action.payload;
    },
  },
});

export const { login, logout, sessionState } = authSlice.actions;

export default authSlice.reducer;