import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
const jwt = require('jsonwebtoken');
const CryptoJS = require("crypto-js");

const handler = async (req, res) => {
    if (req.method === "PUT") {
        try {
            if (req.body.newpassword !== req.body.newconfirmpassword) return res.status(400).json({ success: false, error: "Passwords not matched" });

            if (req.body.currentpassword === req.body.newpassword) return res.status(400).json({ success: false, error: "New password cannot be same as current password" });

            const user = jwt.verify(req.headers.token, process.env.JWT_SECRETKEY);

            const data = await User.findById(user.id);

            const bytesPass = CryptoJS.AES.decrypt(data.password, process.env.CRYPTO_SECRET_KEY);

            const decryptPass = bytesPass.toString(CryptoJS.enc.Utf8);

            if (req.body.currentpassword !== decryptPass) return res.status(400).json({ success: false, error: "Current password is wrong" });

            req.body.newpassword = CryptoJS.AES.encrypt(req.body.newpassword, process.env.CRYPTO_SECRET_KEY).toString();

            data.password = req.body.newpassword;

            await data.save();

            return res.status(200).json({ success: true, message: "Password changed", userdata: data });
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