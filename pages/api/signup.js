import connectDb from "../../middleware/mongoose";
import User from "../../models/User";
const CryptoJS = require("crypto-js");

const handler = async (req, res) => {
    try {

        if (req.method === "POST") {
            const userExixts = await User.findOne({ email: req.body.email });
            if (userExixts) return res.status(400).json({ success: false, error: "Email is already in use" });

            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.CRYPTO_SECRET_KEY).toString();

            const createUser = new User(req.body);

            const token = await createUser.getJWTTOKEN();

            const saveUser = await createUser.save();

            if (!saveUser) return res.status(400).json({ success: false, error: "Some error to create an account, try after sometime" });
            return res.status(200).json({ success: true, message: "Account created successsfully", token });
        }
        else {
            return res.status(400).json({ success: false, error: "This method is not allowed" });
        }
    }
    catch (error) {
        return res.status(400).json({ error });
    }
}

export default connectDb(handler);