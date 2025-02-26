import React from "react";
import { FaUsers, FaChartLine, FaBriefcase } from "react-icons/fa";

const TpoPage = () => {
  const jobPostings = [
    { id: 1, title: "Software Engineer", company: "Tech Corp", location: "Remote", type: "Full-time", postedOn: "2023-10-01" },
    { id: 2, title: "Data Analyst", company: "Data Insights", location: "New York, USA", type: "Internship", postedOn: "2023-10-05" },
    { id: 3, title: "Marketing Intern", company: "Advertise Inc.", location: "San Francisco, USA", type: "Internship", postedOn: "2023-10-10" },
  ];

  const studentProfiles = [
    { id: 1, name: "Rajesh Kumar", branch: "Computer Science", cgpa: 9.2, skills: ["React", "Node.js", "Python"] },
    { id: 2, name: "Priya Sharma", branch: "Electrical Engineering", cgpa: 8.8, skills: ["Java", "Machine Learning", "SQL"] },
    { id: 3, name: "Amit Singh", branch: "Mechanical Engineering", cgpa: 8.5, skills: ["AutoCAD", "SolidWorks", "MATLAB"] },
  ];

  const placementStats = [
    { year: 2021, placed: 85, total: 100 },
    { year: 2022, placed: 90, total: 110 },
    { year: 2023, placed: 95, total: 120 },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-900 text-yellow-500 py-4 text-center text-3xl font-bold shadow-md">TPO Dashboard</header>

      {/* Job Postings Section */}
      <section className="container mx-auto py-10 px-4">
        <h2 className="text-2xl font-semibold mb-6 flex items-center"><FaBriefcase className="mr-2 text-yellow-500" /> Job Postings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobPostings.map((job) => (
            <div key={job.id} className="bg-white p-5 shadow-lg rounded-lg hover:shadow-2xl transition transform hover:scale-105">
              <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
              <p className="text-gray-600">{job.company}</p>
              <p className="text-gray-500">{job.location} • {job.type}</p>
              <p className="text-gray-400 mt-2">Posted on: {job.postedOn}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Student Profiles Section */}
      <section className="container mx-auto py-10 px-4">
        <h2 className="text-2xl font-semibold mb-6 flex items-center"><FaUsers className="mr-2 text-yellow-500" /> Student Profiles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {studentProfiles.map((student) => (
            <div key={student.id} className="bg-white p-5 shadow-lg rounded-lg hover:shadow-2xl transition transform hover:scale-105">
              <h3 className="text-xl font-semibold mb-2">{student.name}</h3>
              <p className="text-gray-600">{student.branch}</p>
              <p className="text-gray-500">CGPA: {student.cgpa}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {student.skills.map((skill, index) => (
                  <span key={index} className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Placement Statistics Section */}
      <section className="container mx-auto py-10 px-4">
        <h2 className="text-2xl font-semibold mb-6 flex items-center"><FaChartLine className="mr-2 text-yellow-500" /> Placement Statistics</h2>
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-200">
                <th className="py-2">Year</th>
                <th className="py-2">Placed Students</th>
                <th className="py-2">Total Students</th>
              </tr>
            </thead>
            <tbody>
              {placementStats.map((stat) => (
                <tr key={stat.year} className="border-b">
                  <td className="py-2 text-center font-semibold text-gray-700">{stat.year}</td>
                  <td className="py-2 text-center text-gray-600">{stat.placed}</td>
                  <td className="py-2 text-center text-gray-600">{stat.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default TpoPage;
