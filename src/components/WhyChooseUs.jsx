function WhyChooseUs() {
  return (
    <>
    <div className="w-11/12 sm:w-5/6 lg:w-4/5 max-w-screen-lg mx-auto p-6 md:p-8">
      <div
        className="font-sans text-blue-900 text-2xl space-y-1"
        data-aos="fade-up"
      >
        <h2 className="tracking-wider">Why Choose Us</h2>
        <h2 className="font-bold tracking-wide">We Provide Your Best WOrk</h2>
      </div>

      <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-y-12 md:gap-x-16 mt-12 ">
        <div>
            <img
            src="expertTeamImg.png"
            alt="Expert Team"
            className="w-4/5 lg:w-full md:mt-2 m-auto"
            data-aos="fade-up"
            />
        </div>
        <div className="space-y-8">
          <div className="space-y-5" data-aos="fade-up">
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
            <button
              type="button"
              className="bg-pink-500 text-white text-base rounded-md hover:bg-pink-600 active:scale-95 px-6 py-3 mt-3"
            >
              Partner with Us for Digital Transformation!
            </button>
          </div>
        </div>
      </div>
    </div>

    </>
  );
}

export default WhyChooseUs;
