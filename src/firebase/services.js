import { onAuthStateChanged } from "firebase/auth";
import { auth } from "~/firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "~/firebase/config";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  arrayUnion,
  arrayRemove,
  addDoc,
} from "firebase/firestore";
import { db } from "~/firebase/config";

import { updateUserProfile } from "~/redux/auth/authSlice";

export const changeUserStateTracker = () => async (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { displayName, email, uid, photoURL } = user;
      dispatch(
        updateUserProfile({
          displayName,
          email,
          uid,
          photoURL,
          stateChange: true,
        })
      );
    } else {
      dispatch(
        updateUserProfile({
          displayName: null,
          email: null,
          uid: null,
          photoURL: "",
          stateChange: false,
        })
      );
    }
  });
};

export const getOnePost = async (postId, cb) => {
  const docRef = doc(db, "posts", `${postId}`);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    cb(docSnap.data());
  } else {
    console.log("No such document!");
  }
};

export const loadPostsFromDatabase = async (cb) => {
  try {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const normalizedPosts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    cb(normalizedPosts);
  } catch (error) {
    console.log(error.message);
  }
};

export const loadOwnPostsFromDatabase = async (cb, uid) => {
  try {
    const q = query(collection(db, "posts"), where("owner", "==", `${uid}`));
    const querySnapshot = await getDocs(q);
    const normalizedPosts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    cb(normalizedPosts);
  } catch (error) {
    console.log(error.message);
  }
};

export const pushNewCommentToPost = async (postId, comment) => {
  const postRef = doc(db, "posts", `${postId}`);

  await updateDoc(postRef, {
    comments: arrayUnion(comment),
  });
};

export const uploadPhotoToFirebase = async (photoUri) => {
  try {
    const response = await fetch(photoUri);
    const file = await response.blob();
    const uniqueId = Date.now();
    const storageRef = await ref(storage, `pictures/${uniqueId}.jpeg`);
    await uploadBytes(storageRef, file);
    const link = await getDownloadURL(storageRef);
    return link;
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
};

export const addNewPost = async (post) => {
  const docRef = await addDoc(collection(db, "posts"), post);
};
