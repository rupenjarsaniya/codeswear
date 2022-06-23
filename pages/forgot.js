import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const forgot = () => {
    const router = useRouter();
    const [passwords, setPasswords] = useState({ password: "", confirmpassword: "" });
    const [email, setEmail] = useState("");

    const handleChange = (e) => setPasswords({ ...passwords, [e.target.name]: e.target.value });

    const resetPassword = async (e) => {
        e.preventDefault();
        const data = {
            password: passwords.password,
            confirmpassword: passwords.confirmpassword,
            canSendEmail: false
        };
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": router.query.token
            },
            body: JSON.stringify(data)
        });
        const json = await res.json();
        if (json.success) {
            toast.success(json.message, {
                position: "bottom-left",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            router.push("/login");
        }
        else {
            toast.error(json.error, {
                position: "bottom-left",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    const sendEmail = async (e) => {
        e.preventDefault();
        const data = {
            email,
            canSendEmail: true
        };
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const json = await res.json();
        console.log(json);
        if (json.success) {
            toast.success(json.message, {
                position: "bottom-left",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else {
            toast.error(json.error, {
                position: "bottom-left",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    useEffect(() => {
    }, [])
    return (
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" >
            <ToastContainer
                position="bottom-left"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="max-w-md w-full space-y-8">
                <div>
                    <img className="mx-auto h-12 w-auto" src="/codeswearcircle.png" alt="Workflow" />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Forgot Password</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or
                        <Link href={'/login'}>
                            <a className="font-medium text-pink-600 hover:text-pink-500"> Login </a>
                        </Link>
                    </p>
                </div>
                {router.query.token
                    ? <form className="mt-8 space-y-6" onSubmit={resetPassword}>
                        <input type="hidden" name="remember" value="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="password" className="sr-only">New Password</label>
                                <input value={passwords.password} onChange={handleChange} id="password" name="password" type="password" autoComplete="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm" placeholder="New Password" />
                            </div>
                            <div>
                                <label htmlFor="confirmpassword" className="sr-only">New Confirm Password</label>
                                <input value={passwords.confirmpassword} onChange={handleChange} id="confirmpassword" name="confirmpassword" type="password" autoComplete="confirmpassword" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm" placeholder="Confirm New Password" />
                            </div>
                        </div>
                        {passwords.password === passwords.confirmpassword ? <span className='text-green-600 text-sm'>Passwords Matched</span> : <span className='text-red-600 text-sm'>Passwords Not Matched</span>}
                        <div>
                            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <svg className="h-5 w-5 text-pink-500 group-hover:text-pink-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                Continue
                            </button>
                        </div>
                    </form>
                    : <form className="mt-8 space-y-6" onSubmit={sendEmail}>
                        <input type="hidden" name="remember" value="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="email-address" className="sr-only">Email address</label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm" placeholder="Email address" />
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <svg className="h-5 w-5 text-pink-500 group-hover:text-pink-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                Continue
                            </button>
                        </div>
                    </form>}

            </div>
        </div >
    )
}

export default forgot