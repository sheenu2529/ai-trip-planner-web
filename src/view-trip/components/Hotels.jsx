import React from 'react'
import HotelCardItem from '../components/HotelCardItem.jsx';

function Hotels({trip}) {
  return (
    <div>
        <h2 className='font-bold text-xl my-5'>Hotel Recommendations</h2>

        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
            {trip?.tripData?.hotel_options?.map((hotel, index) => (
                <HotelCardItem key={hotel.id || index} hotel={hotel} />
            ))}
        </div>
    </div>
  )
}

export default Hotels