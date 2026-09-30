<template>
  <div class="min-h-screen bg-[#fffff] py-10 px-4 sm:px-6 lg:px-8 font-sans text-stone-800">
    <div class="max-w-6xl mx-auto">
      
      <!-- Layout 2 Kolom (Deskripsi Left & Form Right) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        <!-- KOLOM KIRI: Panduan & Informasi Pengaduan -->
        <div class="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          <div>
            <span class="text-xs font-semibold uppercase tracking-wider text-stone-500 bg-stone-200/60 px-2.5 py-1 rounded-md">Layanan Laporan</span>
            <h1 class="text-3xl font-serif text-stone-900 mt-3 leading-snug">
              Lapor Kejahatan Siber: Melindungi Ruang Digital Bersama
            </h1>
            <p class="text-xs text-stone-600 mt-3 leading-relaxed font-light">
              Laporan Anda menjadi pijakan awal untuk menghentikan berbagai kejahatan siber. Kami berkomitmen menangani setiap aduan secara akurat, terukur, dan terpercaya.
            </p>
          </div>

          <!-- Panduan Penyusunan Laporan -->
          <div class="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <h2 class="text-sm font-medium text-stone-900 flex items-center gap-2">
              <svg class="w-4 h-4 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Panduan Pengisian Laporan
            </h2>

            <div class="space-y-3.5 text-xs text-stone-600 font-light leading-relaxed">
              <div class="flex gap-3">
                <span class="w-5 h-5 rounded-full bg-stone-100 text-stone-800 font-medium flex items-center justify-center shrink-0">1</span>
                <div>
                  <strong class="font-medium text-stone-800">Uraian Kronologi:</strong> 
                  Sampaikan secara urut waktu kejadian, dampak insiden, serta detail informasi kontekstual yang terjadi.
                </div>
              </div>

              <div class="flex gap-3">
                <span class="w-5 h-5 rounded-full bg-stone-100 text-stone-800 font-medium flex items-center justify-center shrink-0">2</span>
                <div>
                  <strong class="font-medium text-stone-800">Identitas Terlapor:</strong> 
                  Sertakan identitas akun terduga seperti nomor rekening, kontak seluler, tautan profil, atau *username* media sosial.
                </div>
              </div>

              <div class="flex gap-3">
                <span class="w-5 h-5 rounded-full bg-stone-100 text-stone-800 font-medium flex items-center justify-center shrink-0">3</span>
                <div>
                  <strong class="font-medium text-stone-800">Kelengkapan Bukti Otentik:</strong> 
                  Unggah tangkapan layar, bukti transfer, sertifikat digital, atau berkas pendukung yang sah untuk mempermudah penanganan.
                </div>
              </div>
            </div>
          </div>

          <!-- Peringatan Kerahasiaan -->
          <div class="p-4 bg-stone-100/70 border border-stone-200/80 rounded-xl text-xs text-stone-600 flex items-start gap-3">
            <svg class="w-4 h-4 text-stone-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <p class="font-light">
              Kerahasiaan identitas dan data pribadi Anda dijamin serta dilindungi sepenuhnya sesuai standar privasi yang berlaku.
            </p>
          </div>
        </div>

        <!-- KOLOM KANAN: Form Pengaduan -->
        <div class="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-stone-200">
          
          <!-- Header Form & Link Informasi Tambahan -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-stone-100 gap-2">
            <div>
              <h2 class="text-xl font-serif text-stone-900">Formulir Laporan</h2>
              <p class="text-xs text-stone-500 font-light mt-0.5">Isi seluruh bidang bertanda bintang (<span class="text-red-500">*</span>)</p>
            </div>
          </div>

          <!-- Alert Sukses / Error -->
          <!-- Toast Notification Floating (Pojok Kanan Bawah) -->
          <div class="fixed bottom-5 right-5 z-50 max-w-sm w-full pointer-events-none">
            <Transition
              enter-active-class="transition duration-300 ease-out"
              enter-from-class="transform translate-y-2 opacity-0 scale-95"
              enter-to-class="transform translate-y-0 opacity-100 scale-100"
              leave-active-class="transition duration-200 ease-in"
              leave-from-class="transform translate-y-0 opacity-100 scale-100"
              leave-to-class="transform translate-y-2 opacity-0 scale-95"
            >
              <div 
                v-if="alert.message" 
                :class="alert.type === 'success' ? 'border-stone-200' : 'border-red-200'"
                class="pointer-events-auto flex items-center gap-3 p-4 bg-white border shadow-xl rounded-2xl text-xs text-stone-800"
              >
                <!-- Ikon Sukses (Check) -->
                <CheckCircle2 v-if="alert.type === 'success'" class="w-5 h-5 text-emerald-500 shrink-0" />
                
                <!-- Ikon Error (Warning) -->
                <AlertCircle v-else class="w-5 h-5 text-red-500 shrink-0" />

                <span class="font-medium leading-normal">{{ alert.message }}</span>
              </div>
            </Transition>
          </div>

          <form @submit.prevent="submitForm" class="space-y-4">
            <!-- Nama Lengkap & Email -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-medium text-stone-700 mb-1">Nama Lengkap <span class="text-red-500">*</span></label>
                <input v-model="form.namaLengkap" type="text" placeholder="Masukkan nama lengkap" required class="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-800 text-sm outline-none focus:border-stone-800 focus:ring-1 focus:ring-stone-800 transition duration-200" />
              </div>
              <div>
                <label class="block text-xs font-medium text-stone-700 mb-1">Email <span class="text-red-500">*</span></label>
                <input v-model="form.email" type="email" placeholder="nama@email.com" required class="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-800 text-sm outline-none focus:border-stone-800 focus:ring-1 focus:ring-stone-800 transition duration-200" />
              </div>
            </div>

            <!-- Alamat -->
            <div>
              <label class="block text-xs font-medium text-stone-700 mb-1">Alamat Domisili</label>
              <input v-model="form.alamat" type="text" placeholder="Masukkan alamat domisili Anda" class="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-800 text-sm outline-none focus:border-stone-800 focus:ring-1 focus:ring-stone-800 transition duration-200" />
            </div>

            <!-- Provinsi & Kota -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-medium text-stone-700 mb-1">Provinsi</label>
                <input v-model="form.provinsi" type="text" placeholder="Ketik provinsi" class="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-800 text-sm outline-none focus:border-stone-800 focus:ring-1 focus:ring-stone-800 transition duration-200" />
              </div>
              <div>
                <label class="block text-xs font-medium text-stone-700 mb-1">Kota / Kabupaten</label>
                <input v-model="form.kota" type="text" placeholder="Ketik kota" class="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-800 text-sm outline-none focus:border-stone-800 focus:ring-1 focus:ring-stone-800 transition duration-200" />
              </div>
            </div>

            <!-- No Telepon -->
            <div>
              <label class="block text-xs font-medium text-stone-700 mb-1">No. Telepon / Whatsapp</label>
              <input v-model="form.noTelepon" type="text" placeholder="08123456789" class="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-800 text-sm outline-none focus:border-stone-800 focus:ring-1 focus:ring-stone-800 transition duration-200" />
            </div>

            <!-- Jenis Kasus -->
            <div>
              <label class="block text-xs font-medium text-stone-700 mb-1">Jenis Kasus <span class="text-red-500">*</span></label>
              <select v-model="form.jenisKasus" required class="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-800 text-sm outline-none focus:border-stone-800 focus:ring-1 focus:ring-stone-800 transition duration-200">
                <option value="" disabled>Silakan pilih jenis kasus</option>
                <option v-for="item in jenisKasusList" :key="item.value" :value="item.value">
                  {{ item.label }}
                </option>
              </select>
            </div>

            <!-- Akun Terlapor -->
            <div>
              <label class="block text-xs font-medium text-stone-700 mb-1">Akun Terlapor / Terduga <span class="text-red-500">*</span></label>
              <input v-model="form.akunTerlapor" type="text" placeholder="Contoh: @username, No Rekening, atau URL" required class="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-800 text-sm outline-none focus:border-stone-800 focus:ring-1 focus:ring-stone-800 transition duration-200" />
            </div>

            <!-- Pesan -->
            <div>
              <label class="block text-xs font-medium text-stone-700 mb-1">Rincian Laporan (Pesan) <span class="text-red-500">*</span></label>
              <textarea v-model="form.pesan" rows="4" placeholder="Uraikan rincian insiden yang dialami secara mendalam..." required class="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-800 text-sm outline-none focus:border-stone-800 focus:ring-1 focus:ring-stone-800 transition duration-200"></textarea>
            </div>

            <!-- Lampiran File -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label class="block text-xs font-medium text-stone-700 mb-1">Lampiran Bukti Digital</label>
                <input @change="handleFileUpload($event, 'lampiran')" type="file" class="w-full text-xs text-stone-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-stone-100 file:text-stone-700 hover:file:bg-stone-200 border border-stone-200 rounded-xl bg-stone-50/50 p-1 cursor-pointer" />
              </div>

              <div>
                <label class="block text-xs font-medium text-stone-700 mb-1">Dokumen KTP</label>
                <input @change="handleFileUpload($event, 'fotoKtp')" type="file" class="w-full text-xs text-stone-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-stone-100 file:text-stone-700 hover:file:bg-stone-200 border border-stone-200 rounded-xl bg-stone-50/50 p-1 cursor-pointer" />
              </div>
            </div>

            <!-- Checkbox Syarat & Ketentuan -->
            <div class="flex items-center space-x-2 pt-2">
              <input v-model="form.setuju" type="checkbox" id="setuju" required class="w-4 h-4 text-stone-900 border-stone-300 rounded focus:ring-stone-800 cursor-pointer" />
              <label for="setuju" class="text-xs text-stone-600 cursor-pointer">Saya menyatakan data yang diisikan adalah benar dan dapat dipertanggungjawabkan.</label>
            </div>

            <!-- Tombol Submit -->
            <div class="pt-3">
              <button 
                :disabled="loading" 
                type="submit" 
                class="w-full bg-stone-900 hover:bg-stone-800 disabled:bg-stone-400 text-white font-medium py-3 px-6 rounded-xl text-sm transition duration-200 flex items-center justify-center space-x-2 shadow-xs cursor-pointer disabled:cursor-not-allowed"
              >
                <svg v-if="loading" class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{{ loading ? 'Mengirimkan Laporan...' : 'Kirim Pengaduan' }}</span>
              </button>
            </div>
          </form>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { CheckCircle2, AlertCircle } from 'lucide-vue-next';

const loading = ref(false);
const alert = ref({ message: '', type: '' });

const form = ref({
  namaLengkap: '',
  email: '',
  alamat: '',
  provinsi: '',
  kota: '',
  noTelepon: '',
  jenisKasus: '',
  akunTerlapor: '',
  pesan: '',
  setuju: false,
});

const files = ref({
  lampiran: null,
  fotoKtp: null,
});

const jenisKasusList = [
  { label: 'Akses Ilegal', value: 'AKSES_ILEGAL' },
  { label: 'Ancaman Kekerasan', value: 'ANCAMAN_KEKERASAN' },
  { label: 'Ancaman Pencemaran', value: 'ANCAMAN_PENCEMARAN' },
  { label: 'Berita Bohong', value: 'BERITA_BOHONG' },
  { label: 'Cracking', value: 'CRACKING' },
  { label: 'Eksfiltrasi Data', value: 'EKSFILTRASI_DATA' },
  { label: 'Fasilitasi Kejahatan Siber', value: 'FASILITASI_KEJAHATAN_SIBER' },
  { label: 'Gangguan Sistem', value: 'GANGGUAN_SISTEM' },
  { label: 'Intersepsi', value: 'INTERSEPSI' },
  { label: 'Intrusi', value: 'INTRUSI' },
  { label: 'Judi Online', value: 'JUDI_ONLINE' },
  { label: 'Manipulasi Data Dari Intersepsi', value: 'MANIPULASI_DATA_DARI_INTERSEPSI' },
  { label: 'Manipulasi Data Yang Tidak Sah', value: 'MANIPULASI_DATA_YANG_TIDAK_SAH' },
  { label: 'Narkoba Illegal', value: 'NARKOBA_ILLEGAL' },
  { label: 'Pencemaran Nama Baik', value: 'PENCEMARAN_NAMA_BAIK' },
  { label: 'Pencurian Data', value: 'PENCURIAN_DATA' },
  { label: 'Pengungkapan Data Yang Tidak Sah', value: 'PENGUNGKAPAN_DATA_YANG_TIDAK_SAH' },
  { label: 'Penipuan Online', value: 'PENIPUAN_ONLINE' },
  { label: 'Perdagangan Hewan yang Dilindungi', value: 'PERDAGANGAN_HEWAN_YANG_DILINDUNGI' },
  { label: 'Perdagangan Orang', value: 'PERDAGANGAN_ORANG' },
  { label: 'Perundungan Online', value: 'PERUNDUNGAN_ONLINE' },
  { label: 'Pornografi', value: 'PORNOGRAFI' },
  { label: 'Prostitusi', value: 'PROSTITUSI' },
  { label: 'Provokasi/Penghasutan', value: 'PROVOKASI_PENGHASUTAN' },
  { label: 'Ujaran Kebencian (SARA)', value: 'UJARAN_KEBENCIAN' },
  { label: 'Lainnya', value: 'LAINNYA' },
];

const handleFileUpload = (event, field) => {
  files.value[field] = event.target.files[0];
};

const submitForm = async () => {
  loading.value = true;
  alert.value = { message: '', type: '' };

  const token = localStorage.getItem('token');

  if (!token) {
    alert.value = { 
      message: 'Sesi login Anda telah habis. Silakan login kembali untuk mengirim pengaduan.', 
      type: 'error' 
    };
    loading.value = false;
    return;
  }

  try {
    const formData = new FormData();
    Object.keys(form.value).forEach((key) => {
      formData.append(key, form.value[key]);
    });

    if (files.value.lampiran) formData.append('lampiran', files.value.lampiran);
    if (files.value.fotoKtp) formData.append('fotoKtp', files.value.fotoKtp);

    const response = await axios.post('http://localhost:5000/api/pengaduan', formData, {
      headers: { 
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      },
    });

    alert.value = { message: response.data.message || 'Pengaduan berhasil terkirim!', type: 'success' };
    setTimeout(() => {
      alert.value = { message: '', type: '' };
    }, 5000);
    
    // Reset Form
    form.value = {
      namaLengkap: '', email: '', alamat: '', provinsi: '', kota: '',
      noTelepon: '', jenisKasus: '', akunTerlapor: '', pesan: '', setuju: false,
    };
  } catch (err) {
    if (err.response?.status === 401 || err.response?.status === 403) {
      alert.value = {
        message: 'Akses ditolak. Token tidak valid atau sesi login telah berakhir.',
        type: 'error',
      };
      setTimeout(() => {
        alert.value = { message: '', type: '' };
      }, 5000);
      
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } else {
      alert.value = {
        message: err.response?.data?.message || 'Gagal mengirim pengaduan. Periksa koneksi backend.',
        type: 'error',
      };
      setTimeout(() => {
        alert.value = { message: '', type: '' };
      }, 5000);
    }
  } finally {
    loading.value = false;
  }
};
</script>