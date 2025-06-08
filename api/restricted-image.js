import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
    let body = req.body;
    if (typeof body === 'string') {
        try {
            body = JSON.parse(body);
        } catch {
            return res.status(400).json({ success: false, message: 'Invalid JSON' });
        }
    }
    const { password, filename } = body;
    const CORRECT_PASSWORD = process.env.RESTRICTED_PASSWORD;
    if (password !== CORRECT_PASSWORD) {
        return res.status(403).json({ success: false, message: 'Forbidden' });
    }
    const imagePath = path.join(process.cwd(), 'private', 'Art', 'FullArt', filename);
    if (!fs.existsSync(imagePath)) {
        return res.status(404).json({ success: false, message: 'Not found' });
    }
    const imageBuffer = fs.readFileSync(imagePath);
    const ext = path.extname(filename).toLowerCase();
    let mime = 'image/jpeg';
    if (ext === '.png') mime = 'image/png';
    if (ext === '.jpg' || ext === '.jpeg') mime = 'image/jpeg';
    res.setHeader('Content-Type', mime);
    res.send(imageBuffer);
}
