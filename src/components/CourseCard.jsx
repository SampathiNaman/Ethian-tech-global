import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import { INSTALLMENT_OPTIONS, calculatePerInstallmentAmount, calculateInstallmentFee, formatCurrency, formatFeePercentage } from "../utils/installmentUtils";
import { useAuth } from '../context/AuthContext';import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight, faArrowUpRightDots, faBriefcase, faChalkboard, faChalkboardUser, faMagnifyingGlass, faMoneyCheck, faPencil, faUserGroup, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { NavLink } from "react-router-dom";
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

const services = [
  {
    title: "Comprehensive Curriculum",
    desc: "Designed to build industry-valued skills and most-widely used tools and techniques.",
    icon: faBriefcase,
  },
  {
    title: "Interactive Mentored Learning",
    desc: "Collaborative yet personalised live online mentored learning in small groups.",
    icon: faChalkboardUser,
  },
  {
    title: "Hands-on learning",
    desc: "Become an AI & ML expert with 8+ hands-on projects under the guidance of industry experts.",
    icon: faMagnifyingGlass,
  },
  {
    title: "Dedicated career support",
    desc: "Personalised 1:1 career guidance and interview prep with Resume & LinkedIn review by experts.",
    icon: faChalkboard,
  },
  {
    title: "Program Support & Networking",
    desc: "Dedicated Program Manager to ensure you stay on track. Interact with peers during sessions.",
    icon: faArrowUpRightDots,
  },
];


const CourseCard = () => {
  const navigate = useNavigate();
  const { user, openLoginPopup } = useAuth();
  const [selectedInstallments, setSelectedInstallments] = useState(1);
  const [isAutomatic, setIsAutomatic] = useState(true);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  
  const coursePrice = 1999; // Price in USD
  const currency = 'USD';
  const service = 'advanced_generative_ai_course';
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_BROCHURE_SERVICE_ID, 
        import.meta.env.VITE_BROCHURE_TEMPLATE_ID, 
        e.target,
        import.meta.env.VITE_BROCHURE_PUBLIC_KEY
      );

      // Log success
      console.log('Email sent successfully');
      toast.success('Form submitted successfully!');
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownload = () => {
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = '/Agentic-AI-and-GenAI-Course-Overview-by-EthianTech_May.pdf';
    link.download = 'Agentic-AI-and-GenAI-Course-Overview-by-EthianTech_May.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Close the popup after download starts
    setShowPopup(false);
    setIsSubmitted(false);
    setFormData({ name: '', email: '' });
  };

  useEffect(() => {
    AOS.init({ duration: 1300 });
  }, []);

  const handleEnroll = () => {
    const paymentDetails = {
      amount: coursePrice,
      currency: currency,
      numberOfInstallments: selectedInstallments,
      isAutomatic: isAutomatic,
      service: service
    };

    if (user) {
      if (selectedInstallments === 1) {
        navigate('/payment', { state: paymentDetails });
      } else {
        navigate('/installment-payment', { state: paymentDetails });
      }
    } else {
      const redirectPath = selectedInstallments === 1 ? '/payment' : '/installment-payment';
      openLoginPopup(redirectPath, paymentDetails);
    }
  };

  const renderInstallmentDetails = () => {
    const perInstallmentAmount = calculatePerInstallmentAmount(coursePrice, selectedInstallments);
    const totalFee = calculateInstallmentFee(coursePrice, selectedInstallments);
    const totalAmount = coursePrice + totalFee;

    return (
      <div className="my-4">
        <button
          onClick={() => setShowPaymentDetails(!showPaymentDetails)}
          className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:bg-gradient-to-r hover:from-pink-50 hover:to-white transition-all duration-200"
        >
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-start">
              <span className="text-sm text-gray-600">Selected Plan</span>
              <span className="text-lg font-semibold text-gray-900">
                {selectedInstallments === 1 
                  ? formatCurrency(coursePrice, currency)
                  : `${formatCurrency(perInstallmentAmount, currency)} × ${selectedInstallments} months`
                }
              </span>
            </div>
            {selectedInstallments > 1 && (
              <span className="text-sm text-gray-500">
                (Total: {formatCurrency(totalAmount, currency)})
              </span>
            )}
          </div>
          <span className={`transform transition-transform duration-200 ${showPaymentDetails ? 'rotate-180' : ''}`}>
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>

        {showPaymentDetails && (
          <div className="mt-2 p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Course Price:</span>
                <span className="font-medium">{formatCurrency(coursePrice, currency)}</span>
          </div>
              {selectedInstallments > 1 && (
                <>
          <div className="flex justify-between">
                    <span className="text-gray-600">Installment Fee ({formatFeePercentage(selectedInstallments)}%):</span>
                    <span className="font-medium">{formatCurrency(totalFee, currency)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total Amount:</span>
                    <span className="font-medium">{formatCurrency(totalAmount, currency)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Per Installment:</span>
                    <span className="font-medium">{formatCurrency(perInstallmentAmount, currency)}</span>
          </div>
          <div className="pt-2 border-t border-gray-200">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isAutomatic}
                onChange={(e) => setIsAutomatic(e.target.checked)}
                className="form-checkbox h-4 w-4 text-pink-600 rounded border-gray-300 focus:ring-pink-500"
              />
                      <div className="flex flex-col">
              <span className="text-sm text-gray-700">
                Enable automatic monthly payments
              </span>
                        <span className="text-xs text-gray-500">
                          Your card will be automatically charged each month
                        </span>
                      </div>
            </label>
                  </div>
                </>
              )}
              {selectedInstallments === 1 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="font-medium">{formatCurrency(coursePrice, currency)}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-11/12 mt-12 p-6 sm:w-5/6 lg:w-4/5 max-w-screen-lg mx-auto">
      <div className='font-sans text-blue-900 text-2xl space-y-1' data-aos="fade-up">
        <h2 className='tracking-wider'>Training Time</h2>
        <h2 className='font-bold tracking-wide'>Explore Our Courses</h2>
      </div>
      <div className="bg-white sticky -top-[1000px] sm:-top-[750px] md:-top-[350px] z-[1] rounded-xl my-8 shadow-lg overflow-hidden border-t-4 border-pink-500" data-aos="fade-up">
        {/* Sparkle New Button */}
        <div className="absolute -top-3 -right-3 z-10 ">
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-3 py-2 m-6 rounded-full font-bold text-md shadow-lg transform transition-transform duration-100 animate-pulse">
            <span className="flex items-center gap-1">
              <span className="text-yellow-300">✨</span>
              New
              <span className="text-yellow-300">✨</span>
            </span>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8"  >
          {/* Left Content */}
          <div className="p-6 lg:p-8">

            <h2 className="text-3xl font-bold leading-tight mb-4">
              <span className="text-[#D62A91]">Advanced Generative AI</span>
              <br />
              <span className="text-gray-900">Certification Course</span>
            </h2>

            <p className="text-gray-600 text-sm my-2">
              Master the skills that shape the future of technology with the Advanced Certificate Program in Generative AI, a 5-month generative AI course by Ethiantech.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-8">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-500 text-sm mb-1">Type</p>
                <p className="text-[#D62A91] font-semibold">Advanced Certificate</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-500 text-sm mb-1">Admission Deadline</p>
                <p className="text-[#D62A91] font-semibold">15-June-2025</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-500 text-sm mb-1">Duration</p>
                <p className="text-[#D62A91] font-semibold">5 Months</p>
              </div>
            </div>

            {/* Payment Options */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Payment Plan
              </label>
              <div className="relative">
                <div className="flex overflow-x-auto pb-4 gap-3 scrollbar-hide custom-scrollbar">
                  {INSTALLMENT_OPTIONS.map(option => {
                    const perInstallmentAmount = calculatePerInstallmentAmount(coursePrice, option.value);
                    const totalFee = calculateInstallmentFee(coursePrice, option.value);
                    const totalAmount = coursePrice + totalFee;

                    return (
                      <div
                        key={option.value}
                        onClick={() => setSelectedInstallments(option.value)}
                        className={`flex-none w-[240px] cursor-pointer rounded-xl border-2 p-4 transition-all duration-200 ${
                          selectedInstallments === option.value
                            ? 'border-[#D62A91] bg-gradient-to-br from-pink-50 to-white shadow-lg'
                            : 'border-gray-200 hover:border-pink-200 hover:shadow-md'
                        }`}
                      >
                        <div className="flex flex-col">
                          {option.highlight && (
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full w-fit mb-2 ${
                              option.value === 1 
                                ? 'bg-green-100 text-green-700'
                                : option.value === 3
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-purple-100 text-purple-700'
                            }`}>
                              {option.highlight}
                            </span>
                          )}
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">
                    {option.label}
                            </h4>
                            <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                              selectedInstallments === option.value
                                ? 'border-[#D62A91]'
                                : 'border-gray-300'
                            }`}>
                              {selectedInstallments === option.value && (
                                <div className="h-2 w-2 rounded-full bg-[#D62A91]" />
                              )}
                            </div>
                          </div>
                          <div className="text-sm space-y-1">
                            {option.value === 1 ? (
                              <>
                                <span className="text-[#D62A91] font-medium block text-lg">
                                  {formatCurrency(coursePrice, currency)}
                                </span>
                                <span className="text-gray-600 text-xs">{option.description}</span>
                              </>
                            ) : (
                              <>
                                <span className="text-gray-600 block">
                                  {formatCurrency(perInstallmentAmount, currency)}/mo
                                </span>
                                <span className="text-[#D62A91] font-medium block">
                                  Total: {formatCurrency(totalAmount, currency)}
                                </span>
                                <span className="text-gray-600 text-xs">
                                  {option.description} ({formatFeePercentage(option.value)}% processing fee)
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-white pointer-events-none" />
              </div>
            </div>

            {renderInstallmentDetails()}

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button 
                onClick={() => setShowPopup(true)}
                className="flex-1 bg-white border-2 border-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Download Brochure
              </button>
              <button 
                onClick={handleEnroll}
                className="flex-1 bg-[#D62A91] text-white px-6 py-3 rounded-lg font-medium hover:bg-pink-600 transition-colors"
              >
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
                For enquiries: <span className="font-semibold">+1-443-675-8888 or info@ethiantech.com</span>
              </p>
              {/* <p className="text-gray-500 text-sm flex items-center gap-2 ml-10">
                or Mail us: <span className="font-semibold">info@ethiantech.com</span>
              </p> */}
            </div>
          </div>

          {/* Right Image Section */}
          <div className="relative h-full min-h-[400px]">
            <img
              src="AI_Course_img.jpg"
              alt="Generative AI Course"
              className="w-full h-full object-cover rounded-r-xl"
            />
            <div className="absolute bottom-4 left-4 bg-white bg-opacity-95 px-4 py-2 rounded-lg shadow-lg">
              <div className="flex flex-wrap gap-3 items-center">
                <span className="text-green-700 font-semibold">100% Online</span>
                <span className="text-[#D62A91] font-semibold">4 weeks</span>
                <span className="text-blue-900 font-semibold">Python Programming Refresher</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Form */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative">
            <button 
              onClick={() => {
                setShowPopup(false);
                setIsSubmitted(false);
                setFormData({ name: '', email: '' });
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FontAwesomeIcon icon={faXmark} className="text-xl" />
            </button>
            
            <h3 className="text-2xl font-bold text-blue-900 mb-6">Fill the form to download the Brochure</h3>
            
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#D62A91] text-white px-6 py-3 rounded-lg font-medium hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    'Submit'
                  )}
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 text-center">
                    Thank you for your interest! Your details have been submitted successfully.
                  </p>
                </div>
                <button
                  onClick={handleDownload}
                  className="w-full bg-[#D62A91] text-white px-6 py-3 rounded-lg font-medium hover:bg-pink-600 transition-colors"
                >
                  Download Brochure Now
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg p-6 mt-8 relative z-0" data-aos="fade-up">
        {/* Who Is This Program For Section */}
        <h3 className="text-xl md:text-2xl font-bold mb-4 text-blue-900 text-center">Who Is This Program For?</h3>
        <ul className="list-none md:pl-6 space-y-2 text-gray-800 md:w-[88%] mx-auto">
          <li className="flex items-start gap-2 py-2"><FontAwesomeIcon icon={faAnglesRight} className="text-[#D62A91] mt-2 mx-1 md:mx-4" /><p className="text-sm md:text-base"><b>Program</b> is designed for <b>forward-thinking individuals </b>and organizations seeking to harness the power of artificial intelligence to drive innovation, efficiency, and impact in their fields.</p>
          </li>
          <li className="flex items-start gap-2 py-2"><FontAwesomeIcon icon={faAnglesRight} className="text-[#D62A91] mt-1 mx-1 md:mx-4 " /><p className="text-sm md:text-base"><b>Industry professionals and domain experts</b> who are looking to gain practical knowledge of how AI technologies can be integrated into their workflows to enhance decision-making, automate tasks, and optimize processes.</p>
          </li>
          <li className="flex items-start gap-2 py-2"><FontAwesomeIcon icon={faAnglesRight} className="text-[#D62A91] mt-1  mx-1 md:mx-4 " /><p className="text-sm md:text-base"><b>Business leaders, managers, and executives</b> who want a strategic understanding of AI implementation to drive transformation, improve performance, foster innovation, and gain a competitive edge in today's fast-evolving digital landscape.</p>
          </li>
          <li className="flex items-start gap-2 py-2"><FontAwesomeIcon icon={faAnglesRight} className="text-[#D62A91] mt-1  mx-1 md:mx-4 " /><p className="text-sm md:text-base"><b>Technology and innovation enthusiasts</b> who recognize AI's potential to revolutionize industries and aspire to lead cutting-edge projects that meet the evolving needs of organizations and consumers alike.</p>
          </li>
          <li className="flex items-start gap-2 py-2"><FontAwesomeIcon icon={faAnglesRight} className="text-[#D62A91] mt-1  mx-1 md:mx-4 " /><p className="text-sm md:text-base"><b>Consultants, regulators, and policymakers</b> who are guiding organizations through digital transformation or shaping.</p></li>
        </ul>





        <div className="bg-white rounded-xl p-6 mt-8 relative z-0" data-aos="fade-up">
          <h2 className="text-xl md:text-2xl font-bold mb-10 text-blue-900 text-center">Learning Experience</h2>
          <div className="grid place-items-center grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-center">
            <div>
              <FontAwesomeIcon icon={faMoneyCheck} className="text-blue-900 mt-1 text-4xl md:text-5xl mx-4 py-6" />
              <p className="text-gray-600 text-sm mb-2">Completion Certificate</p>
            </div>
            <div>
              <FontAwesomeIcon icon={faBriefcase} className="text-blue-900 mt-1 text-4xl md:text-5xl mx-4 py-6" />
              <p className="text-gray-600 text-sm mb-2">Capstone Project</p>
            </div>
            <div>
              <FontAwesomeIcon icon={faUserGroup} className="text-blue-900 mt-1 text-4xl md:text-5xl mx-4 py-6" />
              <p className="text-gray-600 text-sm mb-2">Immersive Discussion</p>
            </div>
            <div>
              <FontAwesomeIcon icon={faChalkboardUser} className="text-blue-900 mt-1 text-4xl md:text-5xl mx-4 py-6" />
              <p className="text-gray-600 text-sm mb-2">Weekly live office hours with the course facilitator</p>
            </div>
            <div>
              <FontAwesomeIcon icon={faPencil} className="text-blue-900 mt-1 text-4xl md:text-5xl mx-4 py-6" />
              <p className="text-gray-600 text-sm mb-2">Practical, scenario-based assignments</p>
            </div>
            <div>
              <FontAwesomeIcon icon={faMagnifyingGlass} className="text-blue-900 mt-1 text-4xl md:text-5xl mx-4 py-6" />
              <p className="text-gray-600 text-sm mb-2">Real-world examples and case studies</p>
            </div>
          </div>
        </div>





        <div className="bg-white rounded-xl p-6 mt-8 relative z-0" data-aos="fade-up">
          <h2 className="text-xl md:text-2xl font-bold mb-10 text-blue-900 text-center">Designed for working Professionals</h2>
          <div className="relative mt-8">
            <Swiper
              spaceBetween={20}
              slidesPerView={1.2}
              breakpoints={{
                800: { slidesPerView: 2 },
                950: { slidesPerView: 2.3 },
                1250: { slidesPerView: 3 },
              }}
              loop={true}
              autoplay={{ delay: 3000, disableOnInteraction: true }}
              pagination={{ clickable: true }}
              modules={[Pagination, Autoplay]}
              className="mt-8"
            >
              {services.map((service, index) => (
                <SwiperSlide key={index} className="flex justify-center">
                  <div className="bg-white p-2 md:p-4 mb-12 rounded-lg shadow-lg max-w-xs min-h-[275px] md:min-h-[300px] flex flex-col justify-between hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-[1.03]" data-aos="fade-up">

                    <div className="text-center">
                      <FontAwesomeIcon icon={service.icon} className="text-[#D62A91] text-center mt-1 text-4xl md:text-5xl mx-4 py-3 md:py-6" />
                      <h3 className="text-md md:text-xl font-semibold text-gray-800 mt-4">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm md:text-base mt-2">{service.desc}</p>
                    </div>

                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <div className="flex justify-center items-center w-full">
          <NavLink to="/contact" className="mx-auto text-center bg-[#D62A91] text-white text-base rounded-md hover:bg-pink-600 active:scale-95 px-4 py-2 my-10 md:mb-8">
            For more details, talk to our experts
          </NavLink>
        </div>

      </div>
    </div>
  );
};

export default CourseCard;

const styles = `
.custom-scrollbar::-webkit-scrollbar {
  height: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #D62A91;
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #b3247a;
}
`;
