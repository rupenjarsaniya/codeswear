import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

const Order = () => {
    const router = useRouter();

    useEffect(() => {
        if (!localStorage.getItem('token')) router.push("/");
    }, []);

    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">CODESWEAR.COM</h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Order ID: #83903</h1>
                        <p className="leading-relaxed mb-4">Your order has been placed successful</p>
                        <div className="flex flex-col">
                            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                    <div className="overflow-hidden">
                                        <table className="min-w-full">
                                            <thead className="bg-white border-b">
                                                <tr>
                                                    <th scope="col" className="text-sm font-semibold text-gray-900 px-6 py-2 text-left">
                                                        Item Description
                                                    </th>
                                                    <th scope="col" className="text-sm font-semibold text-gray-900 px-6 py-2 text-left">
                                                        Quantity
                                                    </th>
                                                    <th scope="col" className="text-sm font-semibold text-gray-900 px-6 py-2 text-left">
                                                        Price
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                                    <td className="text-sm text-gray-900 px-6 py-2 whitespace-nowrap">
                                                        Wear the code (L/Blue)
                                                    </td>
                                                    <td className="text-sm text-gray-900 px-6 py-2 whitespace-nowrap">
                                                        1
                                                    </td>
                                                    <td className="text-sm text-gray-900 px-6 py-2 whitespace-nowrap">
                                                        ₹499
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                                    <td className="text-sm text-gray-900 px-6 py-2 whitespace-nowrap">
                                                        Wear the code (L/Red)
                                                    </td>
                                                    <td className="text-sm text-gray-900 px-6 py-2 whitespace-nowrap">
                                                        1
                                                    </td>
                                                    <td className="text-sm text-gray-900 px-6 py-2 whitespace-nowrap">
                                                        ₹499
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                                    <td className="text-sm text-gray-900 px-6 py-2 whitespace-nowrap">
                                                        Wear the code (L/White)
                                                    </td>
                                                    <td className="text-sm text-gray-900 px-6 py-2 whitespace-nowrap">
                                                        1
                                                    </td>
                                                    <td className="text-sm text-gray-900 px-6 py-2 whitespace-nowrap">
                                                        ₹499
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
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