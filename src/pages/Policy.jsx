import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PrivacyPolicy from '../components/PrivacyPolicy';
import AOS from "aos";
import "aos/dist/aos.css";

function Policy() {
    useEffect(() => {
        AOS.init({ duration: 1300 });
        AOS.refresh();
    }, []);

    return (
        <>
            <head>
                <title>Privacy Policy - Ethian Tech Global</title>
                <meta name="description" content="Learn about Ethian Tech Global's privacy policy and how we protect your personal information. Understand our data collection, usage, and protection practices." />
                <meta name="keywords" content="Privacy Policy, Data Protection, Personal Information, Ethian Tech Global, IT Consulting Privacy" />
                <meta property="og:title" content="Privacy Policy - Ethian Tech Global" />
                <meta property="og:description" content="Learn about Ethian Tech Global's privacy policy and how we protect your personal information. Understand our data collection, usage, and protection practices." />
                <meta property="og:image" content="privacy-policy.webp" />
                <meta property="og:url" content="https://www.ethiantechglobal.com/policy" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://www.ethiantechglobal.com/policy" />
            </head>
            <Navbar />
            <main>
                <PrivacyPolicy />
            </main>
            <Footer />
        </>
    );
}

export default Policy; 