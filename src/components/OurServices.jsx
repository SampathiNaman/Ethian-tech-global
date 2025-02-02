import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function OurServices() {
    useEffect(() => {
            AOS.init({ duration: 1300 });
          });
    return (
        <section className="w-11/12 sm:w-5/6 lg:w-4/5 max-w-screen-lg mx-auto my-12 p-6 md:p-8">
            <div className="container mx-auto px-4">
                <div className='font-sans text-blue-900 text-2xl space-y-1' data-aos="fade-up">
                    <h2 className='tracking-wider'>Better Future</h2>
                    <h2 className='font-bold tracking-wide'>Explore Our Services</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-8" data-aos="fade-up">
                    <div className="bg-white p-6 rounded-lg shadow-lg" >
                        <img alt="Illustration of cloud computing services" className="w-full h-40 object-cover rounded-t-lg" height="400" src="https://storage.googleapis.com/a1aa/image/smv91j3E6shuEZP75cs87e-UXUZYaDDBlaOjHpfI7i4.jpg" width="600" />
                        <h3 className="text-xl font-semibold text-gray-800 mt-4">
                            Cloud Computing
                        </h3>
                        <p className="text-gray-600 mt-2">
                            Leverage the power of cloud computing to enhance your business operations and scalability.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg" data-aos="fade-up">
                        <img alt="Illustration of cybersecurity services" className="w-full h-40 object-cover rounded-t-lg" height="400" src="https://storage.googleapis.com/a1aa/image/YzWiArSy8jY3W2DM4AgsTacxHjXgpYYiV5XSrxn1NGE.jpg" width="600" />
                        <h3 className="text-xl font-semibold text-gray-800 mt-4">
                            Cybersecurity
                        </h3>
                        <p className="text-gray-600 mt-2">
                            Protect your business from cyber threats with our comprehensive cybersecurity solutions.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg" data-aos="fade-up">
                        <img alt="Illustration of IT consulting services" className="w-full h-40 object-cover rounded-t-lg" height="400" src="https://storage.googleapis.com/a1aa/image/9a2-yoYLl-glPZZUm5yK9xATEm7aqi5WKCu8tvuS4q8.jpg" width="600" />
                        <h3 className="text-xl font-semibold text-gray-800 mt-4">
                            IT Consulting
                        </h3>
                        <p className="text-gray-600 mt-2">
                            Get expert advice and strategies to optimize your IT infrastructure and operations.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg" data-aos="fade-up">
                        <img alt="Illustration of software development services" className="w-full h-40 object-cover rounded-t-lg" height="400" src="https://storage.googleapis.com/a1aa/image/RoulZ--n9HTWaP6_XDAY-Zb-C8w7DZL_OxMGj2KJXu0.jpg" width="600" />
                        <h3 className="text-xl font-semibold text-gray-800 mt-4">
                            Software Development
                        </h3>
                        <p className="text-gray-600 mt-2">
                            Custom software solutions tailored to meet your business needs and drive growth.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg" data-aos="fade-up">
                        <img alt="Illustration of data analytics services" className="w-full h-40 object-cover rounded-t-lg" height="400" src="https://storage.googleapis.com/a1aa/image/yjb9xrfLnIQE-ZL6L-GDa1d6PmtCxS2_dxnw_AM9E2s.jpg" width="600" />
                        <h3 className="text-xl font-semibold text-gray-800 mt-4">
                            Data Analytics
                        </h3>
                        <p className="text-gray-600 mt-2">
                            Unlock valuable insights from your data to make informed business decisions.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg" data-aos="fade-up">
                        <img alt="Illustration of network management services" className="w-full h-40 object-cover rounded-t-lg" height="400" src="https://storage.googleapis.com/a1aa/image/Vlqilcof0mgRlpt7HZk_9D6sHdbWJh2XXnorLX6TLsQ.jpg" width="600" />
                        <h3 className="text-xl font-semibold text-gray-800 mt-4">
                            Network Management
                        </h3>
                        <p className="text-gray-600 mt-2">
                            Ensure the reliability and performance of your network with our management services.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OurServices
