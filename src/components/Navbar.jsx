import React, { useState, useEffect } from "react";
import { MdSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import app from "../config/firebase-config";
import { Link } from "react-router-dom";
import logo from "../assets/SuvidhaLogo.png";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

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

  const handleLoginClick = () => navigate("/login");
  const handleLogout = async () => {
    await auth.signOut();
    setUser(null);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-20 bg-gray-800 flex items-center justify-between px-24 shadow-md">
      {/* Logo */}
      <Link to="/">
        <div
          className="w-28 h-8 bg-no-repeat bg-cover cursor-pointer"
          style={{
            backgroundImage: `url(${logo})`,
            backgroundPosition: "0 0",
            backgroundSize: "254px",
          }}
        ></div>
      </Link>

      {/* Navigation Links */}
      <div className="flex space-x-6 text-white font-semibold">
        <Link to="/internship" className="hover:text-orange-500 cursor-pointer">
          Internships
        </Link>
        <Link to="/job" className="hover:text-orange-500 cursor-pointer">
          Jobs
        </Link>
        <div className="hover:text-orange-500 cursor-pointer">Courses</div>
      </div>

      {/* Search and User Actions */}
      <div className="flex items-center space-x-4 relative">
        {/* User Actions */}
        {user ? (
          <div className="relative">
            <span
              className="font-bold text-orange-500 cursor-pointer"
              onMouseEnter={() => setShowPopup(true)}
            >
              {user.firstName}
            </span>

            {showPopup && (
              <div
                className="absolute right-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-lg p-2"
                onMouseEnter={() => setShowPopup(true)}
                onMouseLeave={() => setShowPopup(false)}
              >
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-200 rounded"
                >
                  Profile
                </Link>
                <Link
                  to="/savedjobs"
                  className="block px-4 py-2 hover:bg-gray-200 rounded"
                >
                  Saved Jobs
                </Link>
                <Link
                  to="/appliedjobs"
                  className="block px-4 py-2 hover:bg-gray-200 rounded"
                >
                  Applied Jobs
                </Link>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200 rounded"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <div
              className="px-4 py-2 border border-white rounded text-white hover:bg-orange-500 hover:text-white font-bold cursor-pointer transition-colors"
              onClick={handleLoginClick}
            >
              Login
            </div>
            <Link
              to="/studentsignup"
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 font-bold transition-colors"
            >
              Candidate Sign-up
            </Link>
            <Link
              to="/employeesignup"
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 font-bold transition-colors"
            >
              Employer Sign-up
            </Link>
            <Link
              to="/tposignup"
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 font-bold transition-colors"
            >
              TPO Sign-up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
