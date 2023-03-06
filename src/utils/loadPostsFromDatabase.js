import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "~/firebase/config";

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
