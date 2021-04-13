import firebase from "firebase/app";
import "firebase/firestore";

let firebaseConfig = {
  apiKey: "AIzaSyDRIOPm3yiCyUfzLrqVhq5gSi85M21CmIk",
  authDomain: "app-to-save-links.firebaseapp.com",
  projectId: "app-to-save-links",
  storageBucket: "app-to-save-links.appspot.com",
  messagingSenderId: "855766243853",
  appId: "1:855766243853:web:e26a89da1bcdf1bfaa1344",
};

// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
export const db = fb.firestore();
