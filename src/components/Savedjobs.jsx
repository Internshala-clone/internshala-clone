import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { auth } from "../config/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";

// Mock saved jobs data
const mockSavedJobs = [
  {
    id: 1,
    job_title: "Software Engineer",
    company_name: "Tech Innovations",
    job_type: "Full-time",
    location: "Bangalore",
  },
  {
    id: 2,
    job_title: "Data Analyst",
    company_name: "DataCorp",
    job_type: "Remote",
    location: "Mumbai",
  },
];

const mockUser = {
  id: "mockUser123",
  email: "mock@user.com",
  name: "John Doe",
};

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (import.meta.env.VITE_USE_BACKEND === "false") {
      setCurrentUser(mockUser);
    } else {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const response = await axios.get(
              `http://localhost:5000/api/user?email=${user.email}`
            );
            setCurrentUser(response.data);
          } catch (err) {
            console.error("Error fetching user:", err);
            setError("Failed to load user data");
          }
        } else {
          setCurrentUser(null);
        }
      });

      return () => unsubscribe();
    }
  }, []);

  useEffect(() => {
    if (import.meta.env.VITE_USE_BACKEND === "false") {
      setSavedJobs(mockSavedJobs);
      setLoading(false);
    } else if (currentUser?.id) {
      const fetchSavedJobs = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/saved-jobs?user_id=${currentUser.id}`
          );
          setSavedJobs(response.data);
        } catch (err) {
          console.error("Error fetching saved jobs:", err);
          setError("Failed to load saved jobs.");
        } finally {
          setLoading(false);
        }
      };

      fetchSavedJobs();
    }
  }, [currentUser]);

  return (
    <div>
      <Navbar />
      <div className="mt-24 p-6">
        <h1 className="text-2xl font-bold text-gray-800">Saved Jobs</h1>

        {loading && (
          <p className="text-orange-500 mt-4">Loading saved jobs...</p>
        )}
        {error && <p className="text-red-500 mt-4">{error}</p>}

        {savedJobs.length === 0 && !loading && (
          <p className="text-gray-500 mt-4">No saved jobs yet.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {savedJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                {job.job_title}
              </h3>
              <p className="text-sm text-orange-500">{job.company_name}</p>
              <p className="text-sm text-gray-600">{job.job_type}</p>
              <p className="text-sm text-gray-600">{job.location}</p>

              <div className="mt-4 flex justify-between items-center">
                <Link to={`/applyjob/${job.id}/${currentUser?.id || "guest"}`}>
                  <button className="text-orange-500 font-bold hover:underline">
                    Apply Now
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedJobs;
