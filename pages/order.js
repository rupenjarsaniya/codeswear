import React from 'react'

const Order = () => {
    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">CODESWEAR.COM</h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Order ID: #83903</h1>
                        <p className="leading-relaxed mb-4">Your order has been placed successful</p>
                        <table className="w-full border-separate">
                            <thead>
                                <tr>
                                    <th className='text-left'>Item Description</th>
                                    <th className='text-right'>Quantity</th>
                                    <th className='text-right'>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='text-left'>Wear the code (L/Blue)</td>
                                    <td className='text-right'>1</td>
                                    <td className='text-right'>₹499</td>
                                </tr>
                                <tr>
                                    <td>Wear the code (L/Red)</td>
                                    <td className='text-right'>1</td>
                                    <td className='text-right'>₹499</td>
                                </tr>
                                <tr>
                                    <td>Wear the code (L/White)</td>
                                    <td className='text-right'>1</td>
                                    <td className='text-right'>₹499</td>
                                </tr>
                            </tbody>
                        </table>
                        <p className="mt-5 title-font font-semibold text-xl text-gray-900">Subtotal: ₹499.00</p>
                        <button className="flex mt-3 text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">Track Order</button>
                    </div>
                    <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400" />
                </div>
            </div>
        </section>
    )
}

export default Order