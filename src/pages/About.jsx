import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Members from '../components/Members'
import AboutCom from '../components/AboutCom'

function About() {
    return (
        <>
            <head>
                <title>About Us - Ethian Tech Global</title>
                <meta name="description" content="Learn more about Ethian Tech Global, our mission, vision, and why we are the best choice for your IT solutions." />
                <meta name="keywords" content="About Ethian Tech Global, IT Solutions, Mission, Vision, Expert Team" />
                <meta property="og:title" content="About Us - Ethian Tech Global" />
                <meta property="og:description" content="Learn more about Ethian Tech Global, our mission, vision, and why we are the best choice for your IT solutions." />
                <meta property="og:image" content="about-us.webp" />
                <meta property="og:url" content="https://www.ethiantechglobal.com/about" />
                <meta name="twitter:card" content="summary_large_image" />
            </head>
            <Navbar />
            <main>
                <AboutCom />
                <Members />
            </main>
            
            <Footer />
        </>
    )
}

export default About
