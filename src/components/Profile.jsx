import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import app from "../config/firebase-config";
import Navbar from "./Navbar";

const Profile = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        setUser(userDoc.exists() ? userDoc.data() : null);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [auth, db]);

  if (!user) {
    return (
      <div className="text-center text-gray-500 mt-10">Loading profile...</div>
    );
  }

  const capitalizeFirstLetter = (string) => {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : "User";
  };

  return (
    <div className=" min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto mt-50 p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Profile
        </h1>
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <p className="text-lg font-semibold text-gray-700 mb-2">
            <strong>Name:</strong> {user.firstName} {user.lastName}
          </p>
          <p className="text-lg text-gray-600 mb-2">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="text-lg text-gray-600 mb-2">
            <strong>Phone:</strong> {user.mobile || "Not provided"}
          </p>
          <p className="text-lg text-gray-600">
            <strong>Role:</strong>{" "}
            {capitalizeFirstLetter(user.userType) || "User"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
