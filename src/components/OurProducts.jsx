import React from 'react';
import { NavLink } from 'react-router-dom';

const products = [
    {
        title: "Online Grocery App & Food Delivery Software System",
        image: "https://storage.googleapis.com/a1aa/image/t2Nv0sp_24nWE70mrsgRk4Xy-iyOaswq0jdzaW2AaZc.jpg",
        description: "Online Grocery App & Food Delivery Software System",
    },
    {
        title: "Flutter Multi Restaurant Saas App",
        image: "https://storage.googleapis.com/a1aa/image/aLj9f7nuLgvqovmKJr7ySPDVMiJC9djHK0iOiSkiCVo.jpg",
        description: "Multi-restaurant saas app comes with all the app UI/UX and backend integration to build iOS / ANDROID mobile apps.",
    },
    {
        title: "Multi Store Grocery App",
        image: "https://storage.googleapis.com/a1aa/image/3AwMrd68Q5jdkjPBmaqvTMvUS1ZHSkhIwCXytWTMEiw.jpg",
        description: "Launch your online grocery shopping and delivery system with multiple store support in just a few days.",
    },
];

function OurProducts() {
    return (
        <section className="w-11/12 sm:w-5/6 lg:w-4/5 max-w-screen-lg mx-auto p-6 md:p-8 mt-12 mb-20">
            <div className='font-sans text-blue-900 text-2xl space-y-1' data-aos="fade-up">
                {/* <h2 className='tracking-wider'>Explore Products</h2> */}
                <h2 className='font-bold tracking-wide'>Explore Our SaaS Products</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4 md:py-8" >
                {products.map((product, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg p-4 md:p-6 hover:cursor-pointer" data-aos="fade-up">
                        <img 
                            src={product.image} 
                            alt={product.title} 
                            className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <h3 className="text-xl font-semibold text-gray-800 mt-4">
                            {product.title}
                        </h3>
                        <p className="text-gray-600 text-sm mt-2">
                            {product.description}
                        </p>
                    </div>
                ))}
            </div>
            <NavLink to="/contact" className="float-left md:float-right text-center bg-[#D62A91] text-white text-base rounded-md hover:bg-pink-600 active:scale-95 px-4 py-2 my-4 md:mb-0">
                Still confused? Talk to our experts
            </NavLink>
        </section>
    );
}

export default OurProducts;
