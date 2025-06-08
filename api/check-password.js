export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
    const { password } = req.body;
    const CORRECT_PASSWORD = 'adorableConcept';
    if (password === CORRECT_PASSWORD) {
        res.status(200).json({ success: true });
    } else {
        res.status(200).json({ success: false });
    }
}
