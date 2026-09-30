const express = require('express');
const router = express.Router();
const pengaduanController = require('../controllers/pengaduanController');
const { verifyToken } = require('../utils/jwt');
const { authenticateToken } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

// Route POST pengaduan dengan 2 field upload file (fotoKtp dan lampiran)
router.post(
    '/pengaduan',
    verifyToken,
    upload.fields([
        { name: 'fotoKtp', maxCount: 1 },
        { name: 'lampiran', maxCount: 1 },
    ]),
    pengaduanController.createPengaduan
);

// Route GET pengaduan milik user sendiri
router.get('/pengaduan/my-reports', verifyToken, pengaduanController.getMyReports);

// ✅ TAMBAHAN: Route GET seluruh pengaduan (untuk Admin / Overview)
router.get('/pengaduan', verifyToken, pengaduanController.getAllPengaduan);

// ✅ TAMBAHAN: Route PUT update status & tanggapan pengaduan berdasarkan ID
router.put('/pengaduan/:id', verifyToken, pengaduanController.updateStatusPengaduan);

module.exports = router;