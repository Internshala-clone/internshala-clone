import React from "react";

const Navbar = () => {
  return (
    <div>
      <div className="h-20 w-screen bg-white flex items-center justify-center shadow-md font-bold">
        <div className="mx-20 hover:cursor-pointer">
          <span className="text-sky-500">INTERN</span>SHALA
        </div>
        <div className="h-full px-5 items-center justify-center flex hover:bg-sky-100 hover:text-sky-500 cursor-pointer">
          Internships
        </div>
        <div className="h-full px-5 items-center justify-center flex hover:bg-sky-100 hover:text-sky-500 cursor-pointer">
          Jobs
        </div>
        <div className="h-full px-5 items-center justify-center flex hover:bg-sky-100 hover:text-sky-500 cursor-pointer">
          Courses
        </div>
      </div>
    </div>
  );
};

export default Navbar;
