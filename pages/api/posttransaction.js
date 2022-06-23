// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Order from "../../models/Order";
import Product from "../../models/Product";
// import PaytmChecksum from "paytmchecksum";

export default async function handler(req, res) {
    try {

        // Paytm Checksum
        // var paytmChecksum = "";
        // var paytmParams = {};
        // const received_data = req.body;
        // for (let key in received_data) {
        //     if (key === 'CHECKSUMHASH') {
        //         paytmChecksum = received_data[key];
        //     }
        //     else {
        //         paytmChecksum[key] = received_data[key];
        //     }
        // }
        // var isValidChecksum = PaytmChecksum.verifySignature(paytmParams, process.env.PAYTM_MKEY, paytmChecksum);
        // if (!isValidChecksum) {
        //     console.log("Checksum Matched");
        //     return res.status(500).json({ error: "Some error occured" });
        // }





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
