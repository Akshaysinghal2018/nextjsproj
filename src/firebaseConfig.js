// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  //firebase config here
  apiKey: "AIzaSyCI0CkmnxS5w9XiZ5XhON2d1RbFbAfFpfw",
  authDomain: "nextjs-firebase-demo-617a6.firebaseapp.com",
  projectId: "nextjs-firebase-demo-617a6",
  storageBucket: "nextjs-firebase-demo-617a6.appspot.com",
  messagingSenderId: "801180129275",
  appId: "1:801180129275:web:69efecc2e5c7e862861d5e",
  measurementId: "G-C29WZ65RDM"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const storage = getStorage(app);
const db = getFirestore(app);
export const auth = getAuth(app);

export { app,db, storage };
