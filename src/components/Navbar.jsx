import React, { useState, useEffect } from "react";
import { MdSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import app from "../config/firebase-config";
import { Link } from "react-router-dom";

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
    <div className="fixed top-0 left-0 w-full h-20 bg-gradient-to-r from-blue-600 to-purple-700 flex items-center justify-between px-24 shadow-md z-50">
      <Link to="/"><div
        className="w-28 h-8 bg-no-repeat bg-cover cursor-pointer"
        style={{
          backgroundImage:
            "url(https://internshala.com/static/images/home/sprites/img-assets.png)",
          backgroundPosition: "0 0",
          backgroundSize: "254px",
        }}
      ></div></Link>

      <div className="flex space-x-6 text-white font-semibold">
        <Link to="/internship" className="hover:text-yellow-300 cursor-pointer">Internships</Link>
        <Link to="/job" className="hover:text-yellow-300 cursor-pointer">Jobs</Link>
        <div className="hover:text-yellow-300 cursor-pointer">Courses</div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center text-white cursor-pointer hover:text-yellow-300">
          <MdSearch size={20} />
          <span className="ml-1">Search</span>
        </div>

        {user ? (
          <div className="flex items-center">
            <span className="font-bold text-yellow-300 mr-4">{user.firstName}</span>
            <button
              className="px-4 py-2 border border-white rounded text-white hover:bg-yellow-300 hover:text-gray-900 font-bold"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <div
              className="px-4 py-2 border border-white rounded text-white hover:bg-yellow-300 hover:text-gray-900 font-bold cursor-pointer"
              onClick={handleLoginClick}
            >
              Login
            </div>
            <Link to="/studentsignup" className="btn-yellow">Candidate Sign-up</Link>
            <Link to="/employeesignup" className="btn-yellow">Employer Sign-up</Link>
            <Link to="/tposignup" className="btn-yellow">TPO Sign-up</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;