import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../config/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signUp = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Basic validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email address.");
      return;
    }

    setLoading(true); // Start loading state

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        name: name,
        createdAt: new Date(),
      });

      navigate("/");
    } catch (error) {
      setError(error.message); // Set error message for display
    } finally {
      setLoading(false); // End loading state
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    console.log("Name:", name, "Email:", email, "Password:", password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
        <form onSubmit={signUp}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full ${
              loading ? "bg-gray-400" : "bg-sky-500"
            } text-white py-2 rounded-md hover:bg-sky-600 transition duration-200`}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-sky-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
