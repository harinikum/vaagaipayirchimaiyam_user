// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAu0naTXgs-hz-4iJBwJ1nHA5dQKK4Isy4",
  authDomain: "nursingupdate-8a92b.firebaseapp.com",
  projectId: "nursingupdate-8a92b",
  storageBucket: "nursingupdate-8a92b.appspot.com",
  messagingSenderId: "684214128813",
  appId: "1:684214128813:web:3bf749c7a66396fcdef624",
  measurementId: "G-EF88MEH1L6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {auth}