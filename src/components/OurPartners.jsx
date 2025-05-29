import React from 'react'

function OurPartners() {
    return (
        <section className="w-11/12 sm:w-5/6 lg:w-4/5 max-w-screen-lg mx-auto my-6 p-6 md:p-8">
            <div className="font-sans text-blue-900 text-2xl space-y-1" data-aos="fade-up">
                {/* <h2 className="tracking-wider">Our Partners</h2> */}
                <h2 className="tracking-wider">Our Partners</h2>
            </div>
            <div className="flex flex-wrap justify-center md:justify-left items-center my-6" data-aos="fade-up">

                <div className="w-[50%] md:w-[20%] h-auto p-2 mx-8">
                    <a href='https://www.rasbyte.com/' target='_blank'><img src="Partner1.jpg" alt="Our Partners" className="h-auto" width={200} data-aos="fade-up" /></a>
                </div>
                <div className="w-[50%] md:w-[20%] h-auto p-4 mx-8">
                    <a href='https://www.ikites.ai/' target='_blank'><img src="Kites.avif" alt="Our Partners" className="h-auto" width={200} data-aos="fade-up" /></a>
                </div>
                {/* <div className="w-[50%] md:w-[20%] h-auto">
                    <a href='https://www.rasbyte.com/' target='_blank'><img src="Partner1.webp" alt="Our Partners" className="h-auto" width={200} data-aos="fade-up" /></a>
                </div> */}

            </div>
        </section>
    )
}

export default OurPartners
