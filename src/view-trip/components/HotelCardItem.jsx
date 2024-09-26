import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GetPlaceDetails } from '@/service/GlobalApi.jsx';
import { PHOTO_REF_URL } from '@/service/GlobalApi.jsx';


function HotelCardItem({hotel}) {

    const [photoUrl, setPhotoUrl]=useState();
    useEffect(()=>{
        hotel&&GetPlacePhoto();
    },[hotel])

    const GetPlacePhoto=async()=>{
        const data={
            textQuery:hotel?.hotel_name
        }
        const result=await GetPlaceDetails(data).then(resp=>{
            console.log(resp.data.places[0].photos[3].name);

            const photoUrl = PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
            setPhotoUrl(photoUrl);
        })
    }
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel?.hotel_name+","+hotel?.hotel_address} target='_blank'>
        <div className='hover:scale-105 transition-all cursor-pointer'>
            <img src={photoUrl?photoUrl:'/placeholder.jpg'} className='rounded-xl h-[160px] w-full object-cover' />
            <div className='my-2 flex flex-col gap-2'>
                <h2 className='font-medium'>{hotel?.hotel_name}</h2>
                <h2 className='text-xs text-gray-500'>📍 {hotel?.hotel_address}</h2>
                <h2 className='text-sm'>💰 {hotel?.price}</h2>
                <h2 className='text-sm'>⭐ {hotel?.rating}</h2>
            </div>  
        </div>
    </Link>
  )
}

export default HotelCardItem