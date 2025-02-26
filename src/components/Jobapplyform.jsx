import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const Jobapplyform = () => {
  const navigate = useNavigate();
  const { jobid, userid } = useParams(); // Get jobid & userid from URL
  const [showPopup, setShowPopup] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    resume: null,
  });

  const [jobDetails, setJobDetails] = useState({
    jobName: "",
    location: "",
    salary: "",
    jobType: "",
    companyName: "",
  });

  // ✅ Fetch user details from PostgreSQL
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/userid?userid=${userid}`
        );
        const user = response.data;

        setFormData((prevData) => ({
          ...prevData,
          firstName: user.first_name || "",
          lastName: user.last_name || "",
          email: user.email || "",
          phone: user.mobile || "",
        }));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userid && userid !== "guest") {
      fetchUserData();
    }
  }, [userid]);

  // ✅ Fetch job details from PostgreSQL
  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/jobsfetch");
        const jobs = response.data;

        // Find the specific job by jobid
        const job = jobs.find((j) => j.id.toString() === jobid);

        if (job) {
          setJobDetails({
            jobName: job.job_title || "",
            location: job.location || "",
            salary: job.salary || "",
            jobType: job.job_type || "",
            companyName: job.company_name || "",
          });
        } else {
          console.error("Job not found");
        }
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };

    if (jobid) {
      fetchJobData();
    }
  }, [jobid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.email || !formData.phone) {
      alert("Please fill in all required fields.");
      return;
    }

    const formDataObj = new FormData();
    formDataObj.append("firstName", formData.firstName);
    formDataObj.append("lastName", formData.lastName);
    formDataObj.append("email", formData.email);
    formDataObj.append("phone", formData.phone);
    formDataObj.append("userid", userid);
    formDataObj.append("jobid", jobid);
    formDataObj.append("resume", formData.resume);

    try {
      const response = await axios.post(
        "http://localhost:5000/apply",
        formDataObj,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success) {
        setShowPopup(true);
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      console.error("Error submitting job application:", error);
      alert("Error submitting application. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Navbar />
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Apply for Job</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ✅ Unchangeable Job Details */}
          <div>
            <label className="block text-gray-700">Job Name</label>
            <input
              type="text"
              value={jobDetails.jobName}
              readOnly
              className="w-full p-2 border rounded-md bg-gray-200"
            />
          </div>

          <div>
            <label className="block text-gray-700">Company Name</label>
            <input
              type="text"
              value={jobDetails.companyName}
              readOnly
              className="w-full p-2 border rounded-md bg-gray-200"
            />
          </div>

          <div>
            <label className="block text-gray-700">Location</label>
            <input
              type="text"
              value={jobDetails.location}
              readOnly
              className="w-full p-2 border rounded-md bg-gray-200"
            />
          </div>

          <div>
            <label className="block text-gray-700">Salary</label>
            <input
              type="text"
              value={jobDetails.salary}
              readOnly
              className="w-full p-2 border rounded-md bg-gray-200"
            />
          </div>

          <div>
            <label className="block text-gray-700">Job Type</label>
            <input
              type="text"
              value={jobDetails.jobType}
              readOnly
              className="w-full p-2 border rounded-md bg-gray-200"
            />
          </div>

          {/* ✅ User Editable Fields */}
          <div>
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-700">Upload Resume</label>
            <input
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Apply Now
          </button>
        </form>

        {showPopup && (
          <div className="mt-4 p-2 text-center bg-green-500 text-white rounded-md">
            Applied to Job Successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobapplyform;
