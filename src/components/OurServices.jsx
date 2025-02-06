import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const services = [
  {
    title: "IT Consulting",
    desc: "Strategic technology guidance to align IT with business goals.",
    points: ["IT strategy & roadmap", "Digital transformation consulting", "Enterprise architecture solutions"],
    btnText: "Get a Free IT Strategy Call!",
    img: "https://storage.googleapis.com/a1aa/image/smv91j3E6shuEZP75cs87e-UXUZYaDDBlaOjHpfI7i4.jpg",
  },
  {
    title: "Web Development",
    desc: "High-performing, scalable websites designed for growth.",
    points: ["Custom web development", "E-commerce solutions", "Web Hosting"],
    btnText: "Get your websites!",
    img: "https://storage.googleapis.com/a1aa/image/YzWiArSy8jY3W2DM4AgsTacxHjXgpYYiV5XSrxn1NGE.jpg",
  },
  {
    title: "Mobile App Development",
    desc: "Android & iOS apps built for seamless user experiences.",
    points: ["Native & cross-platform apps", "Enterprise mobility solutions", "App UI/UX design"],
    btnText: "Let's Create Your App!",
    img: "https://storage.googleapis.com/a1aa/image/9a2-yoYLl-glPZZUm5yK9xATEm7aqi5WKCu8tvuS4q8.jpg",
  },
  {
    title: "Gen Al & ML Solutions",
    desc: "Leverage AI-driven insights for smarter decision-making.",
    points: ["Predictive analytics", "AI-powered automation", "NLP & computer vision"],
    btnText: "Explore AI solutions!",
    img: "https://storage.googleapis.com/a1aa/image/RoulZ--n9HTWaP6_XDAY-Zb-C8w7DZL_OxMGj2KJXu0.jpg",
  },
  {
    title: "Cloud Migration & Infrastructure Services",
    desc: "Secure, seamless migration to AWS, Azure, or Google Cloud.",
    points: ["Cloud migration & optimization", "Serverless computing", "DevOps automation"],
    btnText: "Migrate to Cloud!",
    img: "https://storage.googleapis.com/a1aa/image/yjb9xrfLnIQE-ZL6L-GDa1d6PmtCxS2_dxnw_AM9E2s.jpg",
  },
  {
    title: "DevOps & Infrastructure Management",
    desc: "Automate development pipelines for faster, reliable releases.",
    points: ["CI/CD pipeline", "Infrastructure as Code (laC)", "Kubernetes | containerization"],
    btnText: "Accelerate DevOps Journey!",
    img: "https://storage.googleapis.com/a1aa/image/Vlqilcof0mgRlpt7HZk_9D6sHdbWJh2XXnorLX6TLsQ.jpg",
  },
    {
        title: "Product Consulting",
        desc: "From idea to execution, we help you build the right product.",
        points: ["Product strategy & roadmap", "MVP development", "Market research & feasibility"],
        btnText: "Turn Your Idea into Reality!",
        img: "https://storage.googleapis.com/a1aa/image/9a2-yoYLl-glPZZUm5yK9xATEm7aqi5WKCu8tvuS4q8.jpg",
    },
    {
        title: "UI/UX Design",
        desc: "Craft intuitive, user-friendly digital experiences.",
        points: ["UX research & wireframing", "UI prototyping & interaction design", "Design systems & branding"],
        btnText: "Design a Stunning experience!",
        img: "https://storage.googleapis.com/a1aa/image/RoulZ--n9HTWaP6_XDAY-Zb-C8w7DZL_OxMGj2KJXu0.jpg",
    },
];

function OurServices() {
  useEffect(() => {
    AOS.init({ duration: 1300 });
  }, []);

  return (
    <section className="w-[100%] md:w-11/12 sm:w-5/6 lg:w-4/5 max-w-screen-lg mx-auto my-12 p-6 md:p-8 relative">
      <div className="container mx-auto px-4">
        <div className='font-sans text-blue-900 text-2xl space-y-1' data-aos="fade-up">
          <h2 className='tracking-wider'>Better Future</h2>
          <h2 className='font-bold tracking-wide'>Explore Our Services</h2>
        </div>
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
            autoplay={{ delay: 2000, disableOnInteraction: true }}
            pagination={{ clickable: true }}
            modules={[Pagination, Autoplay]}
            className="mt-8"
          >
            {services.map((service, index) => (
              <SwiperSlide key={index} className="flex justify-center">
                <div className="bg-white p-2 md:p-4 mb-12 rounded-lg shadow-lg max-w-xs min-h-[450px] md:min-h-[450px] flex flex-col justify-between" data-aos="fade-up">
                  <div>
                    <img
                      alt={service.title}
                      className="w-full h-40 object-cover rounded-t-lg"
                      src={service.img}
                    />
                    <h3 className="text-xl font-semibold text-gray-800 mt-4">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-2">{service.desc}</p>
                    <ul className="list-image-[url(bullet.png)] text-sm  text-gray-600 ms-6 mt-4">
                      {service.points && service.points.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <NavLink to="/contact" className="self-left text-center bg-[#D62A91] text-white text-base rounded-md hover:bg-pink-600 active:scale-95 px-4 py-2 mb-1 md:mb-0">
                    {service.btnText}
                  </NavLink>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default OurServices;


