import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-5 sm:mx-20 md:mx-32 lg:mx-56 gap-6 mt-10'>
      <h1 className='font-extrabold text-[32px] sm:text-[40px] md:text-[50px] text-center mt-20 leading-relaxed'>
        <span className='text-[#3130FC]'>Discover Your Next Adventure with AI:</span> Personalized itineraries at Your Fingertips
      </h1>
      <p className='text-base sm:text-lg md:text-xl text-gray-500 text-center leading-relaxed'>
        Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
      </p>

      <Link to='/create-trip'>
        <Button className='px-6 py-3 text-sm sm:text-base'>Get Started, It's Free</Button>
      </Link>

      <img 
        src='/landing.png' 
        alt='Landing page graphic' 
      />
    </div>
  )
}

export default Hero
