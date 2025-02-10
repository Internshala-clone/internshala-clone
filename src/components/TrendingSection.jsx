import React from "react";



const TrendingSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-center">
      {/* Heading Section */}
      <h1 className="text-5xl font-extrabold mb-4 leading-tight">
        Unlock Your <span className="text-yellow-300">Career Potential</span>
      </h1>
      <p className="text-lg max-w-2xl mx-auto">
        Discover trending opportunities and gain skills to accelerate your career journey.
      </p>

      {/* Subheading */}
      <h2 className="text-3xl font-semibold mt-16">
        What's Hot on Internshala <span className="text-yellow-300">🔥</span>
      </h2>

      {/* Trending Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12 px-6">
        {/* Card 1 */}
        <div className="relative rounded-xl overflow-hidden shadow-xl transform transition duration-300 hover:scale-105 bg-white text-gray-900 p-6">
          <img 
            src="https://internshala.com/static/images/pgc_course_specific_banners/pgc_homepage_banner_new.png"
            alt="Placement guaranteed courses"
            className="w-full h-48 object-cover rounded-lg"
          />
          <h3 className="text-xl font-bold mt-4">Placement Guaranteed Courses</h3>
          <p className="text-sm text-gray-600 mt-2">Secure your future with expert-led courses.</p>
        </div>

        {/* Card 2 */}
        <div className="relative rounded-xl overflow-hidden shadow-xl transform transition duration-300 hover:scale-105 bg-white text-gray-900 p-6">
          <img 
            src="https://internshala-uploads.internshala.com/banner-images/home_new/stt_superskill_feb25-student.png.webp"
            alt="Super Skills Programs"
            className="w-full h-48 object-cover rounded-lg"
          />
          <h3 className="text-xl font-bold mt-4">Super Skills Programs</h3>
          <p className="text-sm text-gray-600 mt-2">Develop high-demand skills for a competitive edge.</p>
        </div>

        {/* Card 3 */}
        <div className="relative rounded-xl overflow-hidden shadow-xl transform transition duration-300 hover:scale-105 bg-white text-gray-900 p-6">
          <img 
            src="https://internshala-uploads.internshala.com/banner-images/home_new/study_abroad_is-student.png.webp"
            alt="Study Abroad Opportunities"
            className="w-full h-48 object-cover rounded-lg"
          />
          <h3 className="text-xl font-bold mt-4">Study Abroad Opportunities</h3>
          <p className="text-sm text-gray-600 mt-2">Explore international education opportunities.</p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-12">
        <a 
          href="#explore" 
          className="bg-yellow-300 text-gray-900 px-6 py-3 rounded-full text-lg font-medium shadow-md transition duration-300 hover:bg-yellow-400">
          Discover More
        </a>
      </div>
    </section>
  );
};

export default TrendingSection;
