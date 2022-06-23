import Forgot from "../../models/Forgot";
import User from "../../models/User";
import connectDb from "../../middleware/mongoose";

const CryptoJS = require("crypto-js");

const handler = async (req, res) => {
    if (req.method === "POST") {
        if (req.body.canSendEmail) {
            let token = "echhnfnpc4n98yn4ynhuiehcnhf3298u";

            let message = `Password reset link: http://localhost:3000/forgot?token=${token}`;

            const findForgot = await Forgot.findOne({ email: req.body.email });

            if (findForgot) return res.status(400).json({ success: false, error: "Password reset instruction already sended" });

            const forgot = new Forgot({
                email: req.body.email,
                token: token
            });

            const forgotTokenSave = await forgot.save();

            if (!forgotTokenSave) return res.status(400).json({ success: false, error: "Something went wrong" });

            res.status(200).json({ success: true, message });
        }
        else {
            if (req.body.password !== req.body.confirmpassword) return res.status(400).json({ success: false, error: "Passwords not matched" });

            const getToken = await Forgot.findOne({ token: req.headers.token });

            if (!getToken) return res.status(400).json({ success: false, error: "Password reset link was expires or invalid" });

            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.CRYPTO_SECRET_KEY).toString();

            const saveUserPass = await User.findOneAndUpdate({ email: getToken.email }, { password: req.body.password }, { new: true, runValidators: true });

            const deleteToken = await getToken.remove();

            if (!saveUserPass || !deleteToken) return res.status(400).json({ success: false, error: "Something went wrong" });

            return res.status(200).json({ success: true, message: "Password Changed successsfully" });
        }
    }
    else {
        res.status(400).json({ success: false, error: "Something went wrong" });
    }
}

export default connectDb(handler);
