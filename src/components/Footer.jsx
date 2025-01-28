import { NavLink } from 'react-router-dom'

function Footer() {
    return (
        <footer className="bg-[#1A3261] text-white font-sans "> 
        {/* absolute bottom-0 w-full */}
            <div className="container w-[90vw] mx-auto py-10 px-5">
                <div className="flex justify-between gap-8 flex-wrap md:flex-row md:justify-between">
                    <div className=" mb-10 md:mb-0">
                        <div>
                            <NavLink to={"/"}><img className='w-40 sm:text-center' src="logo.png" alt="Error in loading" /></NavLink>
                        </div>
                        <div className="mt-5">
                            <div className="flex items-center md:justify-start mb-2">
                                <i className="fas fa-phone-alt text-2xl mr-3"></i>
                                <span className="text-lg">4461237866</span>
                            </div>
                            <div className="flex items-center md:justify-start">
                                <i className="fas fa-envelope text-2xl mr-3"></i>
                                <a href="mailto:mail@ethiantech.com" className="text-lg underline">mail@ethiantech.com</a>
                            </div>
                        </div>
                    </div>
                    {/* <div className="flex flex-col md:flex-row md:space-x-20"> */}
                    <div className="mb-10 md:mb-0">
                        <h2 className="text-xl font-bold mb-3">Partnerships</h2>
                        <ul className="list-disc list-inside">
                            <li className='cursor-pointer hover:underline'>TCS</li>
                            <li className='cursor-pointer hover:underline'>Accenture</li>
                            <li className='cursor-pointer hover:underline'>LTIMindtree</li>
                        </ul>
                    </div>
                    <div className="mb-10 md:mb-0">
                        <h2 className="text-xl font-bold mb-3">Resources</h2>
                        <ul className="list-disc list-inside">
                            <li className='cursor-pointer hover:underline'>Blogs</li>
                            <li className='cursor-pointer hover:underline'>LTIMindtree</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold mb-3">Enroll</h2>
                        <ul className="list-disc list-inside">
                            <li className='cursor-pointer hover:underline'>TCS</li>
                            <li className='cursor-pointer hover:underline'>Accenture</li>
                            <li className='cursor-pointer hover:underline'>LTIMindtree</li>
                        </ul>
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
                            <p className="text-sm text-gray-300">© 2025. Ethiantech Global. Ltd. All rights reserved.</p>
                        </div>
                        <div className="flex space-x-5">
                            <a href="#" className="text-gray-300 text-2xl hover:text-[#D62A91] hover:scale-125 ease-in-out duration-200"><i className="fab fa-facebook "></i></a>
                            <a href="#" className="text-gray-300 text-2xl hover:text-[#D62A91] hover:scale-125 ease-in-out duration-200"><i className="fab fa-youtube"></i></a>
                            <a href="#" className="text-gray-300 text-2xl hover:text-[#D62A91] hover:scale-125 ease-in-out duration-200"><i className="fab fa-instagram"></i></a>
                            <a href="#" className="text-gray-300 text-2xl hover:text-[#D62A91] hover:scale-125 ease-in-out duration-200"><i className="fab fa-linkedin"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
