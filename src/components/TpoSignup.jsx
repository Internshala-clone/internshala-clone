import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import app from "../config/firebase-config";
import axios from "axios";

const TpoSignup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    mobile: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const auth = getAuth(app);
  const db = getFirestore(app);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const signUp = async (e) => {
    e.preventDefault();
    setError("");

    const { email, password, confirmPassword, firstName, lastName, mobile } =
      formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email address.");
      return;
    }

    if (!/^\d{10}$/.test(mobile)) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        firstName,
        lastName,
        mobile,
        userType: "tpo",
        createdAt: new Date(),
      });

      await axios.post("http://localhost:5000/register", {
        email,
        password,
        firstName,
        lastName,
        mobile,
        userType: "tpo",
      });

      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">TPO Signup</h2>
        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

        <form onSubmit={signUp}>
          <input
            type="email"
            name="email"
            placeholder="name@institution.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <h2 className="text-lg font-semibold mb-2">Password</h2>
          <input
            type="password"
            name="password"
            placeholder="Minimum 6 characters"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <h2 className="text-lg font-semibold mb-2">Confirm Password</h2>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Re-enter your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <div className="flex gap-3">
            <div className="w-1/2">
              <h2 className="text-lg font-semibold mb-2">First Name</h2>
              <input
                type="text"
                name="firstName"
                placeholder="Your First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="w-1/2">
              <h2 className="text-lg font-semibold mb-2">Last Name</h2>
              <input
                type="text"
                name="lastName"
                placeholder="Your Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <h2 className="text-lg font-semibold mb-2">Mobile Number</h2>
          <div className="flex gap-3">
            <input
              type="text"
              value="+91"
              readOnly
              className="w-1/5 px-3 py-2 border border-gray-300 rounded-md focus:outline-none bg-gray-100"
            />
            <input
              type="text"
              name="mobile"
              placeholder="Enter mobile number"
              value={formData.mobile}
              onChange={handleChange}
              className="w-4/5 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 rounded-md mt-4 hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Processing..." : "Register"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default TpoSignup;
