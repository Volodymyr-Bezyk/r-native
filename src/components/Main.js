import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import useRoute from "~/router/router";

import { selectStateChange } from "~/redux/auth/selectors";
import { changeUserStateTracker } from "~/utils/changeUserStateTracker";

export const Main = () => {
  const dispatch = useDispatch();
  const authorized = useSelector(selectStateChange);

  useEffect(() => {
    dispatch(changeUserStateTracker());

    return () => {};
  }, []);

  // TODO: null in use Route
  return <NavigationContainer>{useRoute(authorized)}</NavigationContainer>;
};
