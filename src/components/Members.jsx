import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';

const teamMembers = [
    {
        name: "Amare Yihun",
        role: "Founder and Managing Director",
        image: "Amare Yihun-Founder and Managing Director.jpg",
        social: {
            facebook: "https://www.facebook.com/amare.siraw.1",
            twitter: "#",
            instagram: "https://www.instagram.com/?fbclid=IwY2xjawIOZ6NleHRuA2FlbQIxMAABHa-n6eicCPFwUoMfqeO-dTqa9Qvvo0UZG_1VGPjYRVAS9WqPnQYt4GyKlg_aem_23lb7cKYmavz2Gp4VvHzwA",
            linkedin: "https://www.linkedin.com/in/amare-yihun-mph-ms-87368579/",
        },
    },
    {
        name: "Jason Roy",
        role: "Designer",
        image: "https://storage.googleapis.com/a1aa/image/faaDMN9HUWxKbiFShPma0tn7385Ype4TBRkSDcMywe2K8NRoA.jpg",
        social: {
            facebook: "#",
            twitter: "#",
            instagram: "#",
            linkedin: "#",
        },
    },
    {
        name: "Jason Smith",
        role: "Marketer",
        image: "https://storage.googleapis.com/a1aa/image/lyoxSxSeViR5Zq68f4cGGcD6mJcAXu3Od3GIMr8eaOqO8NRoA.jpg",
        social: {
            facebook: "#",
            twitter: "#",
            instagram: "#",
            linkedin: "#",
        },
    },
    {
        name: "Doris Flores",
        role: "UI Designer",
        image: "https://storage.googleapis.com/a1aa/image/f5SjtpTAveorhEt1vqf47SWxczTNKbgPjqiQRcme4LmQ4biQB.jpg",
        social: {
            facebook: "#",
            twitter: "#",
            instagram: "#",
            linkedin: "#",
        },
    },
];

function Members() {
    useEffect(() => {
        AOS.init({ duration: 1300 });
    }, []);

    return (
        <section className="w-11/12 sm:w-5/6 lg:w-4/5 max-w-screen-lg mx-auto my-12 p-6 md:p-8">
            <div className="font-sans text-blue-900 text-2xl space-y-1" data-aos="fade-up">
                <h2 className="tracking-wider">Members</h2>
                <h2 className="font-bold tracking-wide">We have expert members</h2>

                <div className="container mx-auto py-12">
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-7">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden relative" data-aos="fade-up">
                                <img
                                    alt={`Portrait of ${member.name}`}
                                    className="w-full h-48 object-cover"
                                    src={member.image}
                                    width="300"
                                    height="300"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                    <div className="text-white space-x-4">
                                        {member.social.facebook && (
                                            <a className="text-white" href={member.social.facebook} target="_blank" rel="noopener noreferrer">
                                                <FontAwesomeIcon icon={faFacebook} className='text-2xl'/>
                                            </a>
                                        )}
                                        {member.social.twitter && (
                                            <a className="text-white" href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                                                <FontAwesomeIcon icon={faTwitter} className='text-2xl'/>
                                            </a>
                                        )}
                                        {member.social.instagram && (
                                            <a className="text-white" href={member.social.instagram} target="_blank" rel="noopener noreferrer">
                                                <FontAwesomeIcon icon={faInstagram} className='text-2xl'/>
                                            </a>
                                        )}
                                        {member.social.linkedin && (
                                            <a className="text-white" href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                                                <FontAwesomeIcon icon={faLinkedin} className='text-2xl'/>
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <div className="p-4 text-center">
                                    <h3 className="text-lg font-semibold">{member.name}</h3>
                                    <p className="text-gray-600 text-sm">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Members;
