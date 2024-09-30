import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Input } from '../components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from '../constants/options';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { chatSession } from '@/service/AIModal';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

function CreateTrip() {
    const [place, setPlace] = useState();
    const [formData, setFormData] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    const login = useGoogleLogin({
        onSuccess: (codeResp) => GetUserProfile(codeResp),
        onError: (error) => console.log(error)
    });

    const OnGenerateTrip = async () => {
        if (!formData?.location || !formData?.budget || !formData?.traveler || !formData?.noOfDays) {
            toast("Please fill all details");
            return;
        }
        if (formData?.noOfDays > 10) {
            toast("Please enter less than or equal to 10 days of plan");
            return;
        }

        const user = JSON.parse(sessionStorage.getItem('user'));
        if (!user) {
            setOpenDialog(true);
            return;
        }

        setLoading(true);
        const FINAL_PROMPT = AI_PROMPT
            .replace('{location}', formData?.location?.label)
            .replace('{totalDays}', formData?.noOfDays)
            .replace('{traveler}', formData?.traveler)
            .replace('{budget}', formData?.budget);
        
        const result = await chatSession.sendMessage(FINAL_PROMPT);
        console.log("--", result?.response?.text());
        setLoading(false);
        SaveAiTrip(result?.response?.text());
    };

    const SaveAiTrip = async (TripData) => {
        setLoading(true);
        const user = JSON.parse(sessionStorage.getItem('user'));
        const docId = Date.now().toString();

        await setDoc(doc(db, "AITrips", docId), {
            userSelection: formData,
            tripData: JSON.parse(TripData),
            userEmail: user?.email,
            id: docId
        });
        setLoading(false);
        navigate('/view-trip/' + docId);
        window.location.reload();
    };

    const GetUserProfile = (tokenInfo) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
            headers: {
                Authorization: `Bearer ${tokenInfo?.access_token}`,
                Accept: 'Application/json'
            }
        }).then((resp) => {
            console.log(resp);
            sessionStorage.setItem('user', JSON.stringify(resp.data));
            setOpenDialog(false);
            OnGenerateTrip();
        });
    };

    return (
        <div className="min-h-screen flex flex-col">
            <div className='flex-grow max-w-5xl w-full mx-auto px-5 py-10 sm:px-10 md:px-32 lg:px-56 xl:px-10'>
                <h2 className='font-bold text-3xl mb-6 mt-10'>Tell us your travel preferences 🏕️🌴</h2>
                <p className='mb-10 text-gray-500 text-xl'>
                    Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
                </p>

                <div className='flex flex-col gap-10'>
                    <div>
                        <h2 className='text-xl mb-3 font-medium'>What is destination of choice?</h2>
                        <GooglePlacesAutocomplete
                            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                            selectProps={{
                                place,
                                onChange: (v) => { setPlace(v); handleInputChange('location', v) },
                            }}
                        />
                    </div>
                    <div>
                        <h2 className='text-xl mb-3 font-medium'>How many days are you planning your trip?</h2>
                        <Input
                            placeholder={'Ex. 3'}
                            type="number"
                            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
                            onWheel={(e) => e.target.blur()}
                        />
                    </div>
                    <div>
                        <h2 className='text-xl mb-3 font-medium'>What is Your Budget?</h2>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5'>
                            {SelectBudgetOptions.map((item, index) => (
                                <div key={index}
                                    onClick={() => handleInputChange('budget', item.title)}
                                    className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                                    ${formData?.budget == item.title && 'shadow-lg border-black'}`}
                                >
                                    <h2 className='text-4xl'>{item.icon}</h2>
                                    <h2 className='font-bold text-lg'>{item.title}</h2>
                                    <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className='text-xl mb-3 font-medium'>Who do you plan on traveling with on your next adventure?</h2>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5'>
                            {SelectTravelsList.map((item, index) => (
                                <div key={index}
                                    onClick={() => handleInputChange('traveler', item.people)}
                                    className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                                    ${formData?.traveler == item.people && 'shadow-lg border-black'}`}
                                >
                                    <h2 className='text-4xl'>{item.icon}</h2>
                                    <h2 className='font-bold text-lg'>{item.title}</h2>
                                    <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='mt-10 flex justify-end'>
                    <Button
                        disabled={loading}
                        onClick={OnGenerateTrip}
                    >
                        {loading ?
                            <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : 'Generate Trip'
                        }
                    </Button>
                </div>
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent>
                    <DialogHeader>
                        <img src="/Logo.png" alt="App Logo" className='w-[40px] h-[35px]' />
                        <DialogTitle className='font-bold text-lg mt-7'>Sign In with Google</DialogTitle>
                        <DialogDescription>
                            Sign in to save your trip plans and access them on any device.
                        </DialogDescription>
                    </DialogHeader>
                    <Button
                        onClick={login}
                        className='w-full mt-5 flex gap-4 items-center outline-none border-none focus:outline-none'
                    >
                        <FcGoogle className='h-7 w-7' />
                        Sign In with Google
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default CreateTrip;
