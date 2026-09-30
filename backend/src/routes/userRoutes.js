const express = require('express');
const router = express.Router();
const { updateProfile } = require('../controllers/userController');
const { verifyToken } = require('../utils/jwt'); // sesuaikan nama fungsi export middleware Anda

// Route PUT /api/users/profile
router.put('/profile', verifyToken, updateProfile);

module.exports = router;