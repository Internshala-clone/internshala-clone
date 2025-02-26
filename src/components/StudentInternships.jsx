import React, { useState, useEffect } from "react";

const StudentInternships = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/jobsfetch");
        if (!response.ok) {
          throw new Error("Failed to fetch internships");
        }
        const data = await response.json();
        
        // Filter internships where jobType is "Internship"
        const filteredInternships = data.filter(job => job.job_type === "Internship");

        setInternships(filteredInternships);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  return (
    <section className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-r from-blue-600 to-teal-700 text-white text-center z-10 pt-24">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
        Explore <span className="text-yellow-300">Internship Opportunities</span>
      </h1>
      <p className="text-lg max-w-2xl mx-auto">
        Kickstart your career with top internships from leading companies.
      </p>

      <h2 className="text-2xl md:text-3xl font-semibold mt-14">
        Featured Internships <span className="text-yellow-300">💼</span>
      </h2>

      {loading && <p className="mt-6 text-yellow-300">Loading internships...</p>}
      {error && <p className="mt-6 text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-12 max-w-6xl w-full px-4">
        {internships.map((internship) => (
          <div
            key={internship.id}
            className="relative rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 bg-white text-gray-900 p-6"
          >
            <h3 className="text-xl font-bold">{internship.job_title}</h3>
            <p className="text-md font-semibold text-indigo-600 mt-1">{internship.company_name}</p>
            <p className="text-sm text-gray-600 mt-2">{internship.description}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-gray-800 font-medium">{internship.location}</span>
              <a
                href={internship.link || "#"}
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
        <a
          href="#explore"
          className="bg-yellow-300 text-gray-900 px-6 py-3 rounded-full text-lg font-medium shadow-md transition duration-300 hover:bg-yellow-400"
        >
          View More Internships
        </a>
      </div>
    </section>
  );
};

export default StudentInternships;
