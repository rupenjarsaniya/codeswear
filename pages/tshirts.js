import mongoose from 'mongoose';
import Link from 'next/link'
import React from 'react'
import Product from '../models/Product';

const Tshirts = ({ products }) => {
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-wrap -m-4 justify-center">
                    {Object.keys(products).length === 0 ? <div>Sorry t-shirts are out of stock, new stock coming soon!</div> :
                        Object.keys(products).map(item => {
                            return <Link href={`/product/${products[item].slug}`} key={products[item]._id}>
                                <div className="lg:w-1/5 md:w-1/2 p-4 w-full cursor-pointer shadow-md rounded-md border-solid border border-gray-200 m-2">
                                    <a className="block relative rounded overflow-hidden">
                                        <img alt="ecommerce" className="m-auto h-[30vh] md:h-[36vh] block" src={products[item].image} />
                                    </a>
                                    <div className="mt-4">
                                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">T-Shirts</h3>
                                        <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
                                        <div className='my-2 space-x-2'>
                                            {products[item].size.includes("S") && <span className='border border-gray-300 py-1 px-2 rounded'>S</span>}
                                            {products[item].size.includes("M") && <span className='border border-gray-300 py-1 px-2 rounded'>M</span>}
                                            {products[item].size.includes("L") && <span className='border border-gray-300 py-1 px-2 rounded'>L</span>}
                                            {products[item].size.includes("XL") && <span className='border border-gray-300 py-1 px-2 rounded'>XL</span>}
                                            {products[item].size.includes("XXL") && <span className='border border-gray-300 py-1 px-2 rounded'>XXL</span>}
                                        </div>
                                        <div className='mt-4 space-x-2'>
                                            {products[item].color.includes("red") &&
                                                <button className="border-2 border-gray-300 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                                            {products[item].color.includes("blue") &&
                                                <button className="border-2 border-gray-300 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                                            {products[item].color.includes("black") &&
                                                <button className="border-2 border-gray-300 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
                                            {products[item].color.includes("yellow") &&
                                                <button className="border-2 border-gray-300 bg-yellow-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                                            {products[item].color.includes("pink") &&
                                                <button className="border-2 border-gray-300 bg-pink-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                                            {products[item].color.includes("gray") &&
                                                <button className="border-2 border-gray-300 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                                            {products[item].color.includes("green") &&
                                                <button className="border-2 border-gray-300 bg-green-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                                        </div>
                                        <p className="mt-1">₹{products[item].price}</p>
                                    </div>
                                </div>
                            </Link>
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export async function getStaticProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI);
    }

    const products = await Product.find({ category: "tshirt" });

    // Make a tshirts object with all sizes and colors
    let tshirts = {};
    for (let item of products) {
        if (item.title in tshirts) {
            if (!tshirts[item.title].color.includes(item.color) && item.availableQuantity > 0) {
                tshirts[item.title].color.push(item.color);
            }
            if (!tshirts[item.title].size.includes(item.size) && item.availableQuantity > 0) {
                tshirts[item.title].size.push(item.size);
            }
        }
        else {
            tshirts[item.title] = JSON.parse(JSON.stringify(item));
            if (item.availableQuantity > 0) {
                tshirts[item.title].color = [item.color];
                tshirts[item.title].size = [item.size];
            }
            else {
                tshirts[item.title].color = [];
                tshirts[item.title].size = [];
            }
        }
    }

    return { props: { products: JSON.parse(JSON.stringify(tshirts)) } }
}

export default Tshirts