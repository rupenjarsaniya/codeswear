import Product from "../../models/Product";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
    try {
        if (req.method === "POST") {
            if (req.body === "") return res.status(400).json({ Error: "Parameters must not empty" });
            for (let index = 0; index < req.body.length; index++) {
                const slugCheck = await Product.findOne({ slug: req.body[index].slug });
                if (slugCheck) return res.status(400).json({ error: "Slug is already declared" });
                const createProduct = new Product({
                    title: req.body[index].title,
                    slug: req.body[index].slug,
                    description: req.body[index].description,
                    image: req.body[index].image,
                    category: req.body[index].category,
                    size: req.body[index].size,
                    color: req.body[index].color,
                    price: req.body[index].price,
                    availableQuantity: req.body[index].availableQuantity,
                });
                await createProduct.save();
            }
            return res.status(200).json({ success: "Product has been saved" });
        }
        else return res.status(400).json({ error: "This method is not allowed" });
    }
    catch (error) {
        return res.status(400).json({ error });
    }
}

export default connectDb(handler);