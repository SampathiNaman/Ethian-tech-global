import { useRef, useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import OurCourses from '../components/OurCourses';
import AOS from "aos";
import "aos/dist/aos.css";

function Training() {
    const navigate = useNavigate();

    // Initialize AOS for animations
    useEffect(() => {
        AOS.init({ duration: 1300 }); // Initialize AOS with a consistent duration
        AOS.refresh(); // Refresh AOS to pick up elements after navigation
    }, []);

    return (
        <>
        <head>
            <title>Our Services - Ethian Tech Global</title>
            <meta name="description" content="Discover the range of services offered by Ethian Tech Global. From IT consulting to web development, we provide comprehensive solutions for your business." />
            <meta name="keywords" content="Ethian Tech Global Services, IT Consulting, Web Development, Mobile App Development, AI Solutions, Cloud Migration, DevOps, Product Consulting, UI/UX Design" />
            <meta property="og:title" content="Our Services - Ethian Tech Global" />
            <meta property="og:description" content="Discover the range of services offered by Ethian Tech Global. From IT consulting to web development, we provide comprehensive solutions for your business." />
            <meta property="og:image" content="services-image.webp" />
            <meta property="og:url" content="https://www.ethiantechglobal.com/services" />
            <meta name="twitter:card" content="summary_large_image" />
        </head>
        <Navbar />
        <main className="main-content">
                <OurCourses />
            </main>
        <Footer />
    </>
    );
}

export default Training;
