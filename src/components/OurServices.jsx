import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Autoplay, Navigation } from "swiper/modules";

const services = [
  {
    title: "Cloud Computing",
    desc: "Leverage the power of cloud computing to enhance your business operations and scalability.",
    img: "https://storage.googleapis.com/a1aa/image/smv91j3E6shuEZP75cs87e-UXUZYaDDBlaOjHpfI7i4.jpg",
  },
  {
    title: "Cybersecurity",
    desc: "Protect your business from cyber threats with our comprehensive cybersecurity solutions.",
    img: "https://storage.googleapis.com/a1aa/image/YzWiArSy8jY3W2DM4AgsTacxHjXgpYYiV5XSrxn1NGE.jpg",
  },
  {
    title: "IT Consulting",
    desc: "Get expert advice and strategies to optimize your IT infrastructure and operations.",
    img: "https://storage.googleapis.com/a1aa/image/9a2-yoYLl-glPZZUm5yK9xATEm7aqi5WKCu8tvuS4q8.jpg",
  },
  {
    title: "Software Development",
    desc: "Custom software solutions tailored to meet your business needs and drive growth.",
    img: "https://storage.googleapis.com/a1aa/image/RoulZ--n9HTWaP6_XDAY-Zb-C8w7DZL_OxMGj2KJXu0.jpg",
  },
  {
    title: "Data Analytics",
    desc: "Unlock valuable insights from your data to make informed business decisions.",
    img: "https://storage.googleapis.com/a1aa/image/yjb9xrfLnIQE-ZL6L-GDa1d6PmtCxS2_dxnw_AM9E2s.jpg",
  },
  {
    title: "Network Management",
    desc: "Ensure the reliability and performance of your network with our management services.",
    img: "https://storage.googleapis.com/a1aa/image/Vlqilcof0mgRlpt7HZk_9D6sHdbWJh2XXnorLX6TLsQ.jpg",
  },
];

function OurServices() {
  useEffect(() => {
    AOS.init({ duration: 1300 });
  }, []);

  return (
    <section className="w-11/12 sm:w-5/6 lg:w-4/5 max-w-screen-lg mx-auto my-12 p-6 md:p-8 relative">
      <div className="container mx-auto px-4">
        <div className='font-sans text-blue-900 text-2xl space-y-1' data-aos="fade-up">
          <h2 className='tracking-wider'>Better Future</h2>
          <h2 className='font-bold tracking-wide'>Explore Our Services</h2>
        </div>
        <div className="relative mt-8">
          <Swiper
            spaceBetween={20}
            slidesPerView={1.5}
            breakpoints={{
              1024: { slidesPerView: 3, navigation: true },
            }}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: true }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            modules={[Autoplay, Navigation]}
            className="mt-8"
          >
            {services.map((service, index) => (
              <SwiperSlide key={index} className="flex justify-center">
                <div className="bg-white p-4 rounded-lg shadow-lg max-w-xs">
                  <img
                    alt={service.title}
                    className="w-full h-40 object-cover rounded-t-lg"
                    src={service.img}
                  />
                  <h3 className="text-xl font-semibold text-gray-800 mt-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mt-2">{service.desc}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="hidden md:flex absolute left-[-40px] top-1/2 transform -translate-y-1/2 swiper-button-prev text-gray-600 hover:text-gray-800"></div>
          <div className="hidden md:flex absolute right-[-40px] top-1/2 transform -translate-y-1/2 swiper-button-next text-gray-600 hover:text-gray-800"></div>
        </div>
      </div>
    </section>
  );
}

export default OurServices;
