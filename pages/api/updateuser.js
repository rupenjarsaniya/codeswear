import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
const jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    if (req.method === "PUT") {
        try {
            console.log(req.headers.token);
            const user = jwt.verify(req.headers.token, process.env.JWT_SECRETKEY);
            const data = await User.findByIdAndUpdate(user.id, req.body, { new: true });
            return res.status(200).json({ success: true, message: "Profile Updated", userdata: data });
        }
        catch (error) {
            console.log(error);
            return res.status(400).json({ success: false, error: error });
        }
    }
    else {
        return res.status(400).json({ success: false, error: "This method not allowed" });
    }
};

export default connectDb(handler);