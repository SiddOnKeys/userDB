import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBRCG7KCqOsRnz87esDLEsn5FZzW_mZGPg",
  authDomain: "userdb-57e65.firebaseapp.com",
  projectId: "userdb-57e65",
  storageBucket: "userdb-57e65.appspot.com",
  messagingSenderId: "98248169859",
  appId: "1:98248169859:web:5c26966ce46bad66a27eb6",
  measurementId: "G-WRRJB8R5ZS",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
