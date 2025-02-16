"use client";

import React from 'react';
import { Button, Typography } from '@/app/MTailwind';
import Image from 'next/image';
import { FcGoogle } from 'react-icons/fc';
import useLoginWithGoogle from '@/hooks/Backend/useMasukDenganGoogle';
import useNavbarAktif from '@/hooks/Frontend/useNavbarAktif';

function LoginForm() {
    const LoginIcon = require('@/assets/img/Icon/Login.png');
    const { navbarAktif, handlenavbarAktif } = useNavbarAktif();
    const handleNavClick = (path) => {
        handlenavbarAktif(path);
    };
    const { masukDenganGoogle } = useLoginWithGoogle();

    return (
        <div className="flex flex-col md:flex-row w-full h-screen items-center justify-center px-3 py-3 md:px-5 md:py-5 bg-[#f6edd9]">
            <div className="flex flex-col md:flex-row p-0 items-center md:items-center bg-white border-2 border-[#f6fbf2] shadow-2xl rounded-lg overflow-hidden md:max-w-4xl">
                <div className="w-full md:w-1/2 bg-secondary text-white text-center flex items-center justify-center p-3 md:p-8">
                    <div className="flex flex-col items-center">
                        <Typography variant='h3' className="text-2xl font-semibold mb-2">
                            Penasaran Bagaimana Kami?
                        </Typography>
                        <Typography variant='paragraph' className="mb-4">
                            Kami punya sesuatu yang baru dan segar. Silahkan kunjungi beranda kami.
                        </Typography>
                        <Button
                            color="white"
                            variant="outlined"
                            onClick={() => handleNavClick("/Beranda")}
                        >
                            Cek Beranda
                        </Button>
                        <Image
                            className="w-80 h-80 mt-5 md:mt-4"
                            src={LoginIcon}
                            alt="Login Icon"
                            priority
                        />
                    </div>
                </div>
                <div className="w-full md:w-1/2 p-5 md:p-8">
                    <h2 className="text-3xl font-semibold text-gray-800 my-6 text-center">Silahkan Masuk</h2>
                    <Button
                        onClick={masukDenganGoogle}
                        className="w-full mb-4 !border-2 !border-secondary text-black text-sm flex items-center justify-center space-x-2"
                    >
                        <FcGoogle />
                        <span>Continue with Google</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
