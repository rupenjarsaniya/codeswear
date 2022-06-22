export default function handler(req, res) {
    const pincodes = {
        "382418": ["Ahmedabad", "Gujarat"],
        "721302": ["Kharagpur", "Weat Bengal"],
        "560017": ["Banglore", "Karnataka"]
    }
    res.status(200).json({ pincodes });
}