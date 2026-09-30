const bcrypt = require('bcryptjs');
const prisma = require('../config/prisma');
const { generateToken } = require('../utils/jwt');

// 1. REGISTER USER
exports.register = async(req, res) => {
    try {
        const { nama, email, password, telepon } = req.body;

        if (!nama || !email || !password) {
            return res.status(400).json({ message: 'Nama, email, dan password wajib diisi!' });
        }

        // Cek apakah email sudah terdaftar
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email sudah terdaftar, silakan gunakan email lain.' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Simpan user baru ke MySQL via Prisma
        const user = await prisma.user.create({
            data: {
                nama,
                email,
                password: hashedPassword,
                telepon: telepon || null,
                role: 'WARGA', // Default role untuk registrasi publik
            },
        });

        res.status(201).json({
            success: true,
            message: 'Registrasi berhasil! Silakan login.',
            data: { id: user.id, nama: user.nama, email: user.email },
        });
    } catch (error) {
        res.status(500).json({ message: 'Gagal melakukan registrasi', error: error.message });
    }
};

// 2. LOGIN USER
exports.login = async(req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email dan password wajib diisi!' });
        }

        // Cari user berdasarkan email
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'Email atau password salah.' });
        }

        // Verifikasi password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Email atau password salah.' });
        }

        // Generate JWT Token
        const token = generateToken(user);

        res.json({
            success: true,
            message: 'Login berhasil!',
            token,
            user: {
                id: user.id,
                nama: user.nama,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Gagal melakukan login', error: error.message });
    }
};

// 3. ME / PROFILE (Cek user aktif berdasarkan token)
exports.getMe = async(req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: { id: true, nama: true, email: true, telepon: true, role: true },
        });
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ message: 'Gagal mengambil profil', error: error.message });
    }
};