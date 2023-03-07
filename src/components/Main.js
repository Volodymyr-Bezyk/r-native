import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import useRoute from "~/router/router";

import { selectStateChange } from "~/redux/auth/selectors";
import { changeUserStateTracker } from "~/firebase/services";

export const Main = () => {
  const dispatch = useDispatch();
  const authorized = useSelector(selectStateChange);

  useEffect(() => {
    dispatch(changeUserStateTracker());

    return () => {};
  }, []);

  return <NavigationContainer>{useRoute(authorized)}</NavigationContainer>;
};
