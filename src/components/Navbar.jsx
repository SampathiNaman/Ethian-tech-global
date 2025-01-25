import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
    const [menu, setMenu] = useState(false);

    // Toggle menu visibility
    function toggleMenu() {
        setMenu((prevState) => !prevState);
    }

    return (
        <nav className="bg-[#122447] sticky top-0 text-white font-medium shadow-xl z-10">
            <div className="p-6 flex items-center w-[95%] mx-auto ">
                {/* Logo */}
                <div className="text-center md:mx-10 md:basis-1/3">
                    <NavLink to="/">
                        <img className="w-40" src="logo.png" alt="Error in loading" />
                    </NavLink>
                </div>

                {/* Menu Items */}
                <div
                    className={`flex flex-col fixed top-0 right-0 bg-white text-black h-full w-[80%] transform ${menu ? 'translate-x-0' : 'translate-x-full'
                        } transition-transform duration-300 ease-in-out md:relative md:transform-none md:flex md:flex-row md:space-x-4 md:basis-2/3 md:justify-center md:gap-10 md:bg-[#122447]`}
                >
                    {/* Close Button */}
                    <div
                        className="text-2xl p-8 text-black md:hidden focus:outline-none cursor-pointer"
                        onClick={toggleMenu}
                    >
                        X
                    </div>
                    <NavLink
                        className={({ isActive }) =>
                            `mx-3 ${isActive ? 'text-[#D62A91]' : 'md:text-white'} hover:text-[#D62A91]`
                        }
                        to="/"
                        onClick={() => setMenu(false)}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            `mx-3 ${isActive ? 'text-[#D62A91]' : 'md:text-white'} hover:text-[#D62A91]`
                        }
                        to="/about"
                        onClick={() => setMenu(false)}
                    >
                        About
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            `mx-3 ${isActive ? 'text-[#D62A91]' : 'md:text-white'} hover:text-[#D62A91]`
                        }
                        to="/services"
                        onClick={() => setMenu(false)}
                    >
                        Services
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            `mx-3 ${isActive ? 'text-[#D62A91]' : 'md:text-white'} hover:text-[#D62A91]`
                        }
                        to="/contact"
                        onClick={() => setMenu(false)}
                    >
                        Contact
                    </NavLink>
                </div>

                {/* Hamburger Icon */}
                <div
                    className="md:hidden absolute right-0 p-8 focus:outline-none text-white text-4xl cursor-pointer"
                    onClick={toggleMenu}
                >
                    ☰
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
