import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
const jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    if (req.method === "GET") {
        try {
            const user = jwt.verify(req.headers.token, process.env.JWT_SECRET);
            const data = await User.findById(user._id);
            console.log(data);
            return res.status(200).json({ success: true, userdata: data });
        }
        catch (error) {
            return res.status(400).json({ success: false, error: error });
        }
    }
    else {
        return res.status(400).json({ success: false, error: "This method not allowed" });
    }
}

export default connectDb(handler);