// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Order from "../../models/Order";

export default async function handler(req, res) {
    // Change order's status
    // const order = await Order.findByIdAndUpdate({orderId: req.body.ORDERID}, { status: "Paid" }); //when pretransaction call this api
    const order = await Order.findByIdAndUpdate(req.body, { status: "Paid" });
    if (!order) return res.status(400).json({ success: false, error: "Something went wrong" });
    return res.status(200).json({ success: true });
}
