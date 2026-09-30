const prisma = require('../config/prisma');

// 1. Submit Pengaduan Baru
exports.createPengaduan = async(req, res) => {
    try {
        const userId = req.user.id; // Ambil userId dari token yang sudah diverifikasi
        const {
            namaLengkap,
            email,
            alamat,
            provinsi,
            kota,
            noTelepon,
            jenisKasus,
            akunTerlapor,
            pesan
        } = req.body;

        // Ambil path file KTP dan Lampiran jika diunggah
        const fotoKtp = req.files && req.files.fotoKtp ? `/uploads/${req.files.fotoKtp[0].filename}` : null;
        const lampiran = req.files && req.files.lampiran ? `/uploads/${req.files.lampiran[0].filename}` : null;

        // Validasi field wajib
        if (!namaLengkap || !email || !jenisKasus || !akunTerlapor || !pesan) {
            return res.status(400).json({ message: 'Harap isi semua field wajib (*)' });
        }

        const pengaduanBaru = await prisma.pengaduan.create({
            data: {
                userId, // Menyimpan userId dari token
                namaLengkap,
                email,
                alamat,
                provinsi,
                kota,
                noTelepon,
                jenisKasus,
                akunTerlapor,
                pesan,
                fotoKtp,
                lampiran,
                // Optional: userId jika dikirim dari user yang sedang login
                userId: req.user ? req.user.id : null,
            },
        });

        res.status(201).json({
            success: true,
            message: 'Laporan pengaduan berhasil dikirim!',
            data: pengaduanBaru,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal mengirim pengaduan',
            error: error.message,
        });
    }
};

// 2. Ambil Daftar Pengaduan
// Pastikan path ini sesuai dengan struktur proyek Anda
// Mengambil riwayat pengaduan milik pengguna yang sedang login
exports.getMyReports = async(req, res) => {
    try {
        const userId = req.user.id; // Diambil dari payload token JWT via middleware

        // Contoh jika menggunakan Sequelize/ORM:
        const reports = await prisma.pengaduan.findMany({
            where: { userId: userId },
            orderBy: { createdAt: 'desc' }, // Urutkan dari yang terbaru
        });

        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({
            message: 'Gagal mengambil riwayat pengaduan',
            error: error.message
        });
    }
}; // Tambahkan metode ini di pengaduanController.js

// 1. Mengambil semua data pengaduan untuk Admin
// Tambahkan metode ini di pengaduanController.js

// 1. Mengambil semua data pengaduan untuk Admin
exports.getAllPengaduan = async(req, res) => {
    try {
        // Sesuaikan query dengan ORM/Database yang Anda gunakan:
        // jika Prisma: await prisma.pengaduan.findMany()
        // jika Mongoose: await Pengaduan.find()
        // jika Sequelize / MySQL: await Pengaduan.findAll()

        const reports = await prisma.pengaduan.findMany();
        return res.status(200).json(reports);
    } catch (error) {
        return res.status(500).json({
            message: 'Gagal mengambil seluruh data pengaduan',
            error: error.message
        });
    }
};

// 2. Mengupdate status dan tanggapan pengaduan oleh Admin
exports.updateStatusPengaduan = async(req, res) => {
    try {
        const { id } = req.params;
        const { status, tanggapan } = req.body;
        const petugasId = req.user.id; // Diambil dari middleware verifyToken (req.user)

        // 1. Update status pada tabel Pengaduan
        const updatedReport = await prisma.pengaduan.update({
            where: { id: id },
            data: {
                status: status,
            },
        });

        // 2. Jika ada isi tanggapan, simpan ke tabel Tanggapan
        if (tanggapan && tanggapan.trim() !== '') {
            await prisma.tanggapan.create({
                data: {
                    isiTanggapan: tanggapan,
                    pengaduanId: id,
                    petugasId: petugasId,
                },
            });
        }

        return res.status(200).json({
            message: 'Status pengaduan berhasil diperbarui',
            data: updatedReport,
        });
    } catch (error) {
        console.error('Error Update Pengaduan:', error);
        return res.status(500).json({
            message: 'Gagal memperbarui status pengaduan',
            error: error.message,
        });
    }
};