import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { NavLink } from "react-router-dom";
import WhyChooseUs from "../components/WhyChooseUs";
import Members from '../components/Members'
import OurServices from '../components/OurServices'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Home() {
    useEffect(() => {
        AOS.init({ duration: 1300 });
        AOS.refresh();
    }, []);

    return (
        <>
            <head>
                <title>Ethian Tech Global - Innovate Transform Accelerate</title>
                <meta name="description" content="Your IT Partner for a Digital Future, Tailored for your Growth." />
                <meta name="keywords" content="IT Consulting, Web Development, Mobile App Development, AI Solutions, Cloud Migration, DevOps, Product Consulting, UI/UX Design" />
                <meta property="og:title" content="Ethian Tech Global - Innovate Transform Accelerate" />
                <meta property="og:description" content="Your IT Partner for a Digital Future, Tailored for your Growth." />
                <meta property="og:image" content="landingPageImg.webp" />
                <meta property="og:url" content="https://www.ethiantechglobal.com" />
                <meta name="twitter:card" content="summary_large_image" />
            </head>

            <Navbar />
            <header className='bg-cover bg-no-repeat bg-center sm:w-full h-[70vh]' style={{ backgroundImage: "url('landing-page.webp')" }}>
                <div className='flex flex-col justify-center items-center h-full ' style={{ backgroundColor: 'rgba(18, 36, 71, 0.4)' }}>
                    <h1 className='text-white font-arial text-4xl md:text-6xl font-bold text-center '>Innovate Transform Accelerate</h1>
                    <p className="mt-4 px-4 text-lg md:text-xl font-open-sans text-gray-200 max-w-2xl text-center font-medium">Your IT Partner for a Digital Future, Tailored for your Growth.</p>
                    <NavLink to="/contact" className="self-start bg-[#D62A91] text-white text-base rounded-md hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-50 py-3 px-8 mx-auto relative top-20 shadow-2xl">
                        Get your free consultation
                    </NavLink>
                </div>
            </header>

            <main>
                <OurServices />
                <WhyChooseUs />
                <Members />
                <div className='w-11/12 sm:w-5/6 lg:w-4/5 max-w-screen-lg mx-auto my-8 px-6 pb-6 md:px-8 md:pb-12 flex flex-col items-center md:flex-row justify-center gap-8' data-aos="fade-up">
                    <p className='font-sans text-blue-900 text-lg md:text-xl space-y-1 font-semibold'>
                        Got a Tech Skill? Interested in a Career with us?
                    </p>
                    <NavLink to="/contact" className="self-left text-center bg-[#D62A91] text-white text-base rounded-md hover:bg-pink-600 active:scale-95 px-4 py-2 mb-1 md:mb-0 w-[100%] md:w-auto">
                        Join Us
                    </NavLink>
                </div>
            </main>

            <Footer />
        </>
    )
}

export default Home
