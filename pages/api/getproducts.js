import Product from "../../models/Product";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
    try {
        if (req.method === "GET") {
            const products = await Product.find();
            if (!products) res.status(400).json({ Empty: "There is no any product" });

            // Make a tshirts object with all sizes and colors
            let tshirts = {};
            for (let item of products) {
                if (item.title in tshirts) {
                    console.log(tshirts);
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
                }
            }

            res.status(200).json({ tshirts });
        }
        else return res.status(400).json({ error: "This method is not allowed" });
    }
    catch (error) {
        return res.status(400).json({ error: "Something went wrong" });
    }
}

export default connectDb(handler); 