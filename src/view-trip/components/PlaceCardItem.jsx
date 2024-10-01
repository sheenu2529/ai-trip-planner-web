import React, { useState, useEffect } from 'react'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi'
import { Clock, DollarSign } from 'lucide-react'

function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState('')

  useEffect(() => {
    if (place) {
      getPlacePhoto()
    }
  }, [place])

  const getPlacePhoto = async () => {
    try {
      const result = await GetPlaceDetails({ textQuery: place.placeName })
      const photoName = result.data.places[0].photos[3].name
      const url = PHOTO_REF_URL.replace('{NAME}', photoName)
      setPhotoUrl(url)
    } catch (error) {
      console.error('Error fetching place photo:', error)
    }
  }

  const getGoogleMapsPlaceUrl = () => {
    const query = encodeURIComponent(`${place.placeName}, ${place.placeAddress}`)
    return `https://www.google.com/maps/search/?api=1&query=${query}`
  }

  const handleClick = (e) => {
    e.preventDefault()
    const url = getGoogleMapsPlaceUrl()
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div 
      onClick={handleClick}
      className="border rounded-xl p-3 mt-2 flex gap-5 sm:hover:scale-105 sm:transition-all sm:hover:shadow-md cursor-pointer"
    >
      <img
        src={photoUrl || '/placeholder.jpg'}
        alt={place.placeName}
        className="w-[130px] h-[130px] rounded-xl object-cover"
      />
      <div>
        <h2 className="font-bold text-lg">{place.placeName}</h2>
        <p className="text-sm text-gray-400">{place.placeDetails}</p>
        <div className="flex items-center mt-2">
          <Clock size={16} className="mr-1" />
          <span>{place.travelTime}</span>
        </div>
        <div className="flex items-center mt-2">
          <DollarSign size={16} className="mr-1 text-green-600" />
          <span>{place.ticketPricing}</span>
        </div>
      </div>
    </div>
  )
}

export default PlaceCardItem