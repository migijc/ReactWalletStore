import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, getDoc, getFirestore, updateDoc} from 'firebase/firestore';
import { doc, setDoc } from "firebase/firestore";

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



export async function getWalletsFromSolidCol(stringPath){
  let docRef =doc(db, `collections/${stringPath}`);
  let docResult = await getDoc(docRef);
  let docData = docResult.data();
  return docData
}

export async function getWalletPrice(){
    let collectionRef= collection(db, 'aluminumWalletsSolid');
    let res = await getDoc(doc(collectionRef, 'walletInfo'));
    res = res.data();
    const price = res.price;
    return price
}

export async function getWalletInformation(){
  let collectionRef= collection(db, 'aluminumWalletsSolid');
  let res = await getDoc(doc(collectionRef, 'walletInfo'));
  return res.data();
}

export async function getDesignsWallets(){
  let collectionRef = collection(db, 'collections')
  let res = await getDoc(doc(collectionRef, 'designs'))
  return res.data()
}
