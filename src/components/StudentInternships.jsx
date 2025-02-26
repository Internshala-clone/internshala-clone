import React, { useState, useEffect } from "react";

const StudentInternships = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("VITE_USE_BACKEND:", import.meta.env); // Debug log

    const fetchInternships = async () => {
      try {
        if (import.meta.env.VITE_USE_BACKEND === "false") {
          console.log("Using mock data...");
          setInternships([
            {
              id: 1,
              job_title: "Software Development Intern",
              company_name: "Tech Corp",
              job_type: "Internship",
              location: "Remote",
              description:
                "Work with senior developers on cutting-edge projects.",
              link: "#",
            },
            {
              id: 2,
              job_title: "Marketing Intern",
              company_name: "MarketPro Inc.",
              job_type: "Internship",
              location: "New York, NY",
              description:
                "Assist in digital marketing and social media campaigns.",
              link: "#",
            },
            {
              id: 3,
              job_title: "Data Science Intern",
              company_name: "Data Innovators",
              job_type: "Internship",
              location: "San Francisco, CA",
              description:
                "Analyze business data and create predictive models.",
              link: "#",
            },
          ]);
        } else {
          console.log("Fetching from PostgreSQL...");
          const response = await fetch("http://localhost:5000/api/jobsfetch");
          if (!response.ok) throw new Error("Failed to fetch internships");
          const data = await response.json();
          setInternships(data.filter((job) => job.job_type === "Internship"));
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  return (
    <section className="min-h-screen w-full flex flex-col justify-center items-center bg-white text-gray-900 text-center z-10 pt-24">
      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
        Explore{" "}
        <span className="text-orange-500">Internship Opportunities</span>
      </h1>
      <p className="text-lg max-w-2xl mx-auto text-gray-600">
        Kickstart your career with top internships from leading companies.
      </p>

      {/* Subheading */}
      <h2 className="text-2xl md:text-3xl font-semibold mt-14">
        Featured Internships <span className="text-orange-500">💼</span>
      </h2>

      {loading && (
        <p className="mt-6 text-orange-500">Loading internships...</p>
      )}
      {error && <p className="mt-6 text-red-500">{error}</p>}

      {/* Internship Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-12 max-w-6xl w-full px-4">
        {internships.map((internship) => (
          <div
            key={internship.id}
            className="relative rounded-xl overflow-hidden shadow-md transform transition duration-300 hover:scale-105 bg-white border border-gray-200 p-6"
          >
            {/* Internship Content */}
            <h3 className="text-xl font-bold text-gray-900">
              {internship.job_title}
            </h3>
            <p className="text-md font-semibold text-orange-500 mt-1">
              {internship.company_name}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              {internship.description}
            </p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-gray-800 font-medium">
                {internship.location}
              </span>
              <a
                href={internship.link || "#"}
                className="text-orange-500 font-bold hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply Now
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Call-to-Action Button */}
      <div className="mt-12 mb-24">
        <a
          href="#explore"
          className="bg-orange-500 text-white px-8 py-3 rounded-full text-lg font-medium shadow-md transition duration-300 hover:bg-orange-600"
        >
          View More Internships
        </a>
      </div>
    </section>
  );
};

export default StudentInternships;
