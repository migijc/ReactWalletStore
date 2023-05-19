// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSwv8wmbqWK0HII8iTGwrnQZxItzzIUsY",
  authDomain: "drei-wallets.firebaseapp.com",
  projectId: "drei-wallets",
  storageBucket: "drei-wallets.appspot.com",
  messagingSenderId: "132789894809",
  appId: "1:132789894809:web:e75ebf21328d4b185c0208",
  measurementId: "G-TJBWCN9TR8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);