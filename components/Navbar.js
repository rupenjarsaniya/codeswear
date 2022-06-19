import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { AiOutlineShoppingCart, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { GrClose } from 'react-icons/gr';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { useRef } from 'react';

const Navbar = ({ cart, addToCart, removeFromCart, clearCart, subtotal }) => {
    const sideCart = useRef();

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
            <div className='logo mx-5'>
                <Link href={'/'}>
                    <a>
                        <Image src="/logo.jpg" alt="logo" width={200} height={40} />
                    </a>
                </Link>
            </div>
            <ul className='flex space-x-5 font-bold my-2'>
                <Link href={'/tshirts'}>
                    <a>
                        <li>Tshirts</li>
                    </a>
                </Link>
                <Link href={'/hoodies'}>
                    <a>
                        <li>Hoodies</li>
                    </a>
                </Link>
                <Link href={'/stickers'}>
                    <a>
                        <li>Stickers</li>
                    </a>
                </Link>
                <Link href={'/mugs'}>
                    <a>
                        <li>Mugs</li>
                    </a>
                </Link>
            </ul>
            <div className="cart mx-5 absolute right-0">
                <Link href={"/"}>
                    <a>
                        <AiOutlineShoppingCart className='text-2xl' onClick={toggleSideCart} />
                    </a>
                </Link>
            </div>

            {/* Sidebar */}

            <div ref={sideCart} className="sidecart bg-pink-100 absolute top-0 right-0 z-20 px-10 py-5 w-100 h-screen translate-x-0 transform transition-transform">
                <h2 className='font-bold text-xl text-center mt-5'>Your Cart</h2>
                <GrClose className='absolute right-4 top-4 text-pink-500 cursor-pointer text-xl' onClick={toggleSideCart} />
                <div className="flex">
                    <ol className='list-decimal font-semibold'>
                        {
                            Object.keys(cart).length == 0
                                ? <div className='font-semibold text-sm my-5'>Cart is Empty!</div>
                                : Object.keys(cart).map((k, index) => <li key={index + 1}>
                                    <div className='item flex my-5 w-full'>
                                        <div className='w-2/3'>{cart[k].name}</div>
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
                        <BsFillBagCheckFill className='mt-1 mr-2' />Checkout
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