import mongoose from 'mongoose';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Product from '../../models/Product';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Error from 'next/error';

const Slug = ({ error, addToCart, buyNow, variants, product }) => {
    const router = useRouter();
    const { slug } = router.query;

    // useStates
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const [pin, setPin] = useState();
    const [service, setService] = useState();

    // Pincode
    const checkServicibility = async () => {
        const pincodes = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
        const pincodesJson = await pincodes.json();
        if (Object.keys(pincodesJson.pincodes).includes(pin)) {
            setService(true);
            toast.success('This pincode is serviceable', {
                position: "bottom-left",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else {
            setService(false);
            toast.error('Sorry! Pincode is not serviceable', {
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

    const handlePin = (e) => setPin(e.target.value);

    // Product handler
    const changeProduct = (newColor, newSize) => {
        let url = `${process.env.NEXT_PUBLIC_HOST}/product/${variants[newColor][newSize]['slug']}`;
        router.push(url);
    }

    useEffect(() => {
        if (!error) {
            setColor(product.color);
            setSize(product.size);
        }
    }, [router.query]);

    if (error === 404) return <Error statusCode={404} />

    return (
        <>
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
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-16 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto object-cover object-top rounded" src={product.image} />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">CODESWEAR.COM</h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title} ({product.size}/{product.color})</h1>
                            <p className="leading-relaxed">{product.description}</p>
                            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                                <div className="flex">
                                    <span className="mr-3">Color</span>
                                    {size && Object.keys(variants).includes("red") && Object.keys(variants['red']).includes(size) && <button onClick={(e) => changeProduct("red", size)} className={`border-2 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none ${color === "red" ? 'border-black' : 'border-gray-300'}`}></button>}
                                    {size && Object.keys(variants).includes("blue") && Object.keys(variants['blue']).includes(size) && <button onClick={(e) => changeProduct("blue", size)} className={`border-2 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none ${color === "blue" ? 'border-black' : 'border-gray-300'}`}></button>}
                                    {size && Object.keys(variants).includes("black") && Object.keys(variants['black']).includes(size) && <button onClick={(e) => changeProduct("black", size)} className={`border-2 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none ${color === "black" ? 'border-black' : 'border-gray-300'}`}></button>}
                                    {size && Object.keys(variants).includes("yellow") && Object.keys(variants['yellow']).includes(size) && <button onClick={(e) => changeProduct("yellow", size)} className={`border-2 ml-1 bg-yellow-700 rounded-full w-6 h-6 focus:outline-none ${color === "yellow" ? 'border-black' : 'border-gray-300'}`}></button>}
                                    {size && Object.keys(variants).includes("pink") && Object.keys(variants['pink']).includes(size) && <button onClick={(e) => changeProduct("pink", size)} className={`border-2 ml-1 bg-pink-700 rounded-full w-6 h-6 focus:outline-none ${color === "pink" ? 'border-black' : 'border-gray-300'}`}></button>}
                                    {size && Object.keys(variants).includes("gray") && Object.keys(variants['gray']).includes(size) && <button onClick={(e) => changeProduct("gray", size)} className={`border-2 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none ${color === "gray" ? 'border-black' : 'border-gray-300'}`}></button>}
                                    {size && Object.keys(variants).includes("green") && Object.keys(variants['green']).includes(size) && <button onClick={(e) => changeProduct("green", size)} className={`border-2 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none ${color === "green" ? 'border-black' : 'border-gray-300'}`}></button>}
                                </div>
                                <div className="flex ml-6 items-center">
                                    <span className="mr-3">Size</span>
                                    <div className="relative">
                                        <select value={size} onChange={(e) => changeProduct(color, e.target.value)} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pl-3 pr-10">
                                            {color && Object.keys(variants[color]).includes("S") && <option value="S">S</option>}
                                            {color && Object.keys(variants[color]).includes("M") && <option value="M">M</option>}
                                            {color && Object.keys(variants[color]).includes("L") && <option value="L">L</option>}
                                            {color && Object.keys(variants[color]).includes("XL") && <option value="XL">XL</option>}
                                            {color && Object.keys(variants[color]).includes("XXL") && <option value="XXL">XXL</option>}
                                        </select>
                                        <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                                                <path d="M6 9l6 6 6-6"></path>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div >
                            <div className="flex justify-between">
                                <span className="title-font font-medium text-2xl text-gray-900">
                                    {product.availableQuantity <= 0 ? "Out of Stock" : `₹${product.price}`}
                                </span>
                                <div className='flex space-x-3'>
                                    <Link href={'/checkout'}>
                                        <button disabled={product.availableQuantity <= 0} onClick={() => buyNow(slug, 1, product.price, product.title, size, color)} className="flex text-white disabled:bg-pink-300 bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">Buy Now</button>
                                    </Link>
                                    <button disabled={product.availableQuantity <= 0} onClick={() => addToCart(slug, 1, product.price, product.title, size, color)} className="flex text-white disabled:bg-pink-300 bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">Add to Cart</button>
                                    <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="mt-10">
                                <input type="text" name="pincode" placeholder='Enter Pincode' className='border-b-[1px] border-pink-500 w-50 mr-3 focus:outline-none' onChange={handlePin} maxLength={6} />
                                <button className="text-white bg-pink-500 border-0 py-1 px-6 focus:outline-none hover:bg-pink-600 rounded" onClick={checkServicibility}>Check</button>
                                {
                                    service && service != null && <div className='text-green-500 mt-3 text-sm'>This pincode is serviceable</div>
                                }
                                {
                                    !service && service != null && <div className='text-red-500 mt-3 text-sm'>Sorry! Pincode is not serviceable</div>
                                }
                            </div>
                        </div >
                    </div >
                </div >
            </section >
        </>
    )
}

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI);
    }

    const product = await Product.findOne({ slug: context.query.slug });
    if (!product) return { props: { error: 404 } }
    const variants = await Product.find({ title: product.title });

    let colorSizeSlug = {};
    for (let item of variants) {
        if (Object.keys(colorSizeSlug).includes(item.color)) {
            colorSizeSlug[item.color][item.size] = { slug: item.slug };
        }
        else {
            colorSizeSlug[item.color] = {};
            colorSizeSlug[item.color][item.size] = { slug: item.slug };
        }
    }

    return { props: { variants: JSON.parse(JSON.stringify(colorSizeSlug)), product: JSON.parse(JSON.stringify(product)) } }
}

export default Slug