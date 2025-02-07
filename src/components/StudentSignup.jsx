import React from "react";
import { Link } from "react-router-dom";

const StudentSignup = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-sky-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-2">Sign-up and apply <span className="text-blue-500">for free</span></h2>
                <p className="text-center text-gray-600 mb-6">1,50,000+ companies hiring on Internshala</p>

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

                <form className="space-y-4">
                    <div>
                        <label className="block text-gray-600 text-sm mb-1">Email</label>
                        <input type="email" placeholder="john@example.com" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                    <div>
                        <label className="block text-gray-600 text-sm mb-1">Password</label>
                        <input type="password" placeholder="Must be at least 6 characters" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="block text-gray-600 text-sm mb-1">First Name</label>
                            <input type="text" placeholder="John" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        </div>
                        <div className="w-1/2">
                            <label className="block text-gray-600 text-sm mb-1">Last Name</label>
                            <input type="text" placeholder="Doe" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        </div>
                    </div>

                    <p className="text-xs text-gray-600 text-center">By signing up, you agree to our <a href="#" className="text-blue-500">Terms and Conditions</a>.</p>

                    <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Sign up</button>
                </form>

                <p className="text-center text-gray-600 mt-4">Already registered? 
                    <Link to="/login">
                    <a href="#" className="text-blue-500">Login</a>
                    </Link>
                    </p>
            </div>
        </div>
    );
};

export default StudentSignup;
