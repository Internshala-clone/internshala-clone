import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import app from "../config/firebase-config";
import axios from "axios";

const StudentSignup = () => {
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

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Sign Up Function
  const signUp = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state

    const { email, password, confirmPassword, firstName, lastName, mobile } =
      formData;

    // Basic Validations
    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return setError("Invalid email address.");
    }

    if (!/^\d{10}$/.test(mobile)) {
      return setError("Enter a valid 10-digit mobile number.");
    }

    setLoading(true); // Start loading

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save user in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email,
        firstName,
        lastName,
        userType: "student",
        createdAt: new Date(),
        mobile,
      });

      // Save in PostgreSQL backend
      await axios.post("http://localhost:5000/register", {
        email,
        password,
        firstName,
        lastName,
        mobile,
        userType: "student",
      });

      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-900">
          Sign-up and apply <span className="text-orange-500">for free</span>
        </h2>
        <p className="text-center text-gray-600 mb-6">
          1,50,000+ companies hiring on Internshala
        </p>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Google Signup Button */}
        <button className="w-full flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-700 font-medium mb-4 hover:bg-gray-100 transition-colors">
          <img
            src="https://tse1.mm.bing.net/th?id=OIP.AfKMLf4rKX7EqOSAVpujIQHaEK&pid=Api&P=0&h=180"
            alt="Google logo"
            className="w-6 h-6 object-contain"
          />
          Sign up with Google
        </button>

        <div className="flex items-center my-4">
          <div className="flex-1 border-b border-gray-300"></div>
          <span className="px-2 text-gray-500">OR</span>
          <div className="flex-1 border-b border-gray-300"></div>
        </div>

        {/* Signup Form */}
        <form onSubmit={signUp} className="space-y-4">
          <div>
            <label className="block text-gray-600 text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Must be at least 6 characters"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-gray-600 text-sm mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-600 text-sm mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-1">
              Mobile Number
            </label>
            <input
              type="text"
              name="mobile"
              placeholder="Enter mobile number"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <p className="text-xs text-gray-600 text-center">
            By signing up, you agree to our{" "}
            <a href="#" className="text-orange-500 hover:underline">
              Terms and Conditions
            </a>
            .
          </p>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already registered?{" "}
          <Link to="/login" className="text-orange-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default StudentSignup;