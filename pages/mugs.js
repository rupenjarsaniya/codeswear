import mongoose from 'mongoose';
import Link from 'next/link'
import React from 'react'
import Product from '../models/Product';

const Mugs = ({ products }) => {
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-wrap -m-4 justify-center">
                    {Object.keys(products).length === 0 ? <div>Sorry mugs are out of stock, new stock coming soon!</div> :
                        Object.keys(products).map(item => {
                            return <Link href={`/product/${products[item].slug}`} key={products[item]._id}>
                                <div className="lg:w-1/5 md:w-1/2 p-4 w-full cursor-pointer shadow-md rounded-md border-solid border border-gray-200 m-2">
                                    <a className="block relative rounded overflow-hidden">
                                        <img alt="ecommerce" className="m-auto h-[30vh] md:h-[36vh] block" src="https://m.media-amazon.com/images/I/51EhbjnQ6BL._UL1080_.jpg" />
                                    </a>
                                    <div className="mt-4">
                                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Mugs</h3>
                                        <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
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

    const products = await Product.find({ category: "mug" });

    // Make a mugs object with all sizes and colors
    let mugs = {};
    for (let item of products) {
        if (item.title in mugs) {
            console.log(mugs);
            if (!mugs[item.title].color.includes(item.color) && item.availableQuantity > 0) {
                mugs[item.title].color.push(item.color);
            }
        }
        else {
            mugs[item.title] = JSON.parse(JSON.stringify(item));
            if (item.availableQuantity > 0) {
                mugs[item.title].color = [item.color];
            }
        }
    }

    return { props: { products: JSON.parse(JSON.stringify(mugs)) } }
}
export default Mugs