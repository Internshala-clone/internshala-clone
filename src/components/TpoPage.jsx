import React from "react";
import { FaUsers, FaChartLine, FaBriefcase } from "react-icons/fa";

const TpoPage = () => {
  // Sample data for job postings, student profiles, and placement statistics
  const jobPostings = [
    {
      id: 1,
      title: "Software Engineer",
      company: "Tech Corp",
      location: "Remote",
      type: "Full-time",
      postedOn: "2023-10-01",
    },
    {
      id: 2,
      title: "Data Analyst",
      company: "Data Insights",
      location: "New York, USA",
      type: "Internship",
      postedOn: "2023-10-05",
    },
    {
      id: 3,
      title: "Marketing Intern",
      company: "Advertise Inc.",
      location: "San Francisco, USA",
      type: "Internship",
      postedOn: "2023-10-10",
    },
  ];

  const studentProfiles = [
    {
      id: 1,
      name: "Rajesh Kumar",
      branch: "Computer Science",
      cgpa: 9.2,
      skills: ["React", "Node.js", "Python"],
    },
    {
      id: 2,
      name: "Priya Sharma",
      branch: "Electrical Engineering",
      cgpa: 8.8,
      skills: ["Java", "Machine Learning", "SQL"],
    },
    {
      id: 3,
      name: "Amit Singh",
      branch: "Mechanical Engineering",
      cgpa: 8.5,
      skills: ["AutoCAD", "SolidWorks", "MATLAB"],
    },
  ];

  const placementStats = [
    { year: 2021, placed: 85, total: 100 },
    { year: 2022, placed: 90, total: 110 },
    { year: 2023, placed: 95, total: 120 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">TPO Dashboard</h1>
        <p className="mt-2 text-lg text-gray-600">
          Manage job postings, student profiles, and placement statistics.
        </p>
      </div>

      {/* Job Postings Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <FaBriefcase className="mr-2" /> Job Postings
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobPostings.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-lg shadow-md p-6 transform transition duration-300 hover:scale-105"
            >
              <h3 className="text-xl font-bold mb-2">{job.title}</h3>
              <p className="text-gray-600 mb-2">{job.company}</p>
              <p className="text-gray-600 mb-2">{job.location}</p>
              <p className="text-gray-600 mb-2">{job.type}</p>
              <p className="text-gray-600">Posted on: {job.postedOn}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Student Profiles Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <FaUsers className="mr-2" /> Student Profiles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {studentProfiles.map((student) => (
            <div
              key={student.id}
              className="bg-white rounded-lg shadow-md p-6 transform transition duration-300 hover:scale-105"
            >
              <h3 className="text-xl font-bold mb-2">{student.name}</h3>
              <p className="text-gray-600 mb-2">{student.branch}</p>
              <p className="text-gray-600 mb-2">CGPA: {student.cgpa}</p>
              <div className="flex flex-wrap gap-2">
                {student.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Placement Statistics Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <FaChartLine className="mr-2" /> Placement Statistics
        </h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="py-2">Year</th>
                <th className="py-2">Placed Students</th>
                <th className="py-2">Total Students</th>
              </tr>
            </thead>
            <tbody>
              {placementStats.map((stat) => (
                <tr key={stat.year} className="border-b">
                  <td className="py-2 text-center">{stat.year}</td>
                  <td className="py-2 text-center">{stat.placed}</td>
                  <td className="py-2 text-center">{stat.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TpoPage;