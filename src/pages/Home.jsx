import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { NavLink } from "react-router-dom";
import Navbar from '../components/Navbar'
import OurServices from '../components/OurServices'
import Footer from '../components/Footer'
import Members from '../components/Members'
import WhyChooswUs from "../components/WhyChooswUs";

function Home() {
    useEffect(() => {
        AOS.init({ duration: 1300 });
      });
    return (
        <>
            <Navbar />

            <div className='bg-[url(landingPageImg.jpg)] bg-cover bg-no-repeat bg-center sm:w-full h-[70vh]' style={{ backgroundImage: "url('landingPageImg.jpg')" }}>
                <div className='flex flex-col justify-center items-center h-full ' style={{ backgroundColor: 'rgba(18, 36, 71, 0.5)' }}>
                    <h1 className='text-white font-arial text-5xl md:text-6xl font-bold text-center'>Welcome to the Ethian Tech</h1>
                    {/* <p className="text-xl text-white mt-4 font-medium">Dive into our world and discover what makes us tick </p> */}
                
                    <NavLink to="/contact" className="self-start bg-[#D62A91] text-white text-base rounded-md hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-50 py-3 px-8 mx-auto relative top-20 shadow-2xl">
                        Contact Us
                    </NavLink>
                </div>
            </div>

            <OurServices />
            <WhyChooswUs />
            <Members />

            <Footer />
        </>
    )
}

export default Home
