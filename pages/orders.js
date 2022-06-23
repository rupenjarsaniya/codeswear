import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link';

const Orders = () => {
    const router = useRouter();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchOrders = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorder`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "token": token
                }
            });
            const resjson = await res.json();
            setOrders(resjson.orders);
        }
        if (!token) router.push("/");
        else {
            fetchOrders();
        }
    }, []);

    return (
        <div className='md:mx-20 min-h-screen'>
            <h1 className='py-8 text-center font-bold text-2xl'>My Orders</h1>
            {
                orders.length === 0 ? <div className='text-center'>No Ordered Placed</div>
                    :
                    <div className="flex flex-col">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                    <table className="min-w-full overflow-scroll">
                                        <thead className="bg-white border-b">
                                            <tr>
                                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                    #OrderId
                                                </th>
                                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                    Products
                                                </th>
                                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                    Amount
                                                </th>
                                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                    Ordered Date
                                                </th>
                                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                orders &&
                                                orders.map((item) => {
                                                    return <tr key={item._id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.orderId}</td>
                                                        <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap">
                                                            {`${item.products[Object.keys(item.products)[0]].name} (${item.products[Object.keys(item.products)[0]].size}/${item.products[Object.keys(item.products)[0]].variant})`}
                                                            {Object.keys(item.products).length > 1 && " ..."}
                                                        </td>
                                                        <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap">
                                                            ₹{item.amount}
                                                        </td>
                                                        <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap">
                                                            {
                                                                new Date(item.createdAt).toLocaleString()
                                                            }
                                                        </td>
                                                        <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap">
                                                            <Link href={`/order/?orderid=${item._id}`}><a className='hover:text-pink-600'>View Details</a></Link>
                                                        </td>
                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default Orders