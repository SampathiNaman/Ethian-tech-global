import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { NavLink } from "react-router-dom";
import Navbar from '../components/Navbar'
import OurServices from '../components/OurServices'
import Footer from '../components/Footer'
import Members from '../components/Members'
import WhyChooseUs from "../components/WhyChooseUs";

function Home() {
    useEffect(() => {
        AOS.init({ duration: 1300 });
      });
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
                    <h1 className='text-white font-arial text-4xl md:text-6xl font-bold text-center'>Innovate Transform Accelerate</h1>
                    <p className="text-xl md:text-2xl text-white mt-4 text-center font-medium">Your IT Partner for a Digital Future, Tailored for your Growth.</p>
                    <NavLink to="/contact" className="self-start bg-[#D62A91] text-white text-base rounded-md hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-50 py-3 px-8 mx-auto relative top-20 shadow-2xl">
                    Get your free consultation
                    </NavLink>
                </div>
            </header>

            <main>
                <OurServices />
                <WhyChooseUs />
                <Members />
            </main>

            <Footer />
        </>
    )
}

export default Home
