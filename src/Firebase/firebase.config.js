// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDW_AhqKbDRLpFdKRVaG8RLs0yST_AhZoQ",
  authDomain: "forum-fb0f7.firebaseapp.com",
  projectId: "forum-fb0f7",
  storageBucket: "forum-fb0f7.appspot.com",
  messagingSenderId: "947541321723",
  appId: "1:947541321723:web:28926db245ce45d9bf4d5e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)