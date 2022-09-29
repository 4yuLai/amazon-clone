// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqzAgHIezFa977YgF1zG61T9hNDl82Ryg",
  authDomain: "clone-7756a.firebaseapp.com",
  databaseURL: "https://clone-7756a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "clone-7756a",
  storageBucket: "clone-7756a.appspot.com",
  messagingSenderId: "215544905337",
  appId: "1:215544905337:web:a873c3ee418ec8a8c4dea8",
  measurementId: "G-MH6YCXJ4TQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Realtime Database and get a reference to the service
const db = getFirestore(app);

export {db, app};