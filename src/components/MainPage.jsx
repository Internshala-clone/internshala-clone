import React, { useState, useEffect } from "react";
import { auth } from "../config/firebase-config"; // Import Firebase auth instance
import Navbar from "./Navbar";
import TrendingSection from "./TrendingSection";
import StudentInternships from "./StudentInternships";
import EmployerJobs from "./EmployerJobs";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import app from "../config/firebase-config";

const MainPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup the listener when component unmounts
  }, []);

  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        setUser(userDoc.exists() ? userDoc.data() : { name: "User" });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [auth, db]);

  return (
    <div>
      <Navbar />
      {user ? (
        user.userType === "student" ? (
          <StudentInternships />
        ) : user.userType === "employee" ? (
          <EmployerJobs />
        ) : (
          <TrendingSection />
        )
      ) : (
        <TrendingSection />
      )}
    </div>
  );
};

export default MainPage;
