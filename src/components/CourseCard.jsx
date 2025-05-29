import React from "react";
import { useEffect } from "react";
import AOS from "aos";


const CourseCard = () => {

    useEffect(() => {
      AOS.init({ duration: 1300 });
    }, []);

  return (
    <div className="w-11/12 mt-12 p-6 sm:w-5/6 lg:w-4/5 max-w-screen-lg mx-auto">
      <div className='font-sans text-blue-900 text-2xl space-y-1' data-aos="fade-up">
          <h2 className='tracking-wider'>Training Time</h2>
          <h2 className='font-bold tracking-wide'>Explore Our Courses</h2>
        </div>
      <div className="bg-white rounded-xl my-8 shadow-lg overflow-hidden relative border-t-4 border-pink-500" data-aos="fade-up">
        {/* Sparkle New Button */}
        <div className="absolute -top-3 -right-3 z-10 ">
          <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-4 py-2.5 m-6 rounded-full font-bold text-sm shadow-lg transform transition-transform duration-100 animate-pulse">
            <span className="flex items-center gap-1">
              <span className="text-yellow-300">✨</span>
              New
              <span className="text-yellow-300">✨</span>
            </span>
          </button>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8"  >
          {/* Left Content */}
          <div className="p-6 lg:p-8">
            {/* <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="bg-blue-500 text-white text-sm px-4 py-1.5 rounded-full font-medium">
                NEW COURSE
              </span>
              <span className="bg-pink-100 text-pink-600 text-sm px-4 py-1.5 rounded-full font-medium">
                LAUNCH AND DEPLOY GEN AI APPS
              </span>
            </div> */}

            <h2 className="text-3xl font-bold leading-tight mb-4">
              <span className="text-[#D62A91]">Advanced Generative AI</span>
              <br />
              <span className="text-gray-900">Certification Course</span>
            </h2>

            <p className="text-gray-600 text-sm my-2">
              Master the skills that shape the future of technology with the Advanced Certificate Program in Generative AI, a 5-month generative AI course by Ethiantech.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-500 text-sm mb-1">Type</p>
                <p className="text-[#D62A91] font-semibold">Advanced Certificate</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-500 text-sm mb-1">Admission Deadline</p>
                <p className="text-[#D62A91] font-semibold">31-May-2025</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-500 text-sm mb-1">Duration</p>
                <p className="text-[#D62A91] font-semibold">5 Months</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button className="flex-1 bg-white border-2 border-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Download Brochure
              </button>
              <button className="flex-1 bg-[#D62A91] text-white px-6 py-3 rounded-lg font-medium hover:bg-pink-600 transition-colors">
                Enroll Now
              </button>
            </div>

            <div className="space-y-2">
              <p className="text-red-600 text-sm font-medium flex items-center gap-2">
                <span className="text-lg">⚠️</span>
                Hurry! <b>862</b> people have already applied in last 1 month
              </p>
              <p className="text-gray-500 text-sm flex items-center gap-2">
                <span className="text-lg">📞</span>
                For enquiries call: <span className="font-semibold">91-79775-71286</span>
              </p>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="relative h-full min-h-[400px]">
            <img
              src="AI_Course_img.jpg"
              alt="Generative AI Course"
              className="w-full h-full object-cover rounded-r-xl"
            />
            <div className="absolute bottom-4 left-4 bg-white bg-opacity-95 px-6 py-3 rounded-lg shadow-lg">
              <div className="flex flex-wrap gap-3 items-center">
                <span className="text-green-700 font-semibold">100% Online</span>
                <span className="text-[#D62A91] font-semibold">4 weeks</span>
                <span className="text-blue-900 font-semibold">Python Programming Refresher</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
