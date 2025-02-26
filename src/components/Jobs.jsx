import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Jobs = () => {
  const [jobListings, setJobListings] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
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
  }, []);

  const [filters, setFilters] = useState({
    profile: "",
    location: "",
    workFromHome: false,
    partTime: false,
    salary: 0, // Annual salary in lakhs
    yearsOfExperience: "",
  });

  const [keyword, setKeyword] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // **Filter Jobs When Filters Change**
  useEffect(() => {
    let filtered = jobListings;

    // **Profile Filter**
    if (filters.profile) {
      filtered = filtered.filter((job) =>
        job.job_title.toLowerCase().includes(filters.profile.toLowerCase())
      );
    }

    // **Location Filter**
    if (filters.location) {
      filtered = filtered.filter(
        (job) => job.location.toLowerCase() === filters.location.toLowerCase()
      );
    }

    // **Work from Home Filter**
    if (filters.workFromHome) {
      filtered = filtered.filter((job) => job.job_type === "Remote");
    }

    // **Part-time Filter**
    if (filters.partTime) {
      filtered = filtered.filter((job) => job.job_type === "Part-time");
    }

    // **Salary Filter (Lakhs Per Annum)**
    if (filters.salary > 0) {
      filtered = filtered.filter(
        (job) => job.salary >= filters.salary * 100000
      );
    }

    // **Experience Filter**
    if (filters.yearsOfExperience) {
      filtered = filtered.filter(
        (job) => job.experience === filters.yearsOfExperience
      );
    }

    // **Keyword Search**
    if (keyword) {
      filtered = filtered.filter(
        (job) =>
          job.job_title.toLowerCase().includes(keyword.toLowerCase()) ||
          job.company_name.toLowerCase().includes(keyword.toLowerCase()) ||
          job.location.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    setFilteredJobs(filtered);
  }, [filters, keyword, jobListings]);

  // Profile options for dropdown
  const profileOptions = [
    "Client Service Associate",
    "Business Development Specialist",
    "Software Engineer",
    "Data Analyst",
    "Marketing Manager",
    "HR Executive",
    "Product Manager",
    "Sales Executive",
    "Operations Manager",
    "Finance Analyst",
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

  // Years of experience options for dropdown
  const yearsOfExperienceOptions = ["Fresher", "1", "2", "3", "4", "5", "5+"];

  return (
    <div>
      <Navbar />
      <div className="p-6 max-w-7xl mx-auto mt-20">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold">
            {filteredJobs.length} Jobs Found
          </h2>
          <p className="text-gray-600">
            Search and Apply to Latest Job Vacancies in India
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters */}
          <div className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Filters</h3>

            {/* Profile Dropdown */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Profile
              </label>
              <select
                name="profile"
                value={filters.profile}
                onChange={handleChange}
                className="w-full border p-2 rounded"
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
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <select
                name="location"
                value={filters.location}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="">Select Location</option>
                {popularCities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Work from Home & Part-time */}
            <label className="flex items-center mb-2">
              <input
                type="checkbox"
                name="workFromHome"
                checked={filters.workFromHome}
                onChange={handleChange}
                className="mr-2"
              />
              Work from home
            </label>
            <label className="flex items-center mb-2">
              <input
                type="checkbox"
                name="partTime"
                checked={filters.partTime}
                onChange={handleChange}
                className="mr-2"
              />
              Part-time
            </label>

            {/* Salary Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Annual salary (in lakhs)
              </label>
              <input
                type="range"
                name="salary"
                min="0"
                max="20"
                step="1"
                value={filters.salary}
                onChange={handleChange}
                className="w-full"
              />
              <span>{filters.salary} LPA</span>
            </div>

            {/* Experience Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Years of Experience
              </label>
              <select
                name="yearsOfExperience"
                value={filters.yearsOfExperience}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="">Select</option>
                {yearsOfExperienceOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters Button */}
            <button
              onClick={() =>
                setFilters({
                  profile: "",
                  location: "",
                  workFromHome: false,
                  partTime: false,
                  salary: 0,
                  yearsOfExperience: "",
                })
              }
              className="text-blue-500 hover:text-blue-700 text-sm"
            >
              Clear Filters
            </button>
          </div>

          {/* Job Listings */}
          <div className="w-full md:w-3/4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white p-6 rounded-lg shadow-md mb-4"
              >
                <h3 className="text-xl font-semibold">{job.job_title}</h3>
                <p className="text-gray-600">{job.company_name}</p>
                <div className="flex flex-wrap gap-4 mt-2">
                  <p className="text-gray-600">
                    <span className="font-semibold">Location:</span>{" "}
                    {job.location}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Salary:</span> ₹
                    {job.salary}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Duration:</span>{" "}
                    {job.duration} Month/s
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Posted On:</span>{" "}
                    {new Date(job.created_at).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
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

export default Jobs;
