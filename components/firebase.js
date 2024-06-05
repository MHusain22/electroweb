import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "electro-424705.firebaseapp.com",
  projectId: "electro-424705",
  storageBucket: "electro-424705.appspot.com",
  messagingSenderId: "887505804294",
  appId: "1:887505804294:web:67ab8a969a6bab7df77787",
  measurementId: "G-SPELF7KY0M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };