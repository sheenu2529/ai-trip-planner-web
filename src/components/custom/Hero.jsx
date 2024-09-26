import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center justify-start min-h-screen pt-16 mx-4 sm:mx-10 md:mx-16 lg:mx-28 xl:mx-56 gap-9'>
      <h1 className='font-extrabold text-[32px] sm:text-[40px] text-center mt-10 leading-relaxed'>
        <span className='text-[#3130FC]'>Discover Your Next Adventure with AI:</span>
        <br />
        Personalized itineraries at Your Fingertips
      </h1>
      <p className='text-base sm:text-lg md:text-xl text-gray-500 text-center leading-relaxed'>
        Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
      </p>
      <Link to='/create-trip'>
        <Button className='px-6 py-3 text-sm sm:text-base'>Get Started, It's Free</Button>
      </Link>
      <img src='/landing-page.png' alt='Landing page graphic' />
    </div>
  )
}

export default Hero;