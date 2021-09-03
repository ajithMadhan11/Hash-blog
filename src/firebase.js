import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/database";

const app = {
  apiKey: "AIzaSyA5wPgywJcFEhzlWDlRuIHnrnswv1bOu3A",
  authDomain: "hash-blog11.firebaseapp.com",
  projectId: "hash-blog11",
  storageBucket: "hash-blog11.appspot.com",
  messagingSenderId: "89564991545",
  appId: "1:89564991545:web:57ab901ba2bc5ef0abfde8",
  measurementId: "G-P1NDJLN9N0"
  };
// Initialize Firebase
const firebaseApp = firebase.initializeApp(app);
const auth = firebase.auth();
const database = firebase.firestore(firebaseApp);
export { database, auth };
