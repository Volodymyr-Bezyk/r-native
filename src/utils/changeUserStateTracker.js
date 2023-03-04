import { onAuthStateChanged } from "firebase/auth";
import { auth } from "~/firebase/config";

import { updateUserProfile } from "~/redux/auth/authSlice";

export const changeUserStateTracker = () => async (dispatch) => {
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
