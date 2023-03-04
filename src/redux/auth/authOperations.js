import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "~/firebase/config";
import { updateUserProfile } from "./authSlice";

export const authSignUpUser = createAsyncThunk(
  "user/register",
  async ({ email: userEmail, password, name }, thunkApi) => {
    try {
      await createUserWithEmailAndPassword(auth, userEmail, password);
      // https://firebase.google.com/docs/auth/web/manage-users?hl=ru#update_a_users_profile
      await onAuthStateChanged(auth, (user) => (user.displayName = name));
      const { displayName, email, uid } = await auth.currentUser;

      console.log("userRegister", auth.currentUser);
      return { displayName, email, uid };
    } catch (error) {
      console.log(error.message);
      return thunkApi.rejectWithValue(error.code, error.message);
    }
  }
);

export const authSignInUser = createAsyncThunk(
  "user/login",
  async ({ email: userEmail, password }, thunkApi) => {
    try {
      await signInWithEmailAndPassword(auth, userEmail, password);
      const { displayName, email, uid } = await auth.currentUser;

      console.log("userLogin", auth.currentUser);
      return { displayName, email, uid };
    } catch (error) {
      console.log(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const authSignOutUser = createAsyncThunk(
  "user/logout",
  async (_, thunkApi) => {
    try {
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const authChangeUserState = () => async (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { uid, email, displayName } = user;
      dispatch(
        updateUserProfile({ uid, email, displayName, stateChange: true })
      );
    } else {
      dispatch(
        updateUserProfile({
          uid: null,
          email: null,
          displayName: null,
          stateChange: false,
        })
      );
    }
  });
};
