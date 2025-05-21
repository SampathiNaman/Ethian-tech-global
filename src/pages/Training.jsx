import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'


function Training() {

    const navigate = useNavigate();

    const handlePayment = () => {
        navigate('/payment', { state: { amount: 750, currency: 'usd', service: 'training',  description: 'Ethian Tech Training Program'} });
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
        <main className="main-content">
                <div className='flex flex-col items-center justify-center my-16 p-4'>
                    <h1 className='text-4xl font-bold'>Training</h1>
                    <p className='text-lg mt-4'>We offer a variety of training programs to help you enhance your skills.</p>
                    <p className='text-lg my-2'>Our training programs are designed to be flexible and convenient for you.</p>

                    {/* Payment Section */}
                    <div className="payment-section w-full max-w-md">

                        {/* Payment Controls */}
                        <button 
                            onClick={() => handlePayment()}
                            className='payment-button border-2 rounded-md bg-green-300 px-3 py-2 my-8 hover:bg-green-400 disabled:opacity-50'
                        >
                            Pay $750
                        </button>
                    </div>
                </div>
            </main>
        <Footer />
    </>
    )
}

export default Training
