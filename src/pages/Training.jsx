import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import StripePayment from '../components/StripePayment'
import { toast } from 'react-hot-toast'

function Training() {
    const [showPayment, setShowPayment] = useState(false);

    const handlePaymentSuccess = (paymentMethod) => {
        toast.success('Payment successful!');
        setShowPayment(false);
        // Here you would typically send the paymentMethod.id to your backend
        // to complete the payment process
    };

    const handlePaymentError = (error) => {
        toast.error(error);
    };

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
        <div className='flex flex-col items-center justify-center my-16 p-4'>
            <h1 className='text-4xl font-bold'>Training</h1>
            <p className='text-lg mt-4'>We offer a variety of training programs to help you enhance your skills.</p>
            <p className='text-lg my-2 '>Our training programs are designed to be flexible and convenient for you.</p>
            
            {!showPayment ? (
                <button 
                    onClick={() => setShowPayment(true)}
                    className='border-2 rounded-md bg-green-300 px-3 py-2 my-8 hover:bg-green-400'
                >
                    Pay $750
                </button>
            ) : (
                <StripePayment 
                    amount={750}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                />
            )}
            
            <p className='text-lg mt-2'>We accept all major credit cards.</p>
        </div>
        </main>
        <Footer />
    </>
    )
}

export default Training
