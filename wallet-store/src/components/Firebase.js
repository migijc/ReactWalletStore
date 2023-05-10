// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC30LwFLxPaW1BNpbKciJWKaz06cEHUdm4",
  authDomain: "walletstore-f304f.firebaseapp.com",
  projectId: "walletstore-f304f",
  storageBucket: "walletstore-f304f.appspot.com",
  messagingSenderId: "358286389844",
  appId: "1:358286389844:web:6602c707cd2678d04c33c1",
  measurementId: "G-ECF5TPME8Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);

