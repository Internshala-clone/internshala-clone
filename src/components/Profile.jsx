import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import app from "../config/firebase-config";
import Navbar from "./Navbar";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            setUser(userDoc.data());
          } else {
            setUser(null);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [auth, db]);

  if (loading) {
    return (
      <div className="text-center text-gray-500 mt-10">Loading profile...</div>
    );
  }

  if (!user) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No profile data found. Please log in.
      </div>
    );
  }

  const capitalizeFirstLetter = (string) => {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : "User";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto mt-24 p-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Profile
        </h1>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          {/* Personal Information Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Personal Information
            </h2>
            <div className="space-y-4">
              <p className="text-lg text-gray-700">
                <strong>Name:</strong> {user.firstName} {user.lastName}
              </p>
              <p className="text-lg text-gray-700">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="text-lg text-gray-700">
                <strong>Phone:</strong> {user.mobile || "Not provided"}
              </p>
              <p className="text-lg text-gray-700">
                <strong>Role:</strong>{" "}
                {capitalizeFirstLetter(user.userType) || "User"}
              </p>
            </div>
          </div>

          {/* Account Details Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Account Details
            </h2>
            <div className="space-y-4">
              <p className="text-lg text-gray-700">
                <strong>Account Created On:</strong>{" "}
                {user.createdAt
                  ? new Date(user.createdAt.seconds * 1000).toLocaleDateString(
                      "en-IN",
                      {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      }
                    )
                  : "Not available"}
              </p>
              <p className="text-lg text-gray-700">
                <strong>Last Login:</strong>{" "}
                {user.lastLogin
                  ? new Date(user.lastLogin.seconds * 1000).toLocaleDateString(
                      "en-IN",
                      {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      }
                    )
                  : "Not available"}
              </p>
            </div>
          </div>

          {/* Edit Profile Button */}
          <div className="text-center">
            <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;