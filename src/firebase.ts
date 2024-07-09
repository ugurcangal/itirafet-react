// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2n-cVBalfBEld6Un8Te-qA9jMmkKLkBA",
  authDomain: "itirafet-a14b6.firebaseapp.com",
  projectId: "itirafet-a14b6",
  storageBucket: "itirafet-a14b6.appspot.com",
  messagingSenderId: "490605728513",
  appId: "1:490605728513:web:161a45b31c448f3368c100",
  measurementId: "G-XRJGH3REH1"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export { db }