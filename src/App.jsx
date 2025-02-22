import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import Signup from "./components/SignUp";
import StudentSignup from "./components/StudentSignup";
import EmployeeSignup from "./components/EmployeeSignup";
import TpoSignup from "./components/TpoSignup";

import Login from "./components/Login";
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/studentsignup" element={<StudentSignup />} />
          <Route path="/employeesignup" element={<EmployeeSignup />}></Route>
          <Route path="/tposignup" element={<TpoSignup />}></Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
