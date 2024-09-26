import React, { useState, useEffect } from 'react';
import { GetPlaceDetails } from '@/service/GlobalApi.jsx';
import { PHOTO_REF_URL } from '@/service/GlobalApi.jsx';
import { Link } from 'react-router-dom';
import { MdDeleteOutline } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function UserTripCardItem({ trip, onDelete }) {
  const [photoUrl, setPhotoUrl] = useState();
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage dialog visibility

  useEffect(() => {
    if (trip) {
      GetPlacePhoto();
    }
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };
    const result = await GetPlaceDetails(data);
    const photoName = result?.data?.places?.[0]?.photos?.[3]?.name;
    if (photoName) {
      const photoUrl = PHOTO_REF_URL.replace('{NAME}', photoName);
      setPhotoUrl(photoUrl);
    }
  };

  const handleDelete = () => {
    onDelete(trip.id); 
    setIsDialogOpen(false); 
  };

  return (
    <div className="hover:scale-105 transition-all">
      <Link to={`/view-trip/${trip?.id}`}>
        <img
          src={photoUrl ? photoUrl : '/placeholder.jpg'}
          className="w-[300px] h-[220px] object-cover rounded-xl"
          alt={trip?.userSelection?.location?.label || 'Trip Image'}
        />
      </Link>
      <div className="flex justify-between items-center mt-2">
        <div>
          <h2 className="font-bold text-lg line-clamp-1">{trip?.userSelection?.location?.label}</h2>
          <h2 className="text-sm text-gray-500">
            {trip?.userSelection.noOfDays} Days trip with {trip?.userSelection.budget} Budget
          </h2>
        </div>
        <button
          onClick={() => setIsDialogOpen(true)} 
          className="text-red-500 hover:text-red-700 transition-colors flex items-center border-none focus:outline-none bg-white"
          aria-label="Delete trip">
          <MdDeleteOutline size={20} />
        </button>
      </div>
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className="w-[400px] md:w-[500px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will permanently delete your trip.
            </AlertDialogDescription>
          </AlertDialogHeader>  
          <AlertDialogFooter className="flex justify-between">
            <AlertDialogCancel className="focus:outline-none border-none hover:bg-white" onClick={() => setIsDialogOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction className="text-red-600 border-none bg-white hover:bg-white" onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default UserTripCardItem;
