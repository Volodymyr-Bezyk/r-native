import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "~/firebase/config";

export const pushNewCommentToPost = async (postId, comment) => {
  const postRef = doc(db, "posts", `${postId}`);

  await updateDoc(postRef, {
    comments: arrayUnion(comment),
  });
};
