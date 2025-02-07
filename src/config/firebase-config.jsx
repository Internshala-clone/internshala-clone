// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDRNRi-P5Lrv-fNEmv_VbGsD1eb3l45zc",
  authDomain: "internshala-clone-2a0a0.firebaseapp.com",
  projectId: "internshala-clone-2a0a0",
  storageBucket: "internshala-clone-2a0a0.firebasestorage.app",
  messagingSenderId: "822770711362",
  appId: "1:822770711362:web:69a6fdf617b5a9dcd326db",
  measurementId: "G-BJN8C2C523",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
