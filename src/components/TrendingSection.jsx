import React from "react";

const TrendingSection = () => {
  return (
    <section className="min-h-screen w-full flex flex-col justify-center items-center bg-white text-gray-900 text-center z-10 pt-24">
      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
        Unlock Your <span className="text-orange-500">Career Potential</span>
      </h1>
      <p className="text-lg max-w-2xl mx-auto text-gray-600">
        Discover trending opportunities and gain skills to accelerate your career journey.
      </p>

      {/* Subheading */}
      <h2 className="text-2xl md:text-3xl font-semibold mt-14">
        What's Hot on Internshala <span className="text-orange-500">🔥</span>
      </h2>

      {/* Trending Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12 max-w-6xl w-full px-4">
        {trendingData.map((item, index) => (
          <div
            key={index}
            className="relative rounded-xl overflow-hidden shadow-md transform transition duration-300 hover:scale-105 bg-white border border-gray-200 p-6"
          >
            {/* Card Image */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover rounded-lg"
            />

            {/* Card Content */}
            <h3 className="text-xl font-bold mt-4 text-gray-900">{item.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Call-to-Action Button */}
      <div className="mt-12 mb-24">
        <a
          href="#explore"
          className="bg-orange-500 text-white px-8 py-3 rounded-full text-lg font-medium shadow-md transition duration-300 hover:bg-orange-600"
        >
          Discover More
        </a>
      </div>
    </section>
  );
};

// Trending Data
const trendingData = [
  {
    image: "https://internshala.com/static/images/pgc_course_specific_banners/pgc_homepage_banner_new.png",
    title: "Placement Guaranteed Courses",
    description: "Secure your future with expert-led courses.",
  },
  {
    image: "https://internshala-uploads.internshala.com/banner-images/home_new/stt_superskill_feb25-student.png.webp",
    title: "Super Skills Programs",
    description: "Develop high-demand skills for a competitive edge.",
  },
  {
    image: "https://internshala-uploads.internshala.com/banner-images/home_new/study_abroad_is-student.png.webp",
    title: "Study Abroad Opportunities",
    description: "Explore international education opportunities.",
  },
];

export default TrendingSection;