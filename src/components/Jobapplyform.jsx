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
    <div className="flex flex-col items-center min-h-screen bg-white px-4">
      <Navbar />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl border border-gray-200 mt-25">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Apply for <span className="text-orange-500">Job</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ✅ Job Details (Read-Only) */}
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(jobDetails).map(([key, value]) => (
              <div key={key}>
                <label className="block text-gray-700 font-medium capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  type="text"
                  value={value}
                  readOnly
                  className="w-full p-2 border border-gray-300 rounded-md bg-gray-200"
                />
              </div>
            ))}
          </div>

          {/* ✅ User Editable Fields in Two Columns */}
          <div className="grid grid-cols-2 gap-4">
            {["firstName", "lastName", "email", "phone"].map((field) => (
              <div key={field}>
                <label className="block text-gray-700 font-medium capitalize">
                  {field.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            ))}
          </div>

          {/* ✅ Resume Upload (Full Width) */}
          <div>
            <label className="block text-gray-700 font-medium">
              Upload Resume
            </label>
            <input
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* ✅ Apply Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white p-2 rounded-md text-lg font-semibold shadow-md transition duration-300 hover:bg-orange-600"
          >
            Apply Now
          </button>
        </form>

        {/* ✅ Success Message Popup */}
        {showPopup && (
          <div className="mt-4 p-3 text-center bg-green-500 text-white font-medium rounded-md">
            🎉 Application Submitted Successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobapplyform;
