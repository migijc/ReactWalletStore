// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {addDoc, getFirestore, updateDoc} from 'firebase/firestore';
import { collection, doc, setDoc } from "firebase/firestore";
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

const checkoutSessionsColRef = collection(db, 'checkoutSessions')
export function createNewCheckoutSessionID(){
  let docRef = doc(checkoutSessionsColRef);
  return docRef
}

export function addCheckoutSessionToDB(id, data){
  let docRef = doc(db, `checkoutSessions/${id}`);
  setDoc(docRef, data)
}

export function updateCheckoutSession(id, data){
  const docRef= doc(db, `checkoutSessions/${id}`)
  updateDoc(docRef, data)
}


