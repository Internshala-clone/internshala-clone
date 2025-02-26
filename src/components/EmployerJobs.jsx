import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";

// Mock job data
const mockJobListings = [
  {
    id: 1,
    job_title: "Software Engineer",
    company_name: "Tech Innovations",
    job_type: "Full-time",
    location: "Bangalore",
    description:
      "Looking for a passionate software engineer with experience in React and Node.js.",
  },
  {
    id: 2,
    job_title: "Data Analyst",
    company_name: "DataCorp",
    job_type: "Remote",
    location: "Mumbai",
    description:
      "We need an experienced data analyst to handle business insights and reporting.",
  },
  {
    id: 3,
    job_title: "Marketing Manager",
    company_name: "AdGrowth",
    job_type: "Part-time",
    location: "Delhi",
    description:
      "Seeking a creative marketing manager to lead our advertising strategies.",
  },
];

const mockUser = {
  id: "mockUser123",
  email: "mock@user.com",
  name: "John Doe",
};

const EmployerJobs = () => {
  const [jobListings, setJobListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [savedJobs, setSavedJobs] = useState(new Set());

  // const useBackend = import.meta.env.VITE_USE_BACKEND === "false";
  // console.log("VITE_USE_BACKEND:", useBackend);

  useEffect(() => {
    if (import.meta.env.VITE_USE_BACKEND === "false") {
      setCurrentUser(mockUser);
    } else {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          console.log("Firebase User:", user);
          try {
            const response = await axios.get(
              `http://localhost:5000/api/user?email=${user.email}`
            );
            setCurrentUser(response.data);
          } catch (err) {
            console.error("Error fetching user from PostgreSQL:", err);
            setError("Failed to load user data");
          }
        }
      });

      return () => unsubscribe();
    }
  }, []);

  useEffect(() => {
    if (import.meta.env.VITE_USE_BACKEND === "false") {
      setJobListings(mockJobListings);
      setLoading(false);
    } else {
      const fetchJobs = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/jobsfetch");
          if (!response.ok) {
            throw new Error("Failed to fetch jobs");
          }
          const data = await response.json();
          const filteredJobs = data.filter((job) =>
            ["Full-time", "Part-time", "Remote"].includes(job.job_type)
          );
          setJobListings(filteredJobs);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchJobs();
    }
  }, [currentUser]);

  const saveJob = async (userId, jobId) => {
    try {
      await axios.post("http://localhost:5000/api/save-job", {
        user_id: userId,
        job_id: jobId,
      });
      setSavedJobs((prev) => new Set(prev).add(jobId));
    } catch (error) {
      console.error("Error saving job", error);
    }
  };

  return (
    <section className="min-h-screen w-full flex flex-col justify-center items-center bg-white text-gray-900 text-center z-10 pt-24">
      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
        Find the <span className="text-orange-500">Best Talent</span> for Your
        Company
      </h1>
      <p className="text-lg max-w-2xl mx-auto text-gray-600">
        Discover top candidates and post job opportunities to build your dream
        team.
      </p>

      {/* Subheading */}
      <h2 className="text-2xl md:text-3xl font-semibold mt-14">
        Featured Job Opportunities <span className="text-orange-500">🚀</span>
      </h2>

      {loading && <p className="mt-6 text-orange-500">Loading jobs...</p>}
      {error && <p className="mt-6 text-red-500">{error}</p>}

      {/* Job Listings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-12 max-w-6xl w-full px-4">
        {jobListings.map((job) => (
          <div
            key={job.id}
            className="relative rounded-xl overflow-hidden shadow-md transform transition duration-300 hover:scale-105 bg-white border border-gray-200 p-6"
          >
            <h3 className="text-xl font-bold text-gray-900">{job.job_title}</h3>
            <p className="text-md font-semibold text-orange-500 mt-1">
              {job.company_name}
            </p>
            <p className="text-sm text-gray-600 mt-2">{job.job_type}</p>
            <p className="text-sm text-gray-600 mt-2">{job.description}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-gray-800 font-medium">{job.location}</span>
              <button
                onClick={() => saveJob(currentUser?.id, job.id)}
                className="text-gray-500 hover:text-orange-500"
              >
                {savedJobs.has(job.id) ? "✅ Saved" : "🔖 Save"}
              </button>
              <Link to={`/applyjob/${job.id}/${currentUser?.id || "guest"}`}>
                <button
                  className={`text-orange-500 font-bold ${
                    currentUser
                      ? "hover:underline"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                  disabled={!currentUser}
                >
                  Apply Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Call-to-Action Button */}
      <div className="mt-12 mb-24">
        <Link to="/postjobs">
          <button className="bg-orange-500 text-white px-8 py-3 rounded-full text-lg font-medium shadow-md transition duration-300 hover:bg-orange-600">
            Post a Job
          </button>
        </Link>
      </div>
    </section>
  );
};

export default EmployerJobs;
