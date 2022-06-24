import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Myaccount = () => {
    const router = useRouter();
    const [newdata, setNewdata] = useState({
        name: "", email: "", pincode: "", address: "", phone: ""
    });
    const [passwords, setPasswords] = useState({
        currentpassword: "", newpassword: "", newconfirmpassword: ""
    });

    const handleChange = (e) => {
        setNewdata({ ...newdata, [e.target.name]: e.target.value });
    }

    const handlePasswordChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    }

    const handleUpdateProfile = async () => {
        let token = localStorage.getItem('token');
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "token": token
            },
            body: JSON.stringify(newdata)
        });
        const json = await res.json();
        if (json.success) {
            localStorage.setItem("userdata", JSON.stringify(json.userdata));
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

    const handleChangePassword = async () => {
        let token = localStorage.getItem('token');
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/changepassword`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "token": token
            },
            body: JSON.stringify(passwords)
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
            setPasswords({ currentpassword: "", newpassword: "", newconfirmpassword: "" });
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
        if (!localStorage.getItem('token')) router.push("/login");
        else {
            let userdata = JSON.parse(localStorage.getItem('userdata'));
            if (userdata) {
                setNewdata({
                    name: userdata.name, email: userdata.email, pincode: userdata.pincode, address: userdata.address, phone: userdata.phone
                });
            }
        }
    }, []);

    return (
        <div className='container px-3 sm:px-40'>
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
            <h1 className='text-center font-bold text-3xl my-8 text-gray-600'>Update My Account</h1>
            <h2 className="font-bold mb-8 text-gray-600">1. Profile Details</h2>

            <div className="mx-auto flex">
                <div className="px-2 w-1/2">
                    <div className="relative mb-2">
                        <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                        <input type="text" onChange={handleChange} value={newdata.name} id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
                <div className="px-2 w-1/2">
                    <div className="relative mb-2">
                        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email (cannot change email)</label>
                        <input type="text" value={newdata.email} id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly disabled />
                    </div>
                </div>
            </div>

            <div className="px-2">
                <div className="relative mb-2">
                    <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
                    <textarea id="address" onChange={handleChange} value={newdata.address} name="address" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 h-22 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                </div>
            </div>

            <div className="mx-auto flex">
                <div className="px-2 w-1/2">
                    <div className="relative mb-2">
                        <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
                        <input type="number" onChange={handleChange} value={newdata.phone} id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" minLength={10} maxLength={10} />
                    </div>
                </div>
                <div className="px-2 w-1/2">
                    <div className="relative mb-2">
                        <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
                        <input type="number" onChange={handleChange} value={newdata.pincode} id="name" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" maxLength={6} />
                    </div>
                </div>
            </div>
            <button onClick={handleUpdateProfile} className=' mx-2 bg-pink-500 flex item-center rounded-md justify-center py-2 px-4 text-white font-bold mt-3 border-0 hover:bg-pink-600 focus:outline-none'>
                Update
            </button>



            <h2 className="font-bold my-8 text-gray-600">2. Change Password</h2>

            <div className="mx-auto flex">
                <div className="px-2 w-1/2">
                    <div className="relative mb-2">
                        <label htmlFor="currentpassword" className="leading-7 text-sm text-gray-600">Current Password</label>
                        <input type="text" onChange={handlePasswordChange} value={passwords.currentpassword} id="currentpassword" name="currentpassword" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
                <div className="px-2 w-1/2">
                    <div className="relative mb-2">
                        <label htmlFor="newpassword" className="leading-7 text-sm text-gray-600">New Password</label>
                        <input type="text" onChange={handlePasswordChange} value={passwords.newpassword} id="newpassword" name="newpassword" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
                <div className="px-2 w-1/2">
                    <div className="relative mb-2">
                        <label htmlFor="newconfirmpassword" className="leading-7 text-sm text-gray-600">New Confirm Password</label>
                        <input type="text" onChange={handlePasswordChange} value={passwords.newconfirmpassword} id="newconfirmpassword" name="newconfirmpassword" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
            </div>
            {
                passwords.newpassword.length !== 0
                    ? passwords.newpassword === passwords.newconfirmpassword
                        ? <p className='text-right text-green-600 text-sm'>Passwords Matched</p>
                        : <p className='text-right text-red-600 text-sm'>Passwords not Matched</p>
                    : ""
            }
            <button onClick={handleChangePassword} className=' mx-2 bg-pink-500 flex item-center rounded-md justify-center py-2 px-4 text-white font-bold mt-3 border-0 hover:bg-pink-600 focus:outline-none'>
                Change Password
            </button>
        </div>
    )
}

export default Myaccount