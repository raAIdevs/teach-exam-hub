
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgEB7npHtTB4jU3tuKUKqv7QqKi_6WDwE",
  authDomain: "examwises.firebaseapp.com",
  projectId: "examwises",
  storageBucket: "examwises.firebasestorage.app",
  messagingSenderId: "864216764392",
  appId: "1:864216764392:web:d602fe7bef746204231e5d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
