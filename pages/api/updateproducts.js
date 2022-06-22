import Product from "../../models/Product";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
    try {
        if (req.method === "PUT") {
            console.log(req.body);
            if (req.body === "") return res.status(400).json({ Error: "Parameters must not empty" });
            for (let index = 0; index < req.body.length; index++) {
                await Product.findByIdAndUpdate(req.body[index]._id, req.body[index]);
            }
            return res.status(200).json({ success: "Product has been updated" });
        }
        else return res.status(400).json({ error: "This method is not allowed" });
    }
    catch (error) {
        return res.status(400).json({ error: "Something went wrong" });
    }
}

export default connectDb(handler);