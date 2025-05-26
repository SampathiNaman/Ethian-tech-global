import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import OurProducts from '../components/OurProducts'
import { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";

function Products() {
    useEffect(() => {
        AOS.init({ duration: 1300 });
        AOS.refresh();
    }, []);
    return (
        <>
            <head>
                <title>Our Products - Ethian Tech Global</title>
                <meta name="description" content="Explore our range of products at Ethian Tech Global. From online grocery apps to multi-restaurant SaaS apps, we have the solutions you need." />
                <meta name="keywords" content="Ethian Tech Global Products, Online Grocery App, Food Delivery Software, Multi Restaurant SaaS App, Multi Store Grocery App" />
                <meta property="og:title" content="Our Products - Ethian Tech Global" />
                <meta property="og:description" content="Explore our range of products at Ethian Tech Global. From online grocery apps to multi-restaurant SaaS apps, we have the solutions you need." />
                <meta property="og:image" content="https://storage.googleapis.com/a1aa/image/t2Nv0sp_24nWE70mrsgRk4Xy-iyOaswq0jdzaW2AaZc.jpg" />
                <meta property="og:url" content="https://www.ethiantechglobal.com/products" />
                <meta name="twitter:card" content="summary_large_image" />
            </head>
            <Navbar />
            <main>
                <OurProducts />
            </main>
            <Footer />
        </>
    )
}

export default Products
