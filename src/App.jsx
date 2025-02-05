import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import Signup from "./components/SignUp";

import Login from "./components/Login";
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
