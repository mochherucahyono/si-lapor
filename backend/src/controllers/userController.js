const prisma = require('../config/prisma');

const updateProfile = async(req, res) => {
    try {
        // Ambil ID user dari req.user (hasil decode jwt dari middleware)
        const userId = req.user.id;
        const { nama, email } = req.body;

        if (!nama || !email) {
            return res.status(400).json({ message: 'Nama dan email wajib diisi.' });
        }

        // 1. Cek apakah email sudah dipakai oleh user lain
        const existingUser = await prisma.user.findFirst({
            where: {
                email: email,
                NOT: { id: userId }
            }
        });

        if (existingUser) {
            return res.status(400).json({ message: 'Email sudah digunakan oleh akun lain.' });
        }

        // 2. Update data user di database MySQL via Prisma
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { nama, email },
            select: { id: true, nama: true, email: true, role: true }
        });

        return res.status(200).json({
            success: true,
            message: 'Profil berhasil diperbarui!',
            data: updatedUser
        });

    } catch (error) {
        console.error('Error updateProfile:', error);
        return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
    }
};

module.exports = { updateProfile };