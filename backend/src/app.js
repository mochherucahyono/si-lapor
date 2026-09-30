// src/app.js
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const pengaduanRoutes = require('./routes/pengaduanRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middlewares
app.use(cors({
    origin: 'http://localhost:5173', // Sesuaikan URL frontend Anda
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Folder static untuk akses file upload (KTP/Lampiran)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
// 1. Root Route / Health Check (Mencegah Cannot GET /)
app.get('/', (req, res) => {
    res.json({
        message: 'API Pengaduan Online Rakyat (Node.js + Express) Berjalan!',
        status: 'Server Ready',
    });
});

// 2. Routes API Pengaduan
app.use('/api', authRoutes);
app.use('/api', pengaduanRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server Express running on http://localhost:${PORT}`);
});