import { NavLink } from "react-router-dom";

function WhyChooseUs() {
  return (
    <section className="w-11/12 sm:w-5/6 lg:w-4/5 max-w-screen-lg mx-auto p-6 md:p-8">
      <div
        className="font-sans text-blue-900 text-2xl space-y-1"
        data-aos="fade-up"
      >
        <h2 className="tracking-wider">Why Choose Us</h2>
        <h2 className="font-bold tracking-wide">We Provide Your Best Work</h2>
      </div>

      <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-y-12 md:gap-x-16 mt-12 ">
        <div>
            <img
            src="expert-team.webp"
            alt="Expert Team"
            className="w-full lg:w-full md:mt-2 m-0 md:m-auto drop-shadow-[1px_10px_15px_rgba(18,36,71,0.4)]"
            data-aos="fade-up"
            />
        </div>
        <div data-aos="fade-up">
          <div className="space-y-5">
            <div className="font-sans">
              <h2 className="text-blue-900 text-xl font-bold tracking-wide">
                Expert Team
              </h2>
              <p className="text-base">
                seasoned professionals with proven track record
              </p>
            </div>
            <div className="font-sans">
              <h2 className="text-blue-900 text-xl font-bold tracking-wide">
                Scalable Solutions
              </h2>
              <p className="text-base">
                Future-proof IT services tailored to your growth.
              </p>
            </div>
            <div className="font-sans">
              <h2 className="text-blue-900 text-xl font-bold tracking-wide">
                Client-Centric Approach
              </h2>
              <p className="text-base">Your success drives our innovation.</p>
            </div>
            <div className="font-sans">
              <h2 className="text-blue-900 text-xl font-bold tracking-wide">
                End-to-End Services
              </h2>
              <p className="text-base">
                From strategy to execution, we handle it all.
              </p>
            </div>
            <div className="font-sans">
              <h2 className="text-blue-900 text-xl font-bold tracking-wide">
                Cutting-Edge Technology
              </h2>
              <p className="text-base">
                From Ai powered solutions to Data driven capabilities to IT
                advancements
              </p>
            </div>
            {/* <div className='font-sans' data-aos="zoom-in-up">
                <h2 className='text-blue-900 text-xl font-bold tracking-wide'>Security First</h2>
                <p className='text-base'>Robust cybersecurity and compliance measures.</p>
            </div>
            <div className='font-sans' data-aos="zoom-in-up">
                <h2 className='text-blue-900 text-xl font-bold tracking-wide'>Commitment to Excellence</h2>
                <p className='text-base'>Long-term partnerships, continuous innovation.</p>
            </div> */}
            <NavLink to="/contact" className="inline-block text-center bg-[#D62A91] text-white text-base rounded-md hover:bg-pink-600 active:scale-95 px-4 py-2" data-aos="fade-up">
              Partner with Us for Digital Transformation!
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
