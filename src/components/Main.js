import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import useRoute from "~/router/router";
import { auth } from "~/firebase/config";
import { selectStateChange } from "~/redux/auth/selectors";
import { authChangeUserState } from "~/redux/auth/authOperations";

export const Main = () => {
  const dispatch = useDispatch();
  const authorized = useSelector(selectStateChange);

  useEffect(() => {
    dispatch(authChangeUserState());

    return () => {};
  }, []);

  // TODO: null in use Route

  return <NavigationContainer>{useRoute(null)}</NavigationContainer>;
};
