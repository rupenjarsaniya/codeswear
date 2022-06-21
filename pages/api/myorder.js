import connectDb from "../../middleware/mongoose";
import Order from "../../models/Order";
const jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    try {
        const user = jwt.verify(req.headers.token, process.env.JWT_SECRETKEY);
        console.log(user);

        if (!user) return res.status(500).json({ success: false, error: "User not valid" });

        const orders = await Order.find({ userId: user.id });

        return res.status(200).json({ orders });
    }
    catch (error) {
        return res.status(400).json({ error });
    }
}

export default connectDb(handler);