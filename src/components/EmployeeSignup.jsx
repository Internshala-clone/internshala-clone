import React from "react";
import { Link } from "react-router-dom";

const EmployeeSignup = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-lg font-semibold mb-4">Official Email Id</h2>
                <input
                    type="email"
                    placeholder="name@company.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <h2 className="text-lg font-semibold mb-2">Password</h2>
                <input
                    type="password"
                    placeholder="Minimum 6 characters"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="flex gap-3">
                    <div className="w-1/2">
                        <h2 className="text-lg font-semibold mb-2">First Name</h2>
                        <input
                            type="text"
                            placeholder="Your First Name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="w-1/2">
                        <h2 className="text-lg font-semibold mb-2">Last Name</h2>
                        <input
                            type="text"
                            placeholder="Your Last Name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        placeholder="Enter mobile number"
                        className="w-4/5 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <p className="text-sm text-gray-600 mt-3">
                    By clicking on <span className="font-bold">Post for Free</span>, you agree to our{" "}
                    <span className="text-blue-500 cursor-pointer">T&C.</span>
                </p>

                <button className="w-full bg-blue-500 text-white font-bold py-2 rounded-md mt-4 hover:bg-blue-600">
                    Post for Free
                </button>

                <p className="text-center text-gray-600 mt-4">Already registered?
                    <Link to="/login">
                        <a href="#" className="text-blue-500">Login</a>
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default EmployeeSignup;
