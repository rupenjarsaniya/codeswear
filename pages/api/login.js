import connectDb from "../../middleware/mongoose";
import User from "../../models/User";
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
    try {
        if (req.method === "POST") {
            const { email, password } = req.body;

            const userExixts = await User.findOne({ email });
            if (!userExixts) return res.status(400).json({ success: false, error: "No user found" });

            const bytesPass = CryptoJS.AES.decrypt(userExixts.password, process.env.CRYPTO_SECRET_KEY);
            const decryptPass = bytesPass.toString(CryptoJS.enc.Utf8);

            if (decryptPass === password) {
                const token = await userExixts.getJWTTOKEN();
                return res.status(200).json({ success: true, message: "Login Successfully", userdata: userExixts, token });
            }
            return res.status(400).json({ success: false, error: "Invalid Credentials" });
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