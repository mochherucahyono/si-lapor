const { verifyToken } = require('../utils/jwt');

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer <TOKEN>"

    if (!token) {
        return res.status(401).json({ message: 'Akses ditolak. Silakan login terlebih dahulu.' });
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded; // Menyimpan data payload user ke request
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Token tidak valid atau telah kadaluwarsa.' });
    }
};