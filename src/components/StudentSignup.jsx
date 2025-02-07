import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import app from "../config/firebase-config";

const StudentSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const auth = getAuth(app);
  const db = getFirestore(app);

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

      // Save user details in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        firstName: firstName,
        lastName: lastName,
        userType: "student",
        createdAt: new Date(),
      });

      navigate("/");
    } catch (error) {
      setError(error.message); // Set error message for display
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-sky-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-2">
          Sign-up and apply <span className="text-blue-500">for free</span>
        </h2>
        <p className="text-center text-gray-600 mb-6">
          1,50,000+ companies hiring on Internshala
        </p>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Google Signup Button */}
        <button className="w-full flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-700 font-medium mb-4 hover:bg-gray-100">
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
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm mb-1">Password</label>
            <input
              type="password"
              placeholder="Must be at least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-600 text-sm mb-1">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>

          <p className="text-xs text-gray-600 text-center">
            By signing up, you agree to our{" "}
            <a href="#" className="text-blue-500">
              Terms and Conditions
            </a>
            .
          </p>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already registered?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default StudentSignup;
