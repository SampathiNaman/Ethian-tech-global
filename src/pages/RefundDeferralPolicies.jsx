import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RefundDeferralPolicies from '../components/RefundDeferralPolicies';
import AOS from "aos";
import "aos/dist/aos.css";

function RefundDeferralPoliciesPage() {
    useEffect(() => {
        AOS.init({ duration: 1300 });
        AOS.refresh();
    }, []);

    return (
        <>
            <head>
                <title>Refund & Deferral Policy - Ethian Tech Global</title>
                <meta name="description" content="Learn about Ethian Tech Global's refund and deferral policies for our training courses. Understand eligibility, processes, and timelines for refunds and course deferrals." />
                <meta name="keywords" content="Refund Policy, Deferral Policy, Course Refund, Training Refund, Course Deferral, Ethian Tech Global Policies" />
                <meta property="og:title" content="Refund & Deferral Policy - Ethian Tech Global" />
                <meta property="og:description" content="Learn about Ethian Tech Global's refund and deferral policies for our training courses. Understand eligibility, processes, and timelines for refunds and course deferrals." />
                <meta property="og:image" content="policy-document.webp" />
                <meta property="og:url" content="https://www.ethiantechglobal.com/refund-deferral-policies" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://www.ethiantechglobal.com/refund-deferral-policies" />
            </head>
            <Navbar />
            <main>
                <RefundDeferralPolicies />
            </main>
            <Footer />
        </>
    );
}

export default RefundDeferralPoliciesPage; 