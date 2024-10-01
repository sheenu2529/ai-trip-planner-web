import React, { useState, useEffect } from 'react';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi.jsx';
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, DollarSign, Star } from 'lucide-react'

function HotelCardItem({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState('');

  useEffect(() => {
    if (hotel) {
      getPlacePhoto();
    }
  }, [hotel]);

  const getPlacePhoto = async () => {
    const data = { textQuery: hotel?.hotelName };
    const result = await GetPlaceDetails(data);
    const photoRef = result.data.places[0]?.photos[3]?.name;
    if (photoRef) {
      const photoUrl = PHOTO_REF_URL.replace('{NAME}', photoRef);
      setPhotoUrl(photoUrl);
    }
  };

  const bookingUrl = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(hotel?.hotelName+","+hotel?.hotelAddress)}`;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel?.hotelName+","+hotel?.hotelAddress)}`;

  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden shadow-lg">
      <a 
        href={googleMapsUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="block relative w-full h-36 sm:h-48 overflow-hidden group"
        >
        {photoUrl ? (
            <img 
            src={photoUrl} 
            alt={`${hotel?.hotelName},${hotel?.hotelAddress}`} 
            className="absolute h-full w-full object-cover sm:transition-transform sm:duration-300 sm:group-hover:scale-110"
            />
        ) : (
            <div className="absolute h-full w-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500 text-sm sm:text-base">No image available</span>
            </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-30 sm:bg-opacity-0 sm:group-hover:bg-opacity-30 sm:transition-opacity sm:duration-300 flex items-center justify-center">
            <span className="text-white text-sm sm:text-lg font-semibold sm:opacity-0 sm:group-hover:opacity-100 sm:transition-opacity sm:duration-300">
            View on Google Maps
            </span>
        </div>
      </a>
      <CardContent className="p-3 sm:p-4">
        <h2 className="text-lg sm:text-xl font-bold mb-2 text-gray-800 truncate">{hotel?.hotelName}</h2>
        <div className="space-y-1 sm:space-y-2">
          <p className="flex items-center text-gray-600 text-sm sm:text-base">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0 text-red-600" />
            <span className="truncate">{hotel?.hotelAddress}</span>
          </p>
          <p className="flex items-center text-gray-600 text-sm sm:text-base">
            <DollarSign className="w-4 h-4 mr-2 flex-shrink-0 text-green-600" />
            <span>{hotel?.price}</span>
          </p>
          <p className="flex items-center text-gray-600 text-sm sm:text-base">
            <Star className="w-4 h-4 mr-2 flex-shrink-0 text-yellow-600" />
            <span>{hotel?.rating} stars</span>
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-3 sm:p-4">
        <a 
          href={bookingUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full flex justify-start"
        >
          <Button className="w-[100px] bg-black text-white font-bold py-2 px-4 rounded focus:outline-none sm:hover:bg-white sm:hover:border-2 sm:hover:border-black sm:hover:text-black">
            Book Now
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
}

export default HotelCardItem;