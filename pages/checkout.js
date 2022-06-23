import React, { useEffect, useState } from 'react'
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Checkout = ({ clearCart, cart, addToCart, removeFromCart, subtotal }) => {
    const router = useRouter();
    // Delivery Data
    const [deliveryData, setDeliveryData] = useState({
        name: "", email: "", address: "", phone: "", pincode: "", city: "", state: ""
    });

    const [userData, setUserData] = useState({});

    const handleDeliveryDetail = async (e) => {
        if (e.target.name === "pincode") {
            setDeliveryData({ ...deliveryData, [e.target.name]: e.target.value });
            if (e.target.value.length === 6) {
                const pincodes = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
                const pincodesJson = await pincodes.json();
                if (Object.keys(pincodesJson).includes(e.target.value)) {
                    deliveryData.city = pincodesJson[e.target.value][0];
                    deliveryData.state = pincodesJson[e.target.value][1];
                }
            }
            else {
                deliveryData.city = "";
                deliveryData.state = "";
            }
        }
        setDeliveryData({ ...deliveryData, [e.target.name]: e.target.value });
    }


    // Pincode

    // Paytm payment gateway
    const initiatePayment = async () => {
        const token = localStorage.getItem('token');
        let oid = Math.floor(Math.random() * Date.now());
        console.log(deliveryData);
        const data = { cart, subtotal, oid, email: deliveryData.email, name: deliveryData.name, address: deliveryData.address, phone: deliveryData.phone, pincode: deliveryData.pincode, city: deliveryData.city, state: deliveryData.state };

        // Get a transaction token
        const preres = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": token
            },
            body: JSON.stringify(data)
        });
        const preresjson = await preres.json();
        // const txnToken = preresjson.txnToken;
        if (!preresjson.success) {
            toast.error(preresjson.error, {
                position: "bottom-left",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            if (preresjson.clearCart) {
                await clearCart();
            }
        }

        else {
            // This function is called automation on pretransaction callback when paytm payment done
            const postres = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "token": token
                },
                body: JSON.stringify(preresjson.order)
            });
            const postresjson = await postres.json();
            if (postresjson.success) {
                await clearCart();
                toast.success('Order Placed', {
                    position: "bottom-left",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setTimeout(() => {
                    router.push(`/order?orderid=${postresjson.order._id}`);
                }, 1000);
            }
            else {
                toast.error(preresjson.error, {
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


        // var config = {
        //     "root": "",
        //     "flow": "DEFAULT",
        //     "data": {
        //         "orderId": oid, /* update order id */
        //         "token": txnToken, /* update token value */
        //         "tokenType": "TXN_TOKEN",
        //         "amount": subtotal /* update amount */
        //     },
        //     "handler": {
        //         "notifyMerchant": function (eventName, data) {
        //             console.log("notifyMerchant handler function called");
        //             console.log("eventName => ", eventName);
        //             console.log("data => ", data);
        //         }
        //     }
        // };

        // if (window.Paytm && window.Paytm.CheckoutJS) {
        //     window.Paytm.CheckoutJS.onLoad(function excecuteAfterCompleteLoad() {
        //         // initialze configuration using init method 
        //         window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
        //             // after successfully updating configuration, invoke JS Checkout
        //             window.Paytm.CheckoutJS.invoke();
        //         }).catch(function onError(error) {
        //             console.log("error => ", error);
        //         });
        //     });
        // }
    }

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            router.push('/login');
        }
        else {
            let userdata = JSON.parse(localStorage.getItem('userdata'));
            if (userdata) {
                setUserData(userdata);
                deliveryData.email = userdata.email;
            }
        }
    }, [])

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
            {/* Paytm payment gateway */}
            {/* <Head>
                <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
            </Head> */}
            {/* <Script type="application/javascript" crossorigin="anonymous" src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`}> </Script> */}

            <h1 className='text-center font-bold text-3xl my-8 text-gray-600'>Checkout</h1>
            <h2 className="font-bold mb-8 text-gray-600">1. Delivery Details</h2>

            <div className="mx-auto flex">
                <div className="px-2 w-1/2">
                    <div className="relative mb-2">
                        <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                        <input type="text" onChange={handleDeliveryDetail} value={deliveryData.name} id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
                <div className="px-2 w-1/2">
                    <div className="relative mb-2">
                        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                        {
                            userData
                                ? <input type="text" value={userData.email} id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly disabled />
                                : <input type="text" onChange={handleDeliveryDetail} value={deliveryData.email} id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        }
                    </div>
                </div>
            </div>

            <div className="px-2">
                <div className="relative mb-2">
                    <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
                    <textarea id="address" onChange={handleDeliveryDetail} value={deliveryData.address} name="address" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 h-22 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                </div>
            </div>

            <div className="mx-auto flex">
                <div className="px-2 w-1/2">
                    <div className="relative mb-2">
                        <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
                        <input type="number" onChange={handleDeliveryDetail} value={deliveryData.phone} id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" minLength={10} maxLength={10} />
                    </div>
                </div>
                <div className="px-2 w-1/2">
                    <div className="relative mb-2">
                        <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
                        <input type="number" onChange={handleDeliveryDetail} value={deliveryData.pincode} id="name" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" maxLength={6} />
                    </div>
                </div>
            </div>

            <div className="mx-auto flex">
                <div className="px-2 w-1/2">
                    <div className="relative mb-2">
                        <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
                        <input type="text" onChange={handleDeliveryDetail} value={deliveryData.city} id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" disabled={true} readOnly={true} />
                    </div>
                </div>
                <div className="px-2 w-1/2">
                    <div className="relative mb-2">
                        <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
                        <input type="text" onChange={handleDeliveryDetail} value={deliveryData.state} id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" disabled={true} readOnly={true} />
                    </div>
                </div>
            </div>


            <h2 className="font-bold my-8 text-gray-600">2. Review Cart Items & Pay</h2>

            <div className="sidecart bg-pink-50 px-10 py-8">
                <div className="flex">
                    <ol className='list-decimal'>
                        {
                            Object.keys(cart).length == 0
                                ? <div className='font-semibold text-sm'>Cart is Empty!</div>
                                : Object.keys(cart).map((k, index) =>
                                    <li className='my-2' key={index + 1}>
                                        <div className='item flex justify-between'>
                                            <div>{cart[k].name} ({cart[k].size}/{cart[k].variant})</div>
                                            <div className='ml-5 flex items-center justify-center'>
                                                <AiFillMinusCircle onClick={() => removeFromCart(k, 1)} className='text-pink-500 cursor-pointer' />
                                                <span className='mx-3'>{cart[k].qty}</span>
                                                <AiFillPlusCircle onClick={() => addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)} className='text-pink-500 cursor-pointer' />
                                            </div>
                                        </div>
                                    </li>
                                )
                        }
                    </ol>
                </div>
                <div className="font-bold mt-5">Subtotal: ₹{subtotal}</div>
            </div>
            {
                Object.keys(cart).length != 0 &&
                <button onClick={initiatePayment} disabled={false} className='disabled:bg-pink-300 bg-pink-500 flex item-center rounded-md justify-center py-2 px-4 text-white font-bold mt-3 border-0 hover:bg-pink-600 focus:outline-none'>
                    Pay ₹{subtotal}
                </button>
            }
        </div >
    )
}

export default Checkout