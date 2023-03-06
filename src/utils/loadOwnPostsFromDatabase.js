import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "~/firebase/config";

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
