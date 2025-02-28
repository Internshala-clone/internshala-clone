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
    description:
      "Looking for a passionate software engineer with experience in React and Node.js.",
    posted_on: "2024-02-20",
  },
  {
    id: 2,
    job_title: "Data Analyst",
    company_name: "DataCorp",
    job_type: "Remote",
    location: "Mumbai",
    description:
      "We need an experienced data analyst to handle business insights and reporting.",
    posted_on: "2024-02-18",
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
      <div className="mt-24 p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Saved Jobs</h1>

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
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900">
                {job.job_title}
              </h3>
              <p className="text-gray-600">{job.company_name}</p>
              <p className="text-gray-500 text-sm mt-1">
                {job.location} • {job.job_type}
              </p>
              <p className="text-gray-700 mt-4">{job.description}</p>
              <div className="mt-4 text-sm text-gray-600">
                <p>
                  <span className="font-semibold">Posted On:</span>{" "}
                  {new Date(job.posted_on).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <Link to={`/applyjob/${job.id}/${currentUser?.id || "guest"}`}>
                  <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
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