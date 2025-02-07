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

  // Handle hover state
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // Handle individual menu item hover states
  const handleInternshipEnter = () => setInternship(true);
  const handleInternshipLeave = () => setInternship(false);

  const handleJobsEnter = () => setJobs(true);
  const handleJobsLeave = () => setJobs(false);

  const handleCoursesEnter = () => setCourses(true);
  const handleCoursesLeave = () => setCourses(false);

  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Fetch user details from Firestore
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setUser(userDoc.data()); // Set user data from Firestore
        } else {
          setUser({ name: "User" }); // Fallback if no Firestore data
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup listener
  }, [auth, db]);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogout = async () => {
    await auth.signOut();
    setUser(null);
  };

  return (
    <div>
      <div
        className={`h-20 w-screen bg-white flex items-center justify-center shadow-md relative z-20 `}
      >
        {/* Navbar Branding */}
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
        >
          {/*<span className="text-sky-500">INTERN</span>SHALA*/}
        </div>

        {/* Navbar Links */}
        <div
          className="h-full px-5 items-center justify-center flex hover:bg-sky-100 hover:text-sky-500 cursor-pointer"
          onMouseEnter={handleInternshipEnter}
          onMouseLeave={handleInternshipLeave}
        >
          Internships
        </div>
        <div
          className="h-full px-5 items-center justify-center flex hover:bg-sky-100 hover:text-sky-500 cursor-pointer"
          onMouseEnter={handleJobsEnter}
          onMouseLeave={handleJobsLeave}
        >
          Jobs
        </div>
        <div
          className="h-full px-5 items-center justify-center flex hover:bg-sky-100 hover:text-sky-500 cursor-pointer"
          onMouseEnter={handleCoursesEnter}
          onMouseLeave={handleCoursesLeave}
        >
          Courses
        </div>

        {/* Search Icon */}
        <div className="ml-20 h-full hover:cursor-pointer flex items-center justify-center mx-5">
          <MdSearch size={20} />
          <span className="ml-0.5">Search</span>
        </div>

        {/* Login/Signup */}
        {user ? (
          <div className="flex items-center mx-2">
            <span className="font-bold text-sky-500">{user.firstName}</span>
            <button
              className="ml-4 h-8 px-5 flex items-center justify-center border border-red-500 rounded-sm text-red-500 hover:bg-red-500 hover:text-white font-bold"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <div
              className="h-8 px-5 flex items-center justify-center border border-sky-500 rounded-sm text-sky-500 mx-2 hover:cursor-pointer font-bold"
              onClick={handleLoginClick}
            >
              Login
            </div>
            <Link to="/studentsignup">
            <div className="h-8 px-5 flex items-center justify-center border border-sky-500 bg-sky-500 rounded-sm text-white mx-2 hover:cursor-pointer font-bold">
              Candidate Sign-up 
            </div>
            </Link>
            <Link to="/employeesignup">
            <div className="h-8 px-5 flex items-center justify-center border border-sky-500 bg-sky-500 rounded-sm text-white mx-2 hover:cursor-pointer font-bold">
              Employer Sign-up
            </div>
            </Link>
          </>
        )}
      </div>
      {internship && (
        <div className="w-100 h-100 bg-white z-20 relative shadow-md">
          Internship
        </div>
      )}
      {jobs && (
        <div className="w-100 h-100 bg-white z-20 relative shadow-md">Jobs</div>
      )}
      {courses && (
        <div className="w-100 h-100 bg-white z-20 relative shadow-md">
          Courses
        </div>
      )}

      {/* Add a background overlay that darkens */}
      {(internship || jobs || courses) && (
        <div className="absolute inset-0 bg-black opacity-50 z-10 pointer-events-none"></div>
      )}
    </div>
  );
};

export default Navbar;
