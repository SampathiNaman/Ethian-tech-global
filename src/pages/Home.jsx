import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SectionWrapper from '../components/SectionWrapper'
import ServiceCard from '../components/ServiceCard'
import Members from '../components/Members'
// import TestimonialCard from '../components/TestimonialCard'

let data = []
// let testimonialData = []

for (let i = 0; i < 6; i++) {
    data.push({
        id: i + 1,
        img: {
            url: "",
            alt: "Image " + (i + 1).toString(),
        },
        title: "Our Service",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat itaque veritatis quis nobis. Quisquam inventore amet vitae corporis ducimus id optio enim odio blanditiis architecto! Dolor molestiae minus asperiores. Tempora."
    })

    // testimonialData.push({
    //     id: i+1,
    //     rating: Math.ceil(Math.random()*5),
    //     img: {
    //         url: "",
    //         alt: "Image "+(i+1).toString(),
    //     },
    //     name: "Employee",
    //     content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat itaque veritatis quis nobis. Quisquam inventore amet vitae corporis ducimus id optio enim odio blanditiis architecto! Dolor molestiae minus asperiores. Tempora."
    // })
}

function Home() {
    useEffect(() => {
        AOS.init({ duration: 1300 });
      });
    return (
        <>
            <Navbar />


            <div className='bg-[url(landingPageImg.jpg)] bg-cover bg-no-repeat bg-center sm:w-full h-[70vh] '>
                <div className='flex flex-col justify-center items-center h-full' style={{ backgroundColor: 'rgba(18, 36, 71, 0.5)' }}>
                    <h1 className='text-white font-arial text-5xl md:text-6xl font-bold text-center'>Time to Grow!</h1>
                </div>
            </div>
            <SectionWrapper title1="Better Future" title2="Explore Our Services" containerStyles='border border-neutral-400'>
                <div className="w-11/12 grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 mx-auto mt-10" data-aos="fade-up">
                    {data.map(service => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
                </div>
            </SectionWrapper>
            <div className='w-11/12 sm:w-5/6 lg:w-4/5 max-w-screen-lg grid lg:grid-cols-2 sm:grid-cols-1 gap-y-16 md:gap-x-8 mx-auto mt-12 p-6 md:p-8'>
                <div className='lg:hidden font-sans text-blue-900 text-2xl space-y-1' data-aos="fade-up">
                    <h2 className='tracking-wider'>Why Choose Us</h2>
                    <h2 className='font-bold tracking-wide'>We Provide Your Best WOrk</h2>
                </div>
                <img src="expertTeamImg.png" alt="Expert Team" className='w-4/5 lg:w-full m-auto' data-aos="fade-up" />
                <div className='space-y-8'>
                    <div className='hidden lg:block font-sans text-blue-900 text-2xl space-y-1' data-aos="fade-up">
                        <h2 className='tracking-wider'>Why Choose Us</h2>
                        <h2 className='font-bold tracking-wide'>We Provide Your Best WOrk</h2>
                    </div>
                    <div className='space-y-5'>
                        <div className='font-sans' data-aos="flip-down">
                            <h2 className='text-blue-900 text-xl font-bold tracking-wide'>Expert Team</h2>
                            <p className='text-base'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat itaque veritatis quis nobis. Quisquam inventore amet vitae corporis ducimus id optio enim odio blanditiis architecto! Dolor molestiae minus asperiores. Tempora.</p>
                        </div>
                        <div className='font-sans' data-aos="flip-down">
                            <h2 className='text-blue-900 text-xl font-bold tracking-wide'>Expert Team</h2>
                            <p className='text-base'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat itaque veritatis quis nobis. Quisquam inventore amet vitae corporis ducimus id optio enim odio blanditiis architecto! Dolor molestiae minus asperiores. Tempora.</p>
                        </div>
                        <div className='font-sans' data-aos="flip-down">
                            <h2 className='text-blue-900 text-xl font-bold tracking-wide'>Expert Team</h2>
                            <p className='text-base'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat itaque veritatis quis nobis. Quisquam inventore amet vitae corporis ducimus id optio enim odio blanditiis architecto! Dolor molestiae minus asperiores. Tempora.</p>
                        </div>
                    </div>
                </div>
            </div>


            {/* <SectionWrapper title1="Testimonials" title2="What Our Clients Say" containerStyles='border border-neutral-400'>
                <div className="w-11/12 grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 mx-auto mt-10">
                {testimonialData.map(testimonial => (
                    <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                ))}
                </div>
            </SectionWrapper> */}

            <Members />

            <Footer />
        </>
    )
}

export default Home
