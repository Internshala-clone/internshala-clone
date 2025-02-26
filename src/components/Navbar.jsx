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
    <div className="relative w-full h-20 bg-gray-800 flex items-center justify-between px-24 shadow-md z-50">
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
      <div className="flex items-center space-x-4">
        {/* Search Icon */}
        <div className="flex items-center text-white cursor-pointer hover:text-orange-500">
          <MdSearch size={20} />
          <span className="ml-1">Search</span>
        </div>

        {/* User Actions */}
        {user ? (
          <div className="flex items-center">
            <span className="font-bold text-orange-500 mr-4">{user.firstName}</span>
            <button
              className="px-4 py-2 border border-white rounded text-white hover:bg-orange-500 hover:text-white font-bold transition-colors"
              onClick={handleLogout}
            >
              Logout
            </button>
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