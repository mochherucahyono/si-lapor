const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'rahasia_super_aman_123';

exports.generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email, role: user.role },
        JWT_SECRET, { expiresIn: '1d' } // Token berlaku 1 hari
    );
};

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({
            message: 'Akses ditolak. Header Authorization tidak ditemukan.'
        });
    }

    const token = authHeader.startsWith('Bearer ') ?
        authHeader.split(' ')[1] :
        authHeader;

    if (!token || token === 'undefined' || token === 'null') {
        return res.status(401).json({
            message: 'Akses ditolak. Token tidak valid atau Anda belum login.'
        });
    }

    try {
        // Gunakan JWT_SECRET konstan yang sama
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({
            message: 'Token kadaluwarsa atau tidak valid.',
            error: err.message
        });
    }
};