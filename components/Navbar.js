import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { AiOutlineShoppingCart, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { GrClose } from 'react-icons/gr';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { useRef } from 'react';

const Navbar = ({ user, logout, cart, addToCart, removeFromCart, clearCart, subtotal }) => {
    const sideCart = useRef();
    const [dropdown, setDropdown] = useState(false);

    const toggleSideCart = () => {
        if (sideCart.current.classList.contains('translate-x-full')) {
            sideCart.current.classList.remove('translate-x-full');
            sideCart.current.classList.add('translate-x-0');
        }
        else {
            sideCart.current.classList.remove('translate-x-0');
            sideCart.current.classList.add('translate-x-full');
        }
    }

    return (
        <div className="flex flex-col md:flex-row md:justify-start justify-center items-center sticky top-0 bg-white z-10 shadow-md py-2">
            <div className='logo mr-auto md:mx-5'>
                <Link href={'/'}>
                    <a>
                        <Image src="/logo.jpg" alt="logo" width={200} height={40} />
                    </a>
                </Link>
            </div>
            <ul className='flex space-x-5 font-bold my-2'>
                <Link href={'/tshirts'}>
                    <a>
                        <li className='hover:text-pink-600'>Tshirts</li>
                    </a>
                </Link>
                <Link href={'/hoodies'}>
                    <a>
                        <li className='hover:text-pink-600'>Hoodies</li>
                    </a>
                </Link>
                <Link href={'/stickers'}>
                    <a>
                        <li className='hover:text-pink-600'>Stickers</li>
                    </a>
                </Link>
                <Link href={'/mugs'}>
                    <a>
                        <li className='hover:text-pink-600'>Mugs</li>
                    </a>
                </Link>
            </ul>
            <div className="cart mx-5 absolute top-4 right-0 flex items-center space-x-3">
                {
                    user.value ?
                        <div onMouseOver={() => { setDropdown(true) }}>
                            <p className='bg-pink-600 rounded-md text-white py-1 px-2 hover:bg-pink-700'>Account</p>
                            {
                                dropdown && <div onMouseLeave={() => { setDropdown(false) }} className='absolute right-9 px-2 py-2 bg-pink-100 rounded-md text-sm font-semibold w-36'>
                                    <ul>
                                        <Link href={'/account'}><li className='py-1 cursor-pointer hover:text-pink-600'>My Account</li></Link>
                                        <Link href={'/order'}><li className='py-1 cursor-pointer hover:text-pink-600'>Orders</li></Link>
                                        <li className='py-1 cursor-pointer hover:text-pink-600' onClick={logout}>Log out</li>
                                    </ul>
                                </div>
                            }
                        </div> :
                        <button className='bg-pink-600 rounded-md text-white py-1 px-2 hover:bg-pink-700'><Link href={'/login'}>login</Link></button>
                }
                <a>
                    {
                        Object.keys(cart).length != 0 && <span className='bg-red-700 text-white px-[5px] text-[12px] rounded-full absolute top-[-10px] right-[-10px]'>{Object.keys(cart).length}</span>
                    }
                    <AiOutlineShoppingCart className='text-2xl' onClick={toggleSideCart} />
                </a>
            </div>

            {/* Sidebar */}

            <div ref={sideCart} className="sidecart bg-pink-100 overflow-y-scroll absolute top-0 right-0 z-20 px-10 py-5 w-[335px] h-[100vh] translate-x-full transform transition-transform">
                <h2 className='font-bold text-xl text-center mt-5'>Your Cart</h2>
                <GrClose className='absolute right-4 top-4 text-pink-500 cursor-pointer text-xl' onClick={toggleSideCart} />
                <div className="flex">
                    <ol className='list-decimal font-semibold'>
                        {
                            Object.keys(cart).length == 0
                                ? <div className='font-semibold text-sm my-5'>Cart is Empty!</div>
                                : Object.keys(cart).map((k, index) => <li key={index + 1}>
                                    <div className='item flex my-5 w-full'>
                                        <div className='w-2/3'>{cart[k].name} ({cart[k].size}/{cart[k].variant})</div>
                                        <div className='w-1/3 flex items-center justify-center'>
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
                <div className="flex justify-between items-center">
                    <button className='bg-pink-500 flex item-center rounded-md justify-center py-2 px-4 text-white font-bold m-auto mr-1 mt-3 border-0 hover:bg-pink-600 focus:outline-none'>
                        <BsFillBagCheckFill className='mt-1 mr-2' /><Link href={'/checkout'}>Checkout</Link>
                    </button>
                    <button onClick={clearCart} className='bg-pink-500 flex item-center rounded-md justify-center py-2 px-4 text-white font-bold m-auto mt-3 border-0 hover:bg-pink-600 focus:outline-none'>
                        Clear Cart
                    </button>
                </div>
            </div>
        </div >
    )
}

export default Navbar