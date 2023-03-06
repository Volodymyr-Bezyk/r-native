import { createSlice } from "@reduxjs/toolkit";
import {
  authSignUpUser,
  authSignInUser,
  authSignOutUser,
} from "./authOperations";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: null,
    login: null,
    email: null,
    stateChange: false,
    userAvatar: "",
    currentPostId: "",
  },
  reducers: {
    updateUserProfile(state, action) {
      state.userId = action.payload.uid;
      state.email = action.payload.email;
      state.login = action.payload.displayName;
      state.stateChange = action.payload.stateChange;
    },
    setCurrentPostId(state, action) {
      state.currentPostId = action.payload.currentPostId;
    },
    removeCurrentPostId(state, action) {
      state.currentPostId = "";
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
      })
      .addCase(authSignOutUser.fulfilled, (state, action) => {
        state.userId = action.payload.uid;
        state.email = action.payload.email;
        state.login = action.payload.displayName;
        state.stateChange = action.payload.stateChange;
      }),
});

export const authReducer = authSlice.reducer;
export const { updateUserProfile, setCurrentPostId, removeCurrentPostId } =
  authSlice.actions;
