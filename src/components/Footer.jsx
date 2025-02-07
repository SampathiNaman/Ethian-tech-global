import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import { toast } from 'react-hot-toast'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faLocationDot, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faYoutube, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    const [subscribing, setSubscribing] = useState(false);
    const [error, setError] = useState("");

    const sendMsgToEmail = (e) => {
        e.preventDefault();
        setSubscribing(true);
        emailjs.sendForm(import.meta.env.VITE_SUBSCRIBE_SERVICE_ID, import.meta.env.VITE_SUBSCRIBE_TEMPLATE_ID, e.target, {
            publicKey: import.meta.env.VITE_SUBSCRIBE_PUBLIC_KEY,
        })
        .then(() => {
            e.target.reset();
            toast('Subscribed', {
                style: {color: 'green'},
                icon: '✅',

            });
        })
        .catch(() => {
            toast('Unable to subscribe. Please try again!', {
                style: {color: 'red'},
                icon: '❌',
              });
        })
        .finally(() => {
            setSubscribing(false);
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const error = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.email.value) ? "Enter a valid email address" : "";
        setError(error);
        if (!error) {
            sendMsgToEmail(e);
        }
    };

    return (
        <>
        <footer className="bg-[#1A3261] text-white font-sans ">
            {/* absolute bottom-0 w-full */}
            <div className="container w-[90vw] mx-auto py-10 px-5">
                <div className="flex justify-between items-center gap-8 flex-wrap md:flex-row md:justify-between">

                    {/* <div className="flex flex-col md:flex-row md:space-x-20"> */}
                    <div className="mb-10 md:mb-0">
                        <h2 className="text-xl font-bold mb-3">Important Links</h2>
                        <ul className="list-none list-inside pl-1">
                            <li className='cursor-pointer hover:underline p-1'>
                                <FontAwesomeIcon icon={faArrowRight} className='text-lg mr-4' />
                                <NavLink to="/">Home</NavLink>
                            </li>
                            <li className='cursor-pointer hover:underline  p-1'>
                                <FontAwesomeIcon icon={faArrowRight} className='text-lg mr-4' />
                                <NavLink to="/about">About</NavLink>
                            </li>
                            <li className='cursor-pointer hover:underline  p-1'>
                                <FontAwesomeIcon icon={faArrowRight} className='text-lg mr-4' />
                                <NavLink to="/products">Products</NavLink>
                            </li>
                            <li className='cursor-pointer hover:underline  p-1'>
                                <FontAwesomeIcon icon={faArrowRight} className='text-lg mr-4' />
                                <NavLink to="/services">Services</NavLink>
                            </li>
                            <li className='cursor-pointer hover:underline  p-1'>
                                <FontAwesomeIcon icon={faArrowRight} className='text-lg mr-4' />
                                <NavLink to="/contact">Contact</NavLink>
                            </li>
                        </ul>
                    </div>

                    <div className="mb-10 md:mb-0">
                        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center w-full">
                            <h2 className="text-xl font-bold mb-3">Subscribe to our newsletter</h2>
                            <p className="text-sm text-white/80 text-center">The latest news, articles, and resources, sent to your inbox weekly.</p>
                            <div className="flex items-center gap-2 pt-4">
                                <input className="border text-black placeholder-gray-500  outline-none w-56 md:w-80 h-9 rounded py-2 px-3 text-sm" type="email" id="email" name="email" placeholder="Enter your email" />
                                <button type="submit" disabled={subscribing} className="self-start bg-[#D62A91] text-white text-sm rounded-md hover:bg-pink-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 py-2 px-3">{subscribing ? "Subscribing..." : "Subscribe"}</button>
                            </div>
                            {error && <p className="text-red-500 text-sm italic mt-2">{error}</p>}
                        </form>
                    </div>

                    <div className=" mb-10 md:mb-0">
                        <h2 className="text-xl font-bold mb-3">Get in Touch</h2>
                        {/* <div>
                            <NavLink to={"/"}><img className='w-40 sm:text-center' src="logo.png" alt="Error in loading" /></NavLink>
                        </div> */}
                        <div className="mt-5">
                            <div className="flex items-center md:justify-start mb-2">
                                <FontAwesomeIcon icon={faLocationDot} className='text-xl mr-4' />
                                <span>Patna University Campus,  <br></br>Patna, Bihar 800005</span>
                            </div>
                            <div className="flex items-center md:justify-start mb-2">
                                <FontAwesomeIcon icon={faPhone} className='text-xl mr-4' />
                                <span>4461237866</span>
                            </div>
                            <div className="flex items-center md:justify-start">
                                <FontAwesomeIcon icon={faEnvelope} className='text-xl mr-4' />
                                <a href="mailto:mail@ethiantech.com">mail@ethiantech.com</a>
                            </div>
                        </div>
                    </div>
                    {/* </div> */}
                </div>


                <div className="border-t border-gray-400 mt-10 pt-5">
                    <div className="flex flex-col md:flex-row md:justify-between items-center">
                        <div className="text-center md:text-left mb-5 md:mb-0">
                            <a href="#" className="text-sm text-gray-300 mr-5">Privacy Policy</a>
                            <a href="#" className="text-sm text-gray-300">Terms of Service</a>
                        </div>
                        <div className="text-center md:text-left mb-5 md:mb-0">
                            <p className="text-sm text-gray-300">© 2025. Ethian Tech. Ltd. All rights reserved.</p>
                        </div>
                        <div className="flex space-x-5">
                            <a href="#" className="text-gray-300 text-2xl hover:text-[#D62A91] hover:scale-125 ease-in-out duration-200"><FontAwesomeIcon icon={faFacebook} className='text-2xl' /></a>
                            <a href="#" className="text-gray-300 text-2xl hover:text-[#D62A91] hover:scale-125 ease-in-out duration-200"><FontAwesomeIcon icon={faYoutube} className='text-2xl' /></a>
                            <a href="#" className="text-gray-300 text-2xl hover:text-[#D62A91] hover:scale-125 ease-in-out duration-200"><FontAwesomeIcon icon={faTwitter} className='text-2xl' /></a>
                            <a href="#" className="text-gray-300 text-2xl hover:text-[#D62A91] hover:scale-125 ease-in-out duration-200"><FontAwesomeIcon icon={faLinkedin} className='text-2xl' /></a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        </>
    )
}

export default Footer
