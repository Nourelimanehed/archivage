import React from 'react';
import LoginImg from '../../assets/images/LoginImg/login.svg';
import { Footer, LoginInput, Navbar } from '../../components';

function Login() {
    return (
        <div className="pt-10 min-h-screen rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
            <Navbar />
            <div className="flex flex-wrap items-center min-h-screen">
                <div className="hidden w-full xl:block xl:w-1/2">
                    <div className="py-18.5 px-26 text-center">
                        <h1 className="text-5xl font-semibold text-accent dark:text-white mb-5">
                            Connexion
                        </h1>
                        <img className="mt-6 w-64 h-auto inline-block" src={LoginImg} alt="Login Logo" />
                    </div>
                </div>

                <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
                    <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                        <LoginInput />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Login;
