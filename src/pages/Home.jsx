import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
// import Members from '../components/Members'

function Home() {
    return (
        <div>
            <Navbar />
            <div className='text-3xl '> Home Page </div>
            {/* <Members    /> */}
            <Footer />
        </div>
    )
}

export default Home
