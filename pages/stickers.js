import React from 'react'
import Link from 'next/link'
import Product from '../models/Product';
import mongoose from 'mongoose';

const Stickers = ({ products }) => {
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-wrap -m-4 justify-center">
                    {
                        products.length === 0 ? <div>Sorry stickers are out of stock, new stock coming soon!</div> :
                            products.map(item => {
                                return <Link href={`/product/${item.slug}`} key={item._id}>
                                    <div className="lg:w-1/5 md:w-1/2 p-4 w-full cursor-pointer shadow-md rounded-md border-solid border border-gray-200 m-2">
                                        <a className="block relative rounded overflow-hidden">
                                            <img alt="ecommerce" className="m-auto h-[30vh] md:h-[36vh] block" src="https://m.media-amazon.com/images/I/51EhbjnQ6BL._UL1080_.jpg" />
                                        </a>
                                        <div className="mt-4">
                                            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Stickers</h3>
                                            <h2 className="text-gray-900 title-font text-lg font-medium">{item.title}</h2>
                                            <p className="mt-1">₹{item.price}</p>
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

    const products = await Product.find({ category: "sticker" });
    if (!products) res.status(400).json({ Empty: "There is no any product" });

    return { props: { products: JSON.parse(JSON.stringify(products)) } }
}

export default Stickers