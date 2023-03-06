import { doc, getDoc } from "firebase/firestore";
import { db } from "~/firebase/config";

export const getOnePost = async (postId, cb) => {
  const docRef = doc(db, "posts", `${postId}`);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    cb(docSnap.data());
  } else {
    console.log("No such document!");
  }
};
