import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import OurServices from '../components/OurServices'
import { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";

function Services() {
    useEffect(() => {
        AOS.init({ duration: 1300 });
        AOS.refresh();
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
            <main>
                <OurServices />
            </main>
            <Footer />
        </>
    )
}

export default Services
