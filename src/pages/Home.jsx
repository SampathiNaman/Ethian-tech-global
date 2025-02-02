import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

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
                <div className='flex flex-col justify-center items-center h-full' style={{ backgroundColor: 'rgba(18, 36, 71, 0.5)' }}>
                    <h1 className='text-white font-arial text-5xl md:text-6xl font-bold text-center'>Time to Grow!</h1>
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
