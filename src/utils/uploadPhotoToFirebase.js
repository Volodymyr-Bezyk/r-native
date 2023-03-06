import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "~/firebase/config";

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
