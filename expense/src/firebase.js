// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPn9q7LyQ_4KIdU3xfLQuj-f0hFSqnMuQ",
  authDomain: "expense-tracker-a16d1.firebaseapp.com",
  projectId: "expense-tracker-a16d1",
  storageBucket: "expense-tracker-a16d1.appspot.com",
  messagingSenderId: "1002367843648",
  appId: "1:1002367843648:web:568c381ca5ebb4d2e24ea5",
  measurementId: "G-GQVEZEV4YJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };