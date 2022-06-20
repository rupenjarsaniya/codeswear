import React from 'react'
import Link from 'next/link'
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { GrClose } from 'react-icons/gr';
import { BsFillBagCheckFill } from 'react-icons/bs';

const Checkout = ({ cart, addToCart, removeFromCart, subtotal }) => {
    return (
        <div className='container px-3 sm:px-40'>
            <h1 className='text-center font-bold text-3xl my-8 text-gray-600'>Checkout</h1>
            <h2 className="font-bold mb-8 text-gray-600">1. Delivery Details</h2>

            <div className="mx-auto flex">
                <div className="px-2 w-1/2">
                    <div className="relative mb-2">
                        <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                        <input type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
                <div className="px-2 w-1/2">
                    <div className="relative mb-2">
                        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                        <input type="text" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
            </div>

            <div className="px-2">
                <div className="relative mb-2">
                    <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
                    <textarea id="address" name="address" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 h-22 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                </div>
            </div>

            <div className="mx-auto flex">
                <div className="px-2 w-1/2">
                    <div className="relative mb-2">
                        <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
                        <input type="number" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" minLength={10} maxLength={10} />
                    </div>
                </div>
                <div className="px-2 w-1/2">
                    <div className="relative mb-2">
                        <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
                        <input type="number" id="name" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" minLength={6} maxLength={6} />
                    </div>
                </div>
            </div>

            <div className="mx-auto flex">
                <div className="px-2 w-1/2">
                    <div className="relative mb-2">
                        <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
                        <input type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
                <div className="px-2 w-1/2">
                    <div className="relative mb-2">
                        <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
                        <input type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
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
                <Link href={'/checkout'}>
                    <button className='bg-pink-500 flex item-center rounded-md justify-center py-2 px-4 text-white font-bold mt-3 border-0 hover:bg-pink-600 focus:outline-none'>
                        Pay ₹{subtotal}
                    </button>
                </Link>
            }
        </div >
    )
}

export default Checkout