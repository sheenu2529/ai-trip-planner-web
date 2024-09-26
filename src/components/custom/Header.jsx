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
} from "@/components/ui/dialog";
import { googleLogout } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';

function Header() {

    const user = JSON.parse(localStorage.getItem('user'));
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
            localStorage.setItem('user', JSON.stringify(resp.data));
            setOpenDialog(false);
            // window.location.reload();
        });
    };

    const userPicture = user?.picture || 'user.png';

    return (
        <div className='fixed top-0 w-full h-[70px] p-3 shadow-sm flex justify-between items-center px-5 bg-[#2827FC] z-50'>
            <a href="/">
                <img src='/Logo-Circle.png' alt="Logo" className='w-[60px] h-[60px]' />
            </a>
            <div>
                {user ? (
                    <div className='flex items-center gap-3'>
                        <a className='text-black' href="/create-trip">
                            <Button variant="outline" className="rounded-full focus:outline-none border-2 border-[#3130FC] hover:border-[#2827FC] hover:bg-white">+ Create Trip</Button>
                        </a>
                        <a className='text-black' href="/my-trips">
                            <Button variant="outline" className="rounded-full focus:outline-none border-2 border-[#3130FC] hover:border-[#2827FC] hover:bg-white">My Trips</Button>
                        </a>
                        <Popover>
                            <PopoverTrigger className='border-none bg-[#2827FC] focus:outline-none'>
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
                                    localStorage.clear();
                                    window.location.href = '/';
                                }}>Logout</h2>
                            </PopoverContent>
                        </Popover>
                    </div>
                ) : (
                    <Button onClick={() => setOpenDialog(true)} className="bg-white text-black hover:bg-white focus:outline-none">Sign In</Button>
                )}
            </div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogDescription>
                            <img src="/Logo-Circle.png" alt="App Logo" className='w-[40px] h-[40px]'/>
                            <h2 className='font-bold text-lg mt-7'>Sign In with Google</h2>
                            <p>Sign in to save your trip plans and access them on any device.</p>
                            <Button
                                onClick={login}
                                className='w-full mt-5 flex gap-4 items-center outline-none border-none focus:outline-none'>
                                <FcGoogle className='h-7 w-7' />
                                Sign In with Google
                            </Button>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default Header;
