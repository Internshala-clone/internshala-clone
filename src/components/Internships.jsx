import React, { useState } from "react";
import { Link } from "react-router-dom";

const Internships = () => {
  const [filters, setFilters] = useState({
    profile: "",
    location: "",
    workFromHome: false,
    partTime: false,
    stipend: 0, // Stipend range
    startDate: "",
    duration: "",
    jobOffer: false,
    fastResponse: false,
    earlyApplicant: false,
    womenInternships: false,
  });

  const [showMoreFilters, setShowMoreFilters] = useState(false); // Toggle for more filters
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

  // Dummy data for internships
  const internships = [
    {
      id: 1,
      company: "Tech Corp",
      profile: "Web Development Intern",
      location: "Remote",
      stipend: "₹5,000 /month",
      duration: "2 Months",
      postedOn: "2 days ago",
    },
    {
      id: 2,
      company: "Design Studio",
      profile: "Graphic Design Intern",
      location: "Mumbai",
      stipend: "₹8,000 /month",
      duration: "3 Months",
      postedOn: "5 days ago",
    },
    {
      id: 3,
      company: "Marketing Agency",
      profile: "Digital Marketing Intern",
      location: "Delhi",
      stipend: "₹6,000 /month",
      duration: "1 Month",
      postedOn: "1 week ago",
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Breadcrumb Navigation */}
      <div className="text-sm text-gray-600 mb-4">
        <Link to ="/" className="hover:text-blue-500 cursor-pointer">Home</Link> &gt;{" "}
        <span className="text-blue-500">Internships</span>
      </div>

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold">10172 Total Internships</h2>
        <p className="text-gray-600">Latest Summer Internships in India</p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters Section */}
        <div className="w-full md:w-1/4">
          {/* Filters Card */}
          <div
            className={`bg-white p-6 rounded-lg shadow-md transition-all duration-300 ${
              showMoreFilters ? "h-auto" : "h-[500px]"
            }`}
          >
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

            {/* Stipend Range Slider */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Desired minimum monthly stipend (₹)
              </label>
              <input
                type="range"
                name="stipend"
                min="0"
                max="10000"
                step="1000"
                value={filters.stipend}
                onChange={handleChange}
                className="w-full"
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
              className="text-blue-500 hover:text-blue-700 text-sm mb-4"
            >
              {showMoreFilters ? "View less filters ▲" : "View more filters ▼"}
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
                    className="w-full border p-2 rounded"
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
                    className="w-full border p-2 rounded"
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
                    className="mr-2"
                  />
                  Internships with job offer
                </label>
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    name="fastResponse"
                    checked={filters.fastResponse}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Fast response
                </label>
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    name="earlyApplicant"
                    checked={filters.earlyApplicant}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Early applicant
                </label>
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    name="womenInternships"
                    checked={filters.womenInternships}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Internships for women
                </label>
              </>
            )}

            {/* Clear All Button */}
            <div className="flex justify-end mt-8">
              <button
                onClick={() => setFilters({
                  profile: "",
                  location: "",
                  workFromHome: false,
                  partTime: false,
                  stipend: 0,
                  startDate: "",
                  duration: "",
                  jobOffer: false,
                  fastResponse: false,
                  earlyApplicant: false,
                  womenInternships: false,
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

        {/* Internship Listings */}
        <div className="w-full md:w-3/4">
          {internships.map((internship) => (
            <div
              key={internship.id}
              className="bg-white p-6 rounded-lg shadow-md mb-4"
            >
              <h3 className="text-xl font-semibold">{internship.profile}</h3>
              <p className="text-gray-600">{internship.company}</p>
              <div className="flex flex-wrap gap-4 mt-2">
                <p className="text-gray-600">
                  <span className="font-semibold">Location:</span>{" "}
                  {internship.location}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Stipend:</span>{" "}
                  {internship.stipend}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Duration:</span>{" "}
                  {internship.duration}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Posted On:</span>{" "}
                  {internship.postedOn}
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

export default Internships;