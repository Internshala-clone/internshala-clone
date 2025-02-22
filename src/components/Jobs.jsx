import React, { useState } from "react";
import { Link } from "react-router-dom";

const Jobs = () => {
  const [filters, setFilters] = useState({
    profile: "",
    location: "",
    workFromHome: false,
    partTime: false,
    salary: 0, // Yearly salary in lakhs
    yearsOfExperience: "", // Years of experience
  });

  const [keyword, setKeyword] = useState(""); // State for keyword search

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

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
  const yearsOfExperienceOptions = [
    "Fresher",
    "1",
    "2",
    "3",
    "4",
    "5",
    "5+",
  ];

  // Dummy data for jobs
  const jobs = [
    {
      id: 1,
      company: "Swipe (Actively hiring)",
      profile: "Client Service Associate",
      location: "Hyderabad",
      salary: "₹3,00,000 - ₹6,00,000",
      yearsOfExperience: "1 year(s)",
      postedOn: "1 day ago",
    },
    {
      id: 2,
      company: "Swipe (Actively hiring)",
      profile: "Business Development Specialist",
      location: "Hyderabad",
      salary: "₹4,00,000 - ₹7,00,000",
      yearsOfExperience: "1 year(s)",
      postedOn: "1 day ago",
    },
    {
      id: 3,
      company: "Tech Corp",
      profile: "Software Engineer",
      location: "Remote",
      salary: "₹6,00,000 - ₹10,00,000",
      yearsOfExperience: "2 years",
      postedOn: "2 days ago",
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Breadcrumb Navigation */}
      <div className="text-sm text-gray-600 mb-4">
        <Link to="/" className="hover:text-blue-500 cursor-pointer">Home</Link> &gt;{" "}
        <span className="text-blue-500">Jobs</span>
      </div>

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold">7640 Jobs</h2>
        <p className="text-gray-600">
          Search and Apply to Latest Job Vacancies & Openings in India
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters Section */}
        <div className="w-full md:w-1/4">
          {/* Filters Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Filters</h3>

            {/* Profile Dropdown */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
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

            {/* Work from Home and Part-time Filters */}
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

            {/* Yearly Salary Range Slider */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Annual salary (in lakhs)
              </label>
              <input
                type="range"
                name="salary"
                min="0"
                max="10"
                step="1"
                value={filters.salary}
                onChange={handleChange}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-1">
                <span>0</span>
                <span>2</span>
                <span>4</span>
                <span>6</span>
                <span>8</span>
                <span>10</span>
              </div>
            </div>

            {/* Years of Experience Dropdown */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Years of experience
              </label>
              <select
                name="yearsOfExperience"
                value={filters.yearsOfExperience}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="">Select years of experience</option>
                {yearsOfExperienceOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear All Button */}
            <div className="flex justify-end mt-8">
              <button
                onClick={() => setFilters({
                  profile: "",
                  location: "",
                  workFromHome: false,
                  partTime: false,
                  salary: 0,
                  yearsOfExperience: "",
                })}
                className="text-blue-500 hover:text-blue-700 text-sm"
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
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        {/* Job Listings */}
        <div className="w-full md:w-3/4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white p-6 rounded-lg shadow-md mb-4"
            >
              <h3 className="text-xl font-semibold">{job.profile}</h3>
              <p className="text-gray-600">{job.company}</p>
              <div className="flex flex-wrap gap-4 mt-2">
                <p className="text-gray-600">
                  <span className="font-semibold">Location:</span>{" "}
                  {job.location}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Salary:</span> {job.salary}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Experience:</span>{" "}
                  {job.yearsOfExperience}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Posted On:</span>{" "}
                  {job.postedOn}
                </p>
              </div>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <button className="mx-1 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          1
        </button>
        <button className="mx-1 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          2
        </button>
        <button className="mx-1 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          3
        </button>
        <button className="mx-1 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          Next
        </button>
      </div>
    </div>
  );
};

export default Jobs;