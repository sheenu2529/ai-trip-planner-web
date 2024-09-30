import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi.jsx';
import { IoIosSend } from "react-icons/io";
import { FaRegCopy } from "react-icons/fa";
import { IoLogoWhatsapp, IoLogoInstagram, IoLogoFacebook, IoLogoTwitter, IoLogoLinkedin, IoIosMail } from "react-icons/io";
import Modal from '../components/Modal.jsx';

function InfoSection({ trip }) {
    const [photoUrl, setPhotoUrl] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tripLink, setTripLink] = useState('');

    useEffect(() => {
        trip && GetPlacePhoto();
    }, [trip]);

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: trip?.userSelection?.location?.label
        };
        const result = await GetPlaceDetails(data).then(resp => {
            const photoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
            setPhotoUrl(photoUrl);
        });
    };

    const openSharePopup = () => {
        const link = `https://ai-trip-planner-web-rho.vercel.app/view-trip/${trip.id}`;
        setTripLink(link);
        setIsModalOpen(true);
    };

    const closeSharePopup = () => {
        setIsModalOpen(false);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(tripLink);
        alert('Link copied to clipboard!');
    };

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
                    <Button onClick={openSharePopup}><IoIosSend /></Button>
                </div>
            </div>

            {isModalOpen && (
                <Modal onClose={closeSharePopup}>
                    <div className='p-5 h-[180px]'>
                        <h3 className='text-xl font-bold mb-3'>Share Trip</h3>
                        <div className='mb-3 flex flex-col sm:flex-row items-start sm:items-center mt-5'>
                            <span className='mr-2 mb-2 sm:mb-0 whitespace-nowrap'>Link:</span>
                            <div className='w-full flex items-center'>
                                <div className='w-full h-8 border-2 border-gray-200 flex items-center overflow-hidden'>
                                    <span className='text-gray-600 w-full px-2 whitespace-nowrap overflow-hidden text-ellipsis'>
                                        {tripLink}
                                    </span>
                                </div>
                                <FaRegCopy 
                                    size={24} 
                                    className='ml-2 mr-8 cursor-pointer text-gray-600 hover:text-gray-900'
                                    onClick={copyToClipboard}
                                    title="Copy to clipboard"
                                />
                            </div>
                        </div>
                        <div className='flex flex-wrap gap-4 mt-8'>
                            <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out this trip: ${tripLink}`)}`} target='_blank' rel='noopener noreferrer'>
                                <IoLogoWhatsapp size={28} className='text-black hover:text-green-600' />
                            </a>
                            <a href={`https://www.instagram.com/direct/new/?text=${encodeURIComponent(`Check out this trip: ${tripLink}`)}`} target='_blank' rel='noopener noreferrer'>
                                <IoLogoInstagram size={28} className='text-black hover:text-red-600' />
                            </a>
                            <a href={`https://www.facebook.com/dialog/send?link=${encodeURIComponent(tripLink)}&app_id=YOUR_FACEBOOK_APP_ID`} target='_blank' rel='noopener noreferrer'>
                                <IoLogoFacebook size={28} className='text-black hover:text-blue-600' />
                            </a>
                            <a href={`https://twitter.com/messages/compose?text=${encodeURIComponent(`Check out this trip: ${tripLink}`)}`} target='_blank' rel='noopener noreferrer'>
                                <IoLogoTwitter size={28} className='text-black hover:text-blue-400' />
                            </a>
                            <a href={`https://www.linkedin.com/messaging/compose/?body=${encodeURIComponent(`Check out this trip: ${tripLink}`)}`} target='_blank' rel='noopener noreferrer'>
                                <IoLogoLinkedin size={28} className='text-black hover:text-blue-700' />
                            </a>
                            <a href={`mailto:?subject=Check out this trip!&body=${encodeURIComponent(`I found this interesting trip: ${tripLink}`)}`} target='_blank' rel='noopener noreferrer'>
                                <IoIosMail size={28} className='text-black hover:text-red-500' />
                            </a>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default InfoSection;