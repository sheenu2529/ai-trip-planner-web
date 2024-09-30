import React from 'react'
import HotelCardItem from '../components/HotelCardItem.jsx';

function Hotels({trip}) {
  return (
    <div className='bg-opacity-0'>
        <h2 className='font-bold text-xl my-5'>Hotel Recommendation</h2>

        <div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5'>
            {trip?.tripData?.hotelOptions?.map((hotel, index)=>(
                <HotelCardItem key={index} hotel={hotel} />
            ))}
        </div>
    </div>
  )
}

export default Hotels