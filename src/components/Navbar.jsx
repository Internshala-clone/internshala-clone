import React, { useState, useEffect } from "react";
import { MdSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import app from "../config/firebase-config";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [internship, setInternship] = useState(false);
  const [jobs, setJobs] = useState(false);
  const [courses, setCourses] = useState(false);
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
    <div>
      <div className="h-20 w-screen bg-gradient-to-r from-blue-600 to-purple-700 flex items-center justify-center shadow-md relative z-20">
        <div
          className="mx-20 hover:cursor-pointer font-bold"
          style={{
            backgroundImage:
              "url(https://internshala.com/static/images/home/sprites/img-assets.png)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "0 0",
            backgroundSize: "254px",
            width: "113px",
            height: "31px",
          }}
        ></div>

        <div className="h-full px-5 items-center justify-center flex hover:text-yellow-300 cursor-pointer">
          Internships
        </div>
        <div className="h-full px-5 items-center justify-center flex hover:text-yellow-300 cursor-pointer">
          Jobs
        </div>
        <div className="h-full px-5 items-center justify-center flex hover:text-yellow-300 cursor-pointer">
          Courses
        </div>

        <div className="ml-20 h-full flex items-center justify-center mx-5 hover:text-yellow-300 cursor-pointer">
          <MdSearch size={20} />
          <span className="ml-0.5">Search</span>
        </div>

        {user ? (
          <div className="flex items-center mx-2">
            <span className="font-bold text-yellow-300">{user.firstName}</span>
            <button
              className="ml-4 h-8 px-5 flex items-center justify-center border border-white rounded-sm text-white hover:bg-yellow-300 hover:text-gray-900 font-bold"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <div
              className="h-8 px-5 flex items-center justify-center border border-white rounded-sm text-white mx-2 hover:cursor-pointer font-bold hover:bg-yellow-300 hover:text-gray-900"
              onClick={handleLoginClick}
            >
              Login
            </div>
            <Link to="/studentsignup">
              <div className="h-8 px-5 flex items-center justify-center border border-yellow-300 bg-yellow-300 rounded-sm text-gray-900 mx-2 hover:cursor-pointer font-bold hover:bg-white hover:text-yellow-300">
                Candidate Sign-up
              </div>
            </Link>
            <Link to="/employeesignup">
              <div className="h-8 px-5 flex items-center justify-center border border-yellow-300 bg-yellow-300 rounded-sm text-gray-900 mx-2 hover:cursor-pointer font-bold hover:bg-white hover:text-yellow-300">
                Employer Sign-up
              </div>
            </Link>
            <Link to="/tposignup">
              <div className="h-8 px-5 flex items-center justify-center border border-yellow-300 bg-yellow-300 rounded-sm text-gray-900 mx-2 hover:cursor-pointer font-bold hover:bg-white hover:text-yellow-300">
                TPO Sign-up
              </div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
