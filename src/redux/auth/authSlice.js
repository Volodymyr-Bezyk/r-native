import { createSlice } from "@reduxjs/toolkit";
import {
  authSignUpUser,
  authSignInUser,
  authChangeUserState,
} from "./authOperations";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: null,
    login: null,
    email: null,
    stateChange: false,
  },
  reducers: {
    updateUserProfile(state, action) {
      state.userId = action.payload.uid;
      state.email = action.payload.email;
      state.login = action.payload.displayName;
      state.stateChange = action.payload.stateChange;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(authSignUpUser.fulfilled, (state, action) => {
        state.userId = action.payload.uid;
        state.email = action.payload.email;
        state.login = action.payload.displayName;
      })
      .addCase(authSignInUser.fulfilled, (state, action) => {
        state.userId = action.payload.uid;
        state.email = action.payload.email;
        state.login = action.payload.displayName;
      }),
  //     .addCase(authChangeUserState.fulfilled, (state, action) => {
  //       state.userId = action.payload.uid;
  //       state.email = action.payload.email;
  //       state.login = action.payload.displayName;
  //       state.stateChange = action.payload.stateChange;
  //     }),
});

export const authReducer = authSlice.reducer;
export const { updateUserProfile } = authSlice.actions;
