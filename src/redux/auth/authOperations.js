import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "~/firebase/config";
import { uploadPhotoToFirebase } from "~/firebase/services";

export const authSignUpUser = createAsyncThunk(
  "user/register",
  async ({ email: userEmail, password, name, image }, thunkApi) => {
    try {
      let imgLink = "";
      await createUserWithEmailAndPassword(auth, userEmail, password);

      if (image) {
        imgLink = await uploadPhotoToFirebase(image);
      }
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: imgLink,
      });
      const { displayName, email, uid, photoURL } = await auth.currentUser;

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
      await updateProfile(auth.currentUser, {
        ...paramsToUpdate,
      });

      const { displayName, email, uid, photoURL } = await auth.currentUser;

      return { displayName, email, uid, photoURL, stateChange: true };
    } catch (error) {
      console.log(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
