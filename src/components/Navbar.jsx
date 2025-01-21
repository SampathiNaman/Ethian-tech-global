import React from 'react'
import { NavLink } from 'react-router-dom';

function Navbar() {
    return (
        <nav className='p-6 flex items-center bg-[#1A3261] text-white font-medium'>
            <div className='mx-10 basis-1/3'>
                <NavLink to={"/"}><img className='w-40' src="b.png" alt="Error in loading" /></NavLink>
            </div>

            <div className='flex space-x-4 basis-2/3 justify-center gap-10'>
                <NavLink className={({ isActive }) => `mx-3 ${isActive ? 'text-[#D62A91]' : 'text-white'}`} to={"/"}>Home</NavLink>
                <NavLink className={({ isActive }) => `mx-3 ${isActive ? 'text-[#D62A91]' : 'text-white'}`} to={"/about"}>About</NavLink>
                <NavLink className={({ isActive }) => `mx-3 ${isActive ? 'text-[#D62A91]' : 'text-white'}`} to={"/services"}>Services</NavLink>
                <NavLink className={({ isActive }) => `mx-3 ${isActive ? 'text-[#D62A91]' : 'text-white'}`} to={"/contact"}>Contact</NavLink>
            </div>
        </nav>
    )
}

export default Navbar
