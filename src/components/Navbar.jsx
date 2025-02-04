import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faXmark , faBars, faAddressCard, faToolbox, faScrewdriverWrench, faPhone, faEnvelope} from '@fortawesome/free-solid-svg-icons';

function Navbar() {
    const [menu, setMenu] = useState(false);

    // Toggle menu visibility
    function toggleMenu() {
        setMenu((prevState) => !prevState);
    }

    return (
        <nav className="bg-[#122447] sticky top-0 text-white font-medium shadow-xl z-10">
            <div className="p-2 flex items-center w-[95%] mx-auto ">
                {/* Logo */}
                <div className="text-center md:mx-10 md:basis-1/3">
                    <NavLink to="/">
                        <img className="w-28 md:w-24" src="logo.png" alt="Error in loading" />
                    </NavLink>
                </div>

                {/* Menu Items */}
                <div
                    className={`flex flex-col fixed top-0 right-0 bg-white text-black h-full w-[80%] transform ${menu ? 'translate-x-0' : 'translate-x-full'
                        } transition-transform duration-300 ease-in-out md:relative md:transform-none md:flex md:flex-row md:space-x-4 md:basis-2/3 md:justify-center md:gap-10 md:bg-[#122447]`}
                >
                    {/* Close Button */}
                    <div
                        className="text-2xl px-4 py-2 text-black md:hidden focus:outline-none cursor-pointer"
                        
                    >
                        
                        <div className='p-4' onClick={toggleMenu}>
                            <FontAwesomeIcon icon={faXmark}/>
                        </div>
                    
                        
                    </div>
                    <NavLink
                        className={({ isActive }) =>
                            `mx-3 ${isActive ? 'text-[#D62A91]' : 'md:text-white'} hover:text-[#D62A91] text-center py-2 my-1 border rounded-md border-black md:py-0 md:border-none  md:my-0 shadow-lg md:shadow-none`
                        }
                        to="/"
                        onClick={() => setMenu(false)}
                    >
                        <FontAwesomeIcon icon={faHouse} className='mx-2'/>
                        Home
                    </NavLink>
                    
                    <NavLink
                        className={({ isActive }) =>
                            `mx-3 ${isActive ? 'text-[#D62A91]' : 'md:text-white'} hover:text-[#D62A91] text-center py-2 my-1 border rounded-md border-black md:py-0 md:border-none  md:my-0 shadow-lg md:shadow-none`
                        }
                        to="/about"
                        onClick={() => setMenu(false)}
                    >
                        <FontAwesomeIcon icon={faAddressCard} className='mx-2'/>
                        About
                    </NavLink>


                    <NavLink
                        className={({ isActive }) =>
                            `mx-3 ${isActive ? 'text-[#D62A91]' : 'md:text-white'} hover:text-[#D62A91] text-center py-2 my-1 border rounded-md border-black md:py-0 md:border-none  md:my-0 shadow-lg md:shadow-none`
                        }
                        to="/products"
                        onClick={() => setMenu(false)}
                    >
                        <FontAwesomeIcon icon={faToolbox} className='mx-2'/>
                        Products
                    </NavLink>


                    <NavLink
                        className={({ isActive }) =>
                            `mx-3 ${isActive ? 'text-[#D62A91]' : 'md:text-white'} hover:text-[#D62A91] text-center py-2 my-1 border rounded-md border-black md:py-0 md:border-none  md:my-0 shadow-lg md:shadow-none`
                        }
                        to="/services"
                        onClick={() => setMenu(false)}
                    >
                        
                        <FontAwesomeIcon icon={faScrewdriverWrench} className='mx-2'/>
                        Services
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            `mx-3 ${isActive ? 'text-[#D62A91]' : 'md:text-white'} hover:text-[#D62A91] text-center py-2 my-1 border rounded-md border-black md:py-0 md:border-none  md:my-0 shadow-lg md:shadow-none`
                        }
                        to="/contact"
                        onClick={() => setMenu(false)}
                    >
                        <FontAwesomeIcon icon={faPhone} className='mx-2'/>
                        Contact
                    </NavLink>


                    <hr className="md:hidden " style={{ width: "90%", border: "1px solid gray", borderRadius: "5px" , margin: "60px auto 0"}} />

                    

                    <div className=" mt-8 text-black text-2xl flex flex-col items-center md:hidden">
                        <div>
                            <NavLink to={"/"}><img className='w-40 sm:text-center' src="logo.png" alt="Error in loading" /></NavLink>
                        </div>
                        <div className="mt-5">
                            <div className="flex items-center md:justify-start mb-2">
                                <FontAwesomeIcon icon={faPhone} className='text-2xl mr-4'/>
                                <span className="text-lg">4461237866</span>
                            </div>
                            <div className="flex items-center md:justify-start">
                                <FontAwesomeIcon icon={faEnvelope} className='text-2xl mr-4'/>
                                <a href="mailto:mail@ethiantech.com" className="text-lg underline">mail@ethiantech.com</a>
                            </div>
                        </div>
                    </div>

                    <NavLink to="/contact" className="self-start bg-[#D62A91] text-white text-base rounded-md hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-50 py-3 px-8 mx-auto relative bottom-[-30px] md:hidden shadow-xl">
                                            Contact Us
                                        </NavLink>
            
                </div>

                {/* Hamburger Icon */}
                <div
                    className={`md:hidden absolute right-0 p-8 focus:outline-none text-white text-4xl cursor-pointer ${menu ? 'hidden' : ''}`}
                    onClick={toggleMenu}
                >
                    <FontAwesomeIcon icon={faBars} />
                </div>

                
            </div>
        </nav>
    );
}

export default Navbar;
