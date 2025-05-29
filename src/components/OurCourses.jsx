import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const courses = [
    {
        id: 1,
        title: "Advanced React Development",
        description: "Master modern React development with hooks, context, and performance optimization.",
        price: 1200,
        currency: "usd",
        service: "react_training",
        thumbnail: "placeholder-react.webp", // Placeholder image
        brochureLink: "#", // Placeholder link
    },
    {
        id: 2,
        title: "Fullstack Node.js with Express & MongoDB",
        description: "Build robust and scalable backend applications using Node.js, Express, and MongoDB.",
        price: 1500,
        currency: "usd",
        service: "nodejs_training",
        thumbnail: "placeholder-nodejs.webp", // Placeholder image
        brochureLink: "#", // Placeholder link
    },
    {
        id: 3,
        title: "DevOps Fundamentals with Docker & Kubernetes",
        description: "Learn the essentials of DevOps, containerization with Docker, and orchestration with Kubernetes.",
        price: 1800,
        currency: "usd",
        service: "devops_training",
        thumbnail: "placeholder-devops.webp", // Placeholder image
        brochureLink: "#", // Placeholder link
    },
];

function OurCourses() {
    const navigate = useNavigate();
    const { user, openLoginPopup } = useAuth();

    const handleEnrollClick = (course) => {
        if (user) {
            navigate('/payment', { state: { amount: course.price, currency: course.currency, service: course.service, description: course.title } });
        } else {
            openLoginPopup('/payment', { amount: course.price, currency: course.currency, service: course.service, description: course.title });
        }
    };

    return (
        <section className="w-11/12 sm:w-5/6 lg:w-4/5 max-w-screen-lg mx-auto p-6 md:p-8 mt-12 mb-20">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4 md:py-8">
                {courses.map((course) => (
                    <div key={course.id} className="bg-white rounded-lg shadow-lg p-4 md:p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-[1.03]" data-aos="fade-up">
                        <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-full h-40 object-cover rounded-t-lg mb-4"
                        />
                        <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">
                            {course.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                            {course.description}
                        </p>
                         <div className="flex justify-between items-center mt-auto">
                            <span className="text-lg font-bold text-blue-700">{{
                                'usd': `$${course.price}`
                            }[course.currency] || `${course.price} ${course.currency.toUpperCase()}`}</span>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleEnrollClick(course)}
                                    className="bg-[#D62A91] text-white text-sm rounded-md hover:bg-pink-600 active:scale-95 px-3 py-1"
                                >
                                    Enroll
                                </button>
                                <a
                                    href={course.brochureLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 active:scale-95 px-3 py-1 inline-flex items-center"
                                >
                                    Brochure
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default OurCourses; 