import React from "react";

const TrendingSection = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-5xl font-bold mb-4">
        Make your dream career a reality
      </h1>
      <h2 className="text-3xl font-bold mt-16">Trending on Internshala 🔥</h2>

      <div className="flex justify-center gap-6 mt-8">
      <div className="w-96 h-64 rounded-lg overflow-hidden flex items-center justify-center">
          <img 
            src="https://internshala.com/static/images/pgc_course_specific_banners/pgc_homepage_banner_new.png"
            alt="Placement guaranteed courses"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Card 2 */}
        <div className="w-96 h-64 rounded-lg overflow-hidden flex items-center justify-center">
          <img 
            src="https://internshala-uploads.internshala.com/banner-images/home_new/stt_superskill_feb25-student.png.webp"
            alt="Placement guaranteed courses"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Card 3 */}
        <div className="w-96 h-64 rounded-lg overflow-hidden flex items-center justify-center">
          <img 
            src="https://internshala-uploads.internshala.com/banner-images/home_new/study_abroad_is-student.png.webp"
            alt="Placement guaranteed courses"
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </div>
  );
};

export default TrendingSection;
