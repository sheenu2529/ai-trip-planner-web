import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { googleLogout } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';

function Header() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        console.log(user);
    }, []);

    const login = useGoogleLogin({
        onSuccess: (codeResp) => GetUserProfile(codeResp),
        onError: (error) => console.log(error),
    });

    const GetUserProfile = (tokenInfo) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
            headers: {
                Authorization: `Bearer ${tokenInfo?.access_token}`,
                Accept: 'application/json',
            },
        }).then((resp) => {
            console.log(resp);
            sessionStorage.setItem('user', JSON.stringify(resp.data));
            setOpenDialog(false);
        });
    };

    const userPicture = user?.picture || 'user.png';

    return (
        <div className='fixed top-0 w-full p-3 shadow-sm flex justify-between items-center px-5 bg-white z-50' style={{ height: '60px' }}>
            <a href="/">
                <img src='/Logo.png' alt="Logo" className='w-[40px] h-[30px]' />
            </a>
            <div className="flex items-center gap-5">
                {user ? (
                    <div className='flex items-center gap-3'>
                    <a
                        className='text-[#3130FC] border-2 border-transparent lg:hover:border-[#3130FC] lg:hover:text-[#3130FC] px-2 py-1 rounded-lg text-md'
                        href="/create-trip">
                        Create Trip
                    </a>
                    <a
                        className='text-[#3130FC] border-2 border-transparent lg:hover:border-[#3130FC] lg:hover:text-[#3130FC] px-2 py-1 rounded-lg text-md'
                        href="/my-trips">
                        My Trips
                    </a>
                        <Popover>
                            <PopoverTrigger className='border-none bg-white focus:outline-none rounded-lg'>
                                <img
                                    src={userPicture}
                                    className='h-[40px] w-[40px] rounded-full'
                                    alt="User Avatar"
                                    onError={(e) => { e.target.src = '/user.png'; }}
                                />
                            </PopoverTrigger>
                            <PopoverContent className='flex items-center justify-center p-4'>
                                <h2 className='cursor-pointer text-red-600' onClick={() => {
                                    googleLogout();
                                    sessionStorage.clear();
                                    window.location.href = '/';
                                }}>Logout</h2>
                            </PopoverContent>
                        </Popover>
                    </div>
                ) : (
                    <Button onClick={() => setOpenDialog(true)} className="border-none focus:outline-none">Sign In</Button>
                )}
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
                        className='w-full mt-5 flex gap-4 items-center outline-none border-none focus:outline-none'>
                        <FcGoogle className='h-7 w-7' />
                        Sign In with Google
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default Header;
