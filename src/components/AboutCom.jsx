import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function AboutCom() {
    useEffect(() => {
            AOS.init({ duration: 1000 });
          });
    return (
        <div className='w-11/12 sm:w-5/6 lg:w-4/5 max-w-screen-lg grid lg:grid-cols-2 sm:grid-cols-1 gap-y-16 md:gap-x-8 mx-auto mt-12 p-6 md:p-8'>
            <div className='lg:hidden font-sans text-blue-900 text-2xl space-y-1' data-aos="fade-up">
                <h2 className='tracking-wider'>Our company</h2>
                <h2 className='font-bold tracking-wide'>Make the world a better place with us</h2>
            </div>
            <img src="about-us.png" alt="Expert Team" className='w-[75%] m-auto' data-aos="fade-up" />
            <div className='space-y-8' data-aos="fade-up">
                <div className='hidden lg:block font-sans text-blue-900 text-2xl space-y-1'>
                    <h2 className='tracking-wider'>Our company</h2>
                    <h2 className='font-bold tracking-wide'>Make the world a better place with us</h2>
                </div>
                <div className='space-y-5'>
                    <div className='font-sans'>
                        <h2 className='text-blue-900 text-xl font-bold tracking-wide'>Who We Are</h2>
                        <p className='text-base'>Empowering businesses with cutting-edge IT solutions. At Etheantech Global, we craft custom technology solutions to drive efficiency and innovation.</p>
                    </div>
                    <div className='font-sans'>
                        <h2 className='text-blue-900 text-xl font-bold tracking-wide'>Mission & Vision</h2>
                        <p className='text-base'>Our mission is to simplify technology and enable businesses to thrive in the digital era.</p>
                    </div>
                    <div className='font-sans'>
                        <h2 className='text-blue-900 text-xl font-bold tracking-wide'>Why Choose Us?</h2>
                        <p className='text-base'>Expert Team | Scalable Solutions |
                        Client-Centric Approach | Future-Ready Technology</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutCom
