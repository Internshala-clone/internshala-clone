import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase-config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(""); // State to hold error messages
  const [loading, setLoading] = useState(false); // State for loading
  const navigate = useNavigate();

  const logIn = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true on submit
    setError(""); // Reset any previous error

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      // Handle different types of errors
      switch (error.code) {
        case "auth/invalid-credential":
          setError("Invalid Credentials.");
          break;
        default:
          setError("Login failed. Please try again.");
          console.log(error.code);
      }
    } finally {
      setLoading(false); // Set loading to false after attempt
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}{" "}
        {/* Error message */}
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-800 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-800 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className={`w-full bg-red-700 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={logIn}
            disabled={loading} // Disable the button while loading
          >
            {loading ? "Logging in..." : "Login"} {/* Loading state */}
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-sky-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
