import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import "firebase/firestore";
// import "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDGHWw1dyVsfP0ABN4lQYJCpKzN3nALYvU",
  authDomain: "rnativesoc.firebaseapp.com",
  projectId: "rnativesoc",
  storageBucket: "rnativesoc.appspot.com",
  messagingSenderId: "1027347091187",
  appId: "1:1027347091187:web:f0369d6c0ab0e4e57ef186",
  measurementId: "G-3088GEYW1D",
};

// const analytics = getAnalytics(app);

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage();

// export const db = firebase.firestore();
// export const storage = firebase.storage();
