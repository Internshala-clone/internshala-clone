import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase-config";

const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);

  const mockJobListings = [
    {
      id: 1,
      job_title: "Software Engineer",
      company_name: "Tech Innovations",
      job_type: "Full-time",
      location: "Bangalore",
      description:
        "Looking for a passionate software engineer with experience in React and Node.js.",
      status: "Under Review",
      applied_on: "2024-02-20",
    },
    {
      id: 2,
      job_title: "Data Analyst",
      company_name: "DataCorp",
      job_type: "Remote",
      location: "Mumbai",
      description:
        "We need an experienced data analyst to handle business insights and reporting.",
      status: "Shortlisted",
      applied_on: "2024-02-18",
    },
    {
      id: 3,
      job_title: "Marketing Manager",
      company_name: "AdGrowth",
      job_type: "Part-time",
      location: "Delhi",
      description:
        "Seeking a creative marketing manager to lead our advertising strategies.",
      status: "Rejected",
      applied_on: "2024-02-15",
    },
  ];

  useEffect(() => {
    if (import.meta.env.VITE_USE_BACKEND === "false") {
      setCurrentUser({ id: 1, email: "test@example.com" }); // Mock user
    } else {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          console.log("Firebase User:", user);
          try {
            const response = await axios.get(
              `http://localhost:5000/api/user?email=${user.email}`
            );
            console.log("PostgreSQL User:", response.data);
            setCurrentUser(response.data);
          } catch (err) {
            console.error("Error fetching user:", err);
            setError("Failed to load user data");
          }
        }
      });

      return () => unsubscribe();
    }
  }, []);

  useEffect(() => {
    if (import.meta.env.VITE_USE_BACKEND === "false") {
      setAppliedJobs(mockJobListings);
    } else {
      console.log(currentUser?.id);
      if (currentUser?.id) {
        fetch(`http://localhost:5000/api/applied-jobs/${currentUser?.id}`)
          .then((res) => {
            if (!res.ok) {
              throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
          })
          .then((data) => setAppliedJobs(data))
          .catch((err) => console.error("Error fetching applied jobs:", err));
      }
    }
  }, [currentUser]);

  return (
    <div>
      <Navbar />
      <div className="mt-24 p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Applied Jobs</h1>
        {error && <p className="text-red-500">{error}</p>}
        <div className="space-y-6">
          {appliedJobs.length > 0 ? (
            appliedJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {job.job_title}
                    </h2>
                    <p className="text-gray-600">{job.company_name}</p>
                    <p className="text-gray-500 text-sm mt-1">
                      {job.location} • {job.job_type}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      job.status === "Under Review"
                        ? "bg-blue-100 text-blue-800"
                        : job.status === "Shortlisted"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {job.status}
                  </span>
                </div>
                <p className="text-gray-700 mt-4">{job.description}</p>
                <div className="mt-4 text-sm text-gray-600">
                  <p>
                    <span className="font-semibold">Applied On:</span>{" "}
                    {new Date(job.applied_on).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">
              You haven't applied for any jobs yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppliedJobs;