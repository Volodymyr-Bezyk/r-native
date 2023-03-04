import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "~/firebase/config";

export const authSignUpUser = createAsyncThunk(
  "user/register",
  async ({ email: userEmail, password, name }, thunkApi) => {
    try {
      await createUserWithEmailAndPassword(auth, userEmail, password);
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: "https://example.com/jane-q-user/profile.jpg",
      });
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
      await auth.signOut();
      console.log("LOGOUT");
      return {
        uid: null,
        email: null,
        displayName: null,
        stateChange: false,
      };
    } catch (error) {
      console.log(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
