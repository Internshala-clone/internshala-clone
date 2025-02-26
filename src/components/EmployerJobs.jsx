import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const EmployerJobs = () => {
  const [jobListings, setJobListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/jobsfetch");
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data = await response.json();
        
        // Filter jobs with type "Full-time", "Part-time", or "Remote"
        const filteredJobs = data.filter(job => 
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
  }, []);

  return (
    <section className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-r from-gray-800 to-gray-900 text-white text-center z-10 pt-24">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
        Find the <span className="text-yellow-300">Best Talent</span> for Your Company
      </h1>
      <p className="text-lg max-w-2xl mx-auto">
        Discover top candidates and post job opportunities to build your dream team.
      </p>

      <h2 className="text-2xl md:text-3xl font-semibold mt-14">
        Featured Job Opportunities <span className="text-yellow-300">🚀</span>
      </h2>

      {loading && <p className="mt-6 text-yellow-300">Loading jobs...</p>}
      {error && <p className="mt-6 text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-12 max-w-6xl w-full px-4">
        {jobListings.map((job) => (
          <div
            key={job.id}
            className="relative rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 bg-white text-gray-900 p-6"
          >
            <h3 className="text-xl font-bold">{job.job_title}</h3>
            <p className="text-md font-semibold text-indigo-600 mt-1">{job.company_name}</p>
            <p className="text-sm text-gray-600 mt-2">{job.job_type}</p>
            <p className="text-sm text-gray-600 mt-2">{job.description}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-gray-800 font-medium">{job.location}</span>
              <a
                href={job.link || "#"}
                className="text-indigo-600 font-bold hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply Now
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 mb-24">
        <Link to="/postjobs">
          <button className="bg-yellow-300 text-gray-900 px-6 py-3 rounded-full text-lg font-medium shadow-md transition duration-300 hover:bg-yellow-400">
            Post a Job
          </button>
        </Link>
      </div>
    </section>
  );
};

export default EmployerJobs;
