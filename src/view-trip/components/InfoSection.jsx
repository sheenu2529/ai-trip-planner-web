import { Button } from '@/components/ui/button'
import { GetPlaceDetails } from '@/service/GlobalApi.jsx';
import { PHOTO_REF_URL } from '@/service/GlobalApi.jsx';
import React, { useEffect, useState } from 'react'
import { IoIosSend } from "react-icons/io";

function InfoSection({ trip }) {
    const [photoUrl, setPhotoUrl] = useState();

    useEffect(() => {
        trip && GetPlacePhoto();
    }, [trip]);

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: trip?.userSelection?.location?.label
        }
        const result = await GetPlaceDetails(data).then(resp => {
            console.log(resp.data.places[0].photos[3].name);

            const photoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
            setPhotoUrl(photoUrl);
        });
    }

    const shareTrip = () => {
        const tripLink = `http://localhost:5173/view-trip/${trip.id}`;
        const whatsappUrl = `https://api.whatsapp.com/send?text=${tripLink}`;
        window.open(whatsappUrl, '_blank');
    }

    return (
        <div className='mt-10'>
            <img src={photoUrl ? photoUrl : '/placeholder.jpg'} alt="img" className="w-full h-[340px] object-cover rounded-xl" />
            <div className='flex justify-between items-center'>
                <div className='my-5 flex flex-col gap-2'>
                    <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
                    <div className='flex gap-5 flex-wrap'>
                        <h2 className='p-1 px-2 text-sm bg-gray-200 rounded-full text-gray-500'>
                            📅 {trip?.userSelection?.noOfDays} Day
                        </h2>
                        <h2 className='p-1 px-2 text-sm bg-gray-200 rounded-full text-gray-500'>
                            💰 {trip?.userSelection?.budget} Budget
                        </h2>
                        <h2 className='p-1 px-2 text-sm bg-gray-200 rounded-full text-gray-500'>
                            🥂 No. Of Traveler: {trip?.userSelection?.traveler}
                        </h2>
                    </div>
                </div>
                <div className='mt-10'>
                    <Button onClick={shareTrip}><IoIosSend /></Button>
                </div>
            </div>
        </div>
    )
}

export default InfoSection;
