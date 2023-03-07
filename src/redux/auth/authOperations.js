import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "~/firebase/config";

export const authSignUpUser = createAsyncThunk(
  "user/register",
  async ({ email: userEmail, password, name }, thunkApi) => {
    try {
      await createUserWithEmailAndPassword(auth, userEmail, password);
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
      const { displayName, email, uid, photoURL } = await auth.currentUser;

      console.log("userRegister", auth.currentUser);
      return { displayName, email, uid, photoURL, stateChange: true };
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
      const { displayName, email, uid, photoURL } = await auth.currentUser;

      console.log("userLogin", auth.currentUser);
      return { displayName, email, uid, photoURL, stateChange: true };
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
        photoURL: null,
        stateChange: false,
      };
    } catch (error) {
      console.log(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const authUpdateUser = createAsyncThunk(
  "user/update",
  async (paramsToUpdate, thunkApi) => {
    try {
      console.log("paramsToUpdate", paramsToUpdate);

      await updateProfile(auth.currentUser, {
        ...paramsToUpdate,
      });
      console.log("auth.currentUser", auth.currentUser);

      const { displayName, email, uid, photoURL } = await auth.currentUser;

      return { displayName, email, uid, photoURL, stateChange: true };
    } catch (error) {
      console.log(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
