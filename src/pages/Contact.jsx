import Navbar from '../components/Navbar'

import Footer from '../components/Footer'
import ContactSec from '../components/ContactSec'
import { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";

function Contact() {
    useEffect(() => {
        AOS.init({ duration: 1300 });
        AOS.refresh();
    }, []);
    return (
        <>
            <head>
                <title>Contact Us - Ethian Tech Global</title>
                <meta name="description" content="Get in touch with Ethian Tech Global for your IT solutions. Contact us for consultations, support, and more." />
                <meta name="keywords" content="Contact Ethian Tech Global, IT Solutions, Consultation, Support" />
                <meta property="og:title" content="Contact Us - Ethian Tech Global" />
                <meta property="og:description" content="Get in touch with Ethian Tech Global for your IT solutions. Contact us for consultations, support, and more." />
                <meta property="og:image" content="contact-us.webp" />
                <meta property="og:url" content="https://www.ethiantechglobal.com/contact" />
                <meta name="twitter:card" content="summary_large_image" />
            </head>
            <Navbar />
            <main>
                <ContactSec />
            </main>
            <Footer />
        </>
    )
}

export default Contact
