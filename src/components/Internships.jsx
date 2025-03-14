import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Internships = () => {
  const [filters, setFilters] = useState({
    profile: "",
    location: "",
    workFromHome: false,
    partTime: false,
    salary: 0, // Stipend range
    startDate: "",
    duration: "",
    jobOffer: false,
    fastResponse: false,
    earlyApplicant: false,
    womenInternships: false,
  });

  const [internships, setInternships] = useState([]);
  const [filteredInternships, setFilteredInternships] = useState([]); // Store filtered data
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const mockInternships = [
    {
      id: 1,
      job_title: "Software Development Intern",
      company_name: "TechCorp",
      location: "Bangalore",
      salary: 10000,
      duration: 6,
      job_type: "Internship",
      created_at: "2024-02-10",
    },
    {
      id: 2,
      job_title: "Marketing Intern",
      company_name: "AdCom",
      location: "Mumbai",
      salary: 8000,
      duration: 4,
      job_type: "Internship",
      created_at: "2024-02-15",
    },
    {
      id: 3,
      job_title: "Graphic Design Intern",
      company_name: "Creative Minds",
      location: "Remote",
      salary: 7000,
      duration: 3,
      job_type: "Internship",
      created_at: "2024-02-18",
    },
    {
      id: 4,
      job_title: "Data Science Intern",
      company_name: "AI Labs",
      location: "Hyderabad",
      salary: 12000,
      duration: 6,
      job_type: "Internship",
      created_at: "2024-02-20",
    },
  ];

  // Fetch internships from backend
  useEffect(() => {
    const useBackend = import.meta.env.VITE_USE_BACKEND === "true";
    console.log("VITE_USE_BACKEND:", useBackend);

    const fetchInternships = async () => {
      try {
        if (useBackend) {
          const response = await fetch("http://localhost:5000/api/jobsfetch");
          if (!response.ok) throw new Error("Failed to fetch internships");

          const data = await response.json();
          const filteredData = data.filter(
            (job) => job.job_type === "Internship"
          );
          setInternships(filteredData);
          setFilteredInternships(filteredData);
        } else {
          console.log("Using mock internships...");
          setInternships(mockInternships);
          setFilteredInternships(mockInternships);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  // Apply filters whenever they change
  useEffect(() => {
    let result = internships;

    // Profile filter
    if (filters.profile) {
      result = result.filter((job) =>
        job.job_title.toLowerCase().includes(filters.profile.toLowerCase())
      );
    }

    // Location filter
    if (filters.location) {
      result = result.filter((job) =>
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Work from home filter
    if (filters.workFromHome) {
      result = result.filter((job) => job.location.toLowerCase() === "remote");
    }

    // Part-time filter
    if (filters.partTime) {
      result = result.filter((job) => job.part_time === true);
    }

    if (filters.salary > 0) {
      console.log(filters.salary)
      result = result.filter((job) => job.salary >= filters.salary * 10);
      console.log(result);
    }

    // Start date filter
    if (filters.startDate) {
      result = result.filter(
        (job) => new Date(job.start_date) >= new Date(filters.startDate)
      );
    }

    // Duration filter
    if (filters.duration) {
      result = result.filter(
        (job) => job.duration.toString() === filters.duration
      );
    }

    // Keyword search
    if (keyword) {
      result = result.filter(
        (job) =>
          job.job_title.toLowerCase().includes(keyword.toLowerCase()) ||
          job.company_name.toLowerCase().includes(keyword.toLowerCase()) ||
          job.location.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    setFilteredInternships(result);
  }, [filters, keyword, internships]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]:
        type === "checkbox"
          ? checked
          : type === "range"
          ? Number(value)
          : value,
    }));
  };

  // Profile options for dropdown
  const profileOptions = [
    "Marketing Internship",
    "Finance Internship",
    "Graphic Design Internship",
    "Architecture Internship",
    "Mechanical Internship",
    "HR Internship",
    "Digital Marketing Internship",
    "Law Internship",
    "Electronics Internship",
    "Content Writing Internship",
    "Civil Internship",
    "Campus Ambassador Program",
    "Engineering Internship",
    "Business/MBA Internship",
    "Part-Time Jobs/Internships",
    "Humanities Internship",
    "Science Internship",
    "Internships with Job Offer",
  ];

  // Popular cities for dropdown
  const popularCities = [
    "Delhi",
    "Mumbai",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Surat",
    "Lucknow",
    "Kanpur",
    "Nagpur",
    "Indore",
    "Thane",
  ];

  // Duration options for dropdown
  const durationOptions = ["4 Months", "6 Months", "12 Months"];

  return (
    <div>
      <Navbar />
      <div className="p-6 max-w-7xl mx-auto mt-20">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredInternships.length} Internships
          </h2>
          <p className="text-gray-600">Latest Summer Internships in India</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Section */}
          <div className="w-full md:w-1/4">
            {/* Filters Card */}
            <div
              className={`bg-white p-6 rounded-lg shadow-md transition-all duration-300 ${
                showMoreFilters ? "h-auto" : "h-[500px]"
              }`}
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Filters
              </h3>

              {/* Profile Dropdown */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile
                </label>
                <select
                  name="profile"
                  value={filters.profile}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Select Profile</option>
                  {profileOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Dropdown */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <select
                  name="location"
                  value={filters.location}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Select Location</option>
                  {popularCities.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Work from Home and Part-time Filters */}
              <label className="flex items-center mb-2">
                <input
                  type="checkbox"
                  name="workFromHome"
                  checked={filters.workFromHome}
                  onChange={handleChange}
                  className="mr-2 accent-orange-500"
                />
                Work from home
              </label>
              <label className="flex items-center mb-2">
                <input
                  type="checkbox"
                  name="partTime"
                  checked={filters.partTime}
                  onChange={handleChange}
                  className="mr-2 accent-orange-500"
                />
                Part-time
              </label>

              {/* Stipend Range Slider */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Desired minimum monthly stipend (₹)
                </label>
                <input
                  type="range"
                  name="salary"
                  min="0"
                  max="1000"
                  step="100"
                  value={filters.salary}
                  onChange={handleChange}
                  className="w-full accent-orange-500"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>0</span>
                  <span>2K</span>
                  <span>4K</span>
                  <span>6K</span>
                  <span>8K</span>
                  <span>10K</span>
                </div>
              </div>

              {/* Toggle for More Filters */}
              <button
                onClick={() => {
                  setShowMoreFilters(!showMoreFilters);
                  console.log("showMoreFilters:", showMoreFilters); // Debugging
                }}
                className="text-orange-500 hover:text-orange-700 text-sm mb-4"
              >
                {showMoreFilters
                  ? "View less filters ▲"
                  : "View more filters ▼"}
              </button>

              {/* Additional Filters (Conditionally Rendered) */}
              {showMoreFilters && (
                <>
                  {/* Start Date Filter */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Starting from (or after)
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={filters.startDate}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  {/* Duration Dropdown */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration
                    </label>
                    <select
                      name="duration"
                      value={filters.duration}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="">Select Duration</option>
                      {durationOptions.map((duration, index) => (
                        <option key={index} value={duration}>
                          {duration}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Job Offer, Fast Response, Early Applicant Filters */}
                  <label className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      name="jobOffer"
                      checked={filters.jobOffer}
                      onChange={handleChange}
                      className="mr-2 accent-orange-500"
                    />
                    Internships with job offer
                  </label>
                  <label className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      name="fastResponse"
                      checked={filters.fastResponse}
                      onChange={handleChange}
                      className="mr-2 accent-orange-500"
                    />
                    Fast response
                  </label>
                  <label className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      name="earlyApplicant"
                      checked={filters.earlyApplicant}
                      onChange={handleChange}
                      className="mr-2 accent-orange-500"
                    />
                    Early applicant
                  </label>
                  <label className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      name="womenInternships"
                      checked={filters.womenInternships}
                      onChange={handleChange}
                      className="mr-2 accent-orange-500"
                    />
                    Internships for women
                  </label>
                </>
              )}

              {/* Clear All Button */}
              <div className="flex justify-end mt-8">
                <button
                  onClick={() =>
                    setFilters({
                      profile: "",
                      location: "",
                      workFromHome: false,
                      partTime: false,
                      salary: 0,
                      startDate: "",
                      duration: "",
                      jobOffer: false,
                      fastResponse: false,
                      earlyApplicant: false,
                      womenInternships: false,
                    })
                  }
                  className="text-orange-500 hover:text-orange-700 text-sm"
                >
                  Clear all
                </button>
              </div>
            </div>

            {/* Keyword Search Section */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Keyword Search
              </label>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="e.g. Design, Mumbai, Infosys"
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Internship Listings */}
          <div className="w-full md:w-3/4">
            {filteredInternships.map((internship) => (
              <div
                key={internship.id}
                className="bg-white p-6 rounded-lg shadow-md mb-4"
              >
                <h3 className="text-xl font-semibold text-gray-900">
                  {internship.job_title}
                </h3>
                <p className="text-gray-600">{internship.company_name}</p>
                <div className="flex flex-wrap gap-4 mt-2">
                  <p className="text-gray-600">
                    <span className="font-semibold">Location:</span>{" "}
                    {internship.location}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Stipend:</span> ₹
                    {internship.salary}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Duration:</span>{" "}
                    {internship.duration} Month/s
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Posted On:</span>{" "}
                    {new Date(internship.created_at).toLocaleDateString(
                      "en-IN",
                      {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </p>
                </div>
                <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Internships;
