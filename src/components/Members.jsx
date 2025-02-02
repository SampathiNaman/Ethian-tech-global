import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function Members() {
    useEffect(() => {
        AOS.init({ duration: 1300 });
      });
    return (
        <div className="w-11/12 sm:w-5/6 lg:w-4/5 max-w-screen-lg mx-auto my-12 p-6 md:p-8">
            <div className='font-sans text-blue-900 text-2xl space-y-1' data-aos="fade-up">
                <h2 className='tracking-wider'>Members</h2>
                <h2 className='font-bold tracking-wide'>We have expert members</h2>


                    <div class="container mx-auto py-12">
                        <div class="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-7">
                            
                            {/* <!-- Team Member 1 --> */}
                            <div class="bg-white rounded-lg shadow-lg overflow-hidden relative " data-aos="fade-up">
                                <img alt="Portrait of Alisha Kabir, Marketer" class="w-full h-48 object-cover" height="300" src="https://storage.googleapis.com/a1aa/image/sfjco7Yk9ZxvbCvnOe6GdOPkNjVgVmi2qrleoi3iDbsF8NRoA.jpg" width="300" />
                                <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                    <div class="text-white space-x-4">
                                        <a class="text-white" href="#">
                                            <i class="fab fa-facebook-f">
                                            </i>
                                        </a>
                                        <a class="text-white" href="#">
                                            <i class="fab fa-twitter">
                                            </i>
                                        </a>
                                        <a class="text-white" href="#">
                                            <i class="fab fa-google-plus-g">
                                            </i>
                                        </a>
                                        <a class="text-white" href="https://www.linkedin.com/in/danish-hussain-dar-b06531228/" target="_blank">
                                            <i class="fab fa-linkedin-in">
                                            </i>
                                        </a>
                                    </div>
                                </div>
                                <div class="p-4 text-center">
                                    <h3 class="text-lg font-semibold">
                                        Jennifer Lee
                                    </h3>
                                    <p class="text-gray-600 text-sm">
                                        Marketer
                                    </p>
                                </div>
                            </div>

                            {/* <!-- Team Member 2 --> */}
                            <div class="bg-white rounded-lg shadow-lg overflow-hidden relative " data-aos="fade-up">
                                <img alt="Portrait of Alisha Kabir, Marketer" class="w-full h-48 object-cover" height="300" src="https://storage.googleapis.com/a1aa/image/faaDMN9HUWxKbiFShPma0tn7385Ype4TBRkSDcMywe2K8NRoA.jpg" width="300" />
                                <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                    <div class="text-white space-x-4">
                                        <a class="text-white" href="#">
                                            <i class="fab fa-facebook-f">
                                            </i>
                                        </a>
                                        <a class="text-white" href="#">
                                            <i class="fab fa-twitter">
                                            </i>
                                        </a>
                                        <a class="text-white" href="#">
                                            <i class="fab fa-google-plus-g">
                                            </i>
                                        </a>
                                        <a class="text-white" href="https://www.linkedin.com/in/danish-hussain-dar-b06531228/" target="_blank">
                                            <i class="fab fa-linkedin-in">
                                            </i>
                                        </a>
                                    </div>
                                </div>
                                <div class="p-4 text-center">
                                    <h3 class="text-lg font-semibold">
                                        Jason Roy
                                    </h3>
                                    <p class="text-gray-600 text-sm">
                                        Designer
                                    </p>
                                </div>
                            </div>

                            {/* <!-- Team Member 3 --> */}
                            <div class="bg-white rounded-lg shadow-lg overflow-hidden relative " data-aos="fade-up">
                                <img alt="Portrait of Alisha Kabir, Marketer" class="w-full h-48 object-cover" height="300" src="https://storage.googleapis.com/a1aa/image/lyoxSxSeViR5Zq68f4cGGcD6mJcAXu3Od3GIMr8eaOqO8NRoA.jpg" width="300" />
                                <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                    <div class="text-white space-x-4">
                                        <a class="text-white" href="#">
                                            <i class="fab fa-facebook-f">
                                            </i>
                                        </a>
                                        <a class="text-white" href="#">
                                            <i class="fab fa-twitter">
                                            </i>
                                        </a>
                                        <a class="text-white" href="#">
                                            <i class="fab fa-google-plus-g">
                                            </i>
                                        </a>
                                        <a class="text-white" href="https://www.linkedin.com/in/danish-hussain-dar-b06531228/" target="_blank">
                                            <i class="fab fa-linkedin-in">
                                            </i>
                                        </a>
                                    </div>
                                </div>
                                <div class="p-4 text-center">
                                    <h3 class="text-lg font-semibold">
                                        Jason Smith
                                    </h3>
                                    <p class="text-gray-600 text-sm">
                                        Marketer
                                    </p>
                                </div>
                            </div>

                            {/* <!-- Team Member 4 --> */}
                            <div class="bg-white rounded-lg shadow-lg overflow-hidden relative " data-aos="fade-up">
                                <img alt="Portrait of Alisha Kabir, Marketer" class="w-full h-48 object-cover" height="300" src="https://storage.googleapis.com/a1aa/image/01SpOn5aiWJ5HFeREQqXbr8b159RHJJu0E8ZQxlzlZr9emIUA.jpg" width="300" />
                                <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                    <div class="text-white space-x-4">
                                        <a class="text-white" href="#">
                                            <i class="fab fa-facebook-f">
                                            </i>
                                        </a>
                                        <a class="text-white" href="#">
                                            <i class="fab fa-twitter">
                                            </i>
                                        </a>
                                        <a class="text-white" href="#">
                                            <i class="fab fa-google-plus-g">
                                            </i>
                                        </a>
                                        <a class="text-white" href="https://www.linkedin.com/in/danish-hussain-dar-b06531228/" target="_blank">
                                            <i class="fab fa-linkedin-in">
                                            </i>
                                        </a>
                                    </div>
                                </div>
                                <div class="p-4 text-center">
                                    <h3 class="text-lg font-semibold">
                                        Jachlen Khan
                                    </h3>
                                    <p class="text-gray-600 text-sm">
                                        Marketer
                                    </p>
                                </div>
                            </div>

                            {/* <!-- Team Member 5 --> */}
                            <div class="bg-white rounded-lg shadow-lg overflow-hidden relative " data-aos="fade-up">
                                <img alt="Portrait of Alisha Kabir, Marketer" class="w-full h-48 object-cover" height="300" src="https://storage.googleapis.com/a1aa/image/CxPyy4iy9VorFRX5dtFlz05BGlMnqazwKeVSnjLexQMe7NRoA.jpg" width="300" />
                                <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                    <div class="text-white space-x-4">
                                        <a class="text-white" href="#">
                                            <i class="fab fa-facebook-f">
                                            </i>
                                        </a>
                                        <a class="text-white" href="#">
                                            <i class="fab fa-twitter">
                                            </i>
                                        </a>
                                        <a class="text-white" href="#">
                                            <i class="fab fa-google-plus-g">
                                            </i>
                                        </a>
                                        <a class="text-white" href="https://www.linkedin.com/in/danish-hussain-dar-b06531228/" target="_blank">
                                            <i class="fab fa-linkedin-in">
                                            </i>
                                        </a>
                                    </div>
                                </div>
                                <div class="p-4 text-center">
                                    <h3 class="text-lg font-semibold">
                                        Nusrat Kabir
                                    </h3>
                                    <p class="text-gray-600 text-sm">
                                        Marketer
                                    </p>
                                </div>
                            </div>

                            {/* <!-- Team Member 6 --> */}
                            <div class="bg-white rounded-lg shadow-lg overflow-hidden relative " data-aos="fade-up">
                                <img alt="Portrait of Alisha Kabir, Marketer" class="w-full h-48 object-cover" height="300" src="https://storage.googleapis.com/a1aa/image/wOm5iC3xlWLMItmDNU0VoRIUISh1ILJJNCwUokIFJKKgvJCF.jpg" width="300" />
                                <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                    <div class="text-white space-x-4">
                                        <a class="text-white" href="#">
                                            <i class="fab fa-facebook-f">
                                            </i>
                                        </a>
                                        <a class="text-white" href="#">
                                            <i class="fab fa-twitter">
                                            </i>
                                        </a>
                                        <a class="text-white" href="#">
                                            <i class="fab fa-google-plus-g">
                                            </i>
                                        </a>
                                        <a class="text-white" href="https://www.linkedin.com/in/danish-hussain-dar-b06531228/" target="_blank">
                                            <i class="fab fa-linkedin-in">
                                            </i>
                                        </a>
                                    </div>
                                </div>
                                <div class="p-4 text-center">
                                    <h3 class="text-lg font-semibold">
                                        Alisha Kabir
                                    </h3>
                                    <p class="text-gray-600 text-sm">
                                        Marketer
                                    </p>
                                </div>
                            </div>

                            {/* <!-- Team Member 7 --> */}
                            <div class="bg-white rounded-lg shadow-lg overflow-hidden relative " data-aos="fade-up">
                                <img alt="Portrait of Alisha Kabir, Marketer" class="w-full h-48 object-cover" height="300" src="https://storage.googleapis.com/a1aa/image/f5SjtpTAveorhEt1vqf47SWxczTNKbgPjqiQRcme4LmQ4biQB.jpg" width="300" />
                                <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                    <div class="text-white space-x-4">
                                        <a class="text-white" href="#">
                                            <i class="fab fa-facebook-f">
                                            </i>
                                        </a>
                                        <a class="text-white" href="#">
                                            <i class="fab fa-twitter">
                                            </i>
                                        </a>
                                        <a class="text-white" href="#">
                                            <i class="fab fa-google-plus-g">
                                            </i>
                                        </a>
                                        <a class="text-white" href="https://www.linkedin.com/in/danish-hussain-dar-b06531228/" target="_blank">
                                            <i class="fab fa-linkedin-in">
                                            </i>
                                        </a>
                                    </div>
                                </div>
                                <div class="p-4 text-center">
                                    <h3 class="text-lg font-semibold">
                                        Doris Flores
                                    </h3>
                                    <p class="text-gray-600 text-sm">
                                        UI Designer
                                    </p>
                                </div>
                            </div>

                            {/* <!-- Team Member 8 --> */}
                            <div class="bg-white rounded-lg shadow-lg overflow-hidden relative " data-aos="fade-up">
                                <img alt="Portrait of Alisha Kabir, Marketer" class="w-full h-48 object-cover" height="300" src="https://storage.googleapis.com/a1aa/image/wn7kHRlhT46XEtiDifRMt5OSSXt2sRQLDvYsNEez3bi89mIUA.jpg" width="300" />
                                <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                    <div class="text-white space-x-4">
                                        <a class="text-white" href="#">
                                            <i class="fab fa-facebook-f">
                                            </i>
                                        </a>
                                        <a class="text-white" href="#">
                                            <i class="fab fa-twitter">
                                            </i>
                                        </a>
                                        <a class="text-white" href="#">
                                            <i class="fab fa-google-plus-g">
                                            </i>
                                        </a>
                                        <a class="text-white" href="https://www.linkedin.com/in/danish-hussain-dar-b06531228/" target="_blank">
                                            <i class="fab fa-linkedin-in">
                                            </i>
                                        </a>
                                    </div>
                                </div>
                                <div class="p-4 text-center">
                                    <h3 class="text-lg font-semibold">
                                        Brandon Ross
                                    </h3>
                                    <p class="text-gray-600 text-sm">
                                        Developer
                                    </p>
                                </div>
                            </div>


                        </div>
                    </div>

            </div>
        </div>
    )
}

export default Members
