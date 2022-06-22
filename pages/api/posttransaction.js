// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Order from "../../models/Order";
import Product from "../../models/Product";

export default async function handler(req, res) {
    try {
        // Change order's status
        // const order = await Order.findByIdAndUpdate({orderId: req.body.ORDERID}, { status: "Paid" }); //when pretransaction call this api
        const order = await Order.findByIdAndUpdate(req.body._id, { status: "Paid" });
        if (order) {
            let products = req.body.products;
            for (let item in products) {
                await Product.findOneAndUpdate({ slug: item }, { $inc: { availableQuantity: - products[item].qty } });
            }
        }
        return res.status(200).json({ success: true, order });
    }
    catch (error) {
        return res.status(400).json({ success: false, error: "Something went wrong" });
    }
}
