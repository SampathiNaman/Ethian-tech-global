import React from 'react'

function AboutCom() {
    return (
        <div className='w-11/12 sm:w-5/6 lg:w-4/5 max-w-screen-lg grid lg:grid-cols-2 sm:grid-cols-1 gap-y-16 md:gap-x-8 mx-auto mt-12 p-6 md:p-8'>
            <   div className='lg:hidden font-sans text-blue-900 text-2xl space-y-1'>
                <h2 className='tracking-wider'>Our company</h2>
                <h2 className='font-bold tracking-wide'>Make the world a better place with us</h2>
            </div>
            <img src="about-us.png" alt="Expert Team" className='w-4/5 m-auto' />
            <div className='space-y-8'>
                <div className='hidden lg:block font-sans text-blue-900 text-2xl space-y-1'>
                    <h2 className='tracking-wider'>Our company</h2>
                    <h2 className='font-bold tracking-wide'>Make the world a better place with us</h2>
                </div>
                <div className='space-y-5'>
                    <div className='font-sans'>
                        <h2 className='text-blue-900 text-xl font-bold tracking-wide'>Expert Team</h2>
                        <p className='text-base'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat itaque veritatis quis nobis. Quisquam inventore amet vitae corporis ducimus id optio enim odio blanditiis architecto! Dolor molestiae minus asperiores. Tempora. Lorem Lorem.
                        Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat itaque veritatis quis nobis. Quisquam inventore amet vitae corporis ducimus id optio enim odio blanditiis architecto! Dolor molestiae minus asperiores. Tempora. Lorem Lorem.
                        LoremLorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat itaque veritatis quis nobis. Quisquam inventore amet vitae corporis ducimus id optio enim odio blanditiis architecto! Dolor molestiae minus asperiores. Tempora. Lorem Lorem.
                        Lorem</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutCom
