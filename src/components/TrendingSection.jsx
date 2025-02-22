import React from "react";

const TrendingSection = () => {
  return (
    <section className="h-screen w-full flex flex-col justify-center items-center bg-gradient-to-r from-purple-600 to-indigo-700 text-white text-center z-10">
      {/* Heading Section */}
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
        Unlock Your <span className="text-yellow-300">Career Potential</span>
      </h1>
      <p className="text-lg max-w-2xl mx-auto">
        Discover trending opportunities and gain skills to accelerate your
        career journey.
      </p>

      {/* Subheading */}
      <h2 className="text-2xl md:text-3xl font-semibold mt-14">
        What's Hot on Internshala <span className="text-yellow-300">🔥</span>
      </h2>

      {/* Trending Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-12 max-w-6xl w-full">
        {trendingData.map((item, index) => (
          <div
            key={index}
            className="relative rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 bg-white text-gray-900 p-6"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h3 className="text-xl font-bold mt-4">{item.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-12">
        <a
          href="#explore"
          className="bg-yellow-300 text-gray-900 px-6 py-3 rounded-full text-lg font-medium shadow-md transition duration-300 hover:bg-yellow-400"
        >
          Discover More
        </a>
      </div>
    </section>
  );
};

const trendingData = [
  {
    image:
      "https://internshala.com/static/images/pgc_course_specific_banners/pgc_homepage_banner_new.png",
    title: "Placement Guaranteed Courses",
    description: "Secure your future with expert-led courses.",
  },
  {
    image:
      "https://internshala-uploads.internshala.com/banner-images/home_new/stt_superskill_feb25-student.png.webp",
    title: "Super Skills Programs",
    description: "Develop high-demand skills for a competitive edge.",
  },
  {
    image:
      "https://internshala-uploads.internshala.com/banner-images/home_new/study_abroad_is-student.png.webp",
    title: "Study Abroad Opportunities",
    description: "Explore international education opportunities.",
  },
];

export default TrendingSection;
