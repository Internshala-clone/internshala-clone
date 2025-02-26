import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const JobPostingForm = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    location: "",
    jobType: "Full-time",
    salary: "",
    description: "",
    duration: "",
    experience: "None",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("✅ Job posted successfully!");
        setFormData({
          jobTitle: "",
          companyName: "",
          location: "",
          jobType: "Full-time",
          salary: "",
          description: "",
          duration: "",
          experience: "",
        });
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "❌ Failed to post job.");
      }
    } catch (error) {
      console.error("Error posting job:", error);
      setMessage("❌ Error posting job.");
    }
  };

  // Clear message after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Post a Job</h2>
        {message && <p className="text-center text-green-600 font-semibold">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Job Title</label>
            <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} required className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-gray-700">Company Name</label>
            <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} required className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-gray-700">Location</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} required className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-gray-700">Job Type</label>
            <select name="jobType" value={formData.jobType} onChange={handleChange} className="w-full p-2 border rounded">
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Internship</option>
              <option>Remote</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Experience</label>
            <input type="number" name="experience" min="0" value={formData.experience} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-gray-700">Salary (Optional)</label>
            <input type="number" name="salary" min="0" value={formData.salary} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-gray-700">Duration (Months)</label>
            <input type="number" name="duration" min="1" value={formData.duration} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-gray-700">Job Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required className="w-full p-2 border rounded"></textarea>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200">
            Post Job
          </button>
        </form>
        <Link to="/">
          <button className="w-full bg-gray-500 text-white p-2 mt-2 rounded hover:bg-gray-600 transition duration-200">
            Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default JobPostingForm;
