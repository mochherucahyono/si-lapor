<template>
  <div class="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 font-sans text-stone-800">
    <div class="max-w-6xl mx-auto space-y-16">
      
      <!-- HERO HEADER -->
      <div class="text-center max-w-3xl mx-auto space-y-4">
        <span class="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-700 bg-stone-100 px-3 py-1 rounded-full">
          <BookOpen class="w-3.5 h-3.5" /> Pusat Bantuan & Edukasi
        </span>
        <h1 class="text-3xl sm:text-4xl font-serif font-bold text-stone-900 leading-tight">
          Panduan Lengkap Pengajuan Laporan Siber
        </h1>
        <p class="text-sm text-stone-600 font-light leading-relaxed">
          Pahami alur proses, kelengkapan berkas bukti, dan kriteria aduan agar laporan Anda dapat diproses dengan cepat, akurat, dan valid oleh tim verifikator.
        </p>
      </div>

      <!-- HIGHLIGHT WARNING BANNER -->
      <div class="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center gap-4">
        <div class="p-3 bg-amber-100 rounded-xl text-amber-800 shrink-0">
          <AlertOctagon class="w-6 h-6" />
        </div>
        <div class="space-y-1 flex-1">
          <h4 class="text-xs font-bold text-amber-900 uppercase tracking-wide">Penting Sebelum Melapor!</h4>
          <p class="text-xs text-amber-800 font-light leading-relaxed">
            Pastikan Anda tidak membagikan kata sandi (password), kode OTP, atau PIN perbankan kepada siapa pun. Tim SiLapor **tidak pernah** meminta informasi kredensial rahasia dalam bentuk apa pun.
          </p>
        </div>
      </div>

      <!-- SECTION 1: STEPPER ALUR PENGADUAN (4 LANGKAH) -->
      <section class="space-y-6">
        <div class="flex items-center justify-between border-b border-stone-200 pb-4">
          <h2 class="text-xl font-serif font-semibold text-stone-900 flex items-center gap-2">
            <GitCommit class="w-5 h-5 text-stone-700" /> Alur Pemrosesan Laporan
          </h2>
          <span class="text-xs text-stone-500 font-light">4 Langkah Mudah</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div 
            v-for="(step, idx) in alurLaporan" 
            :key="idx"
            class="bg-stone-50 border border-stone-200 p-6 rounded-2xl space-y-3 relative hover:border-stone-400 transition-all"
          >
            <div class="flex items-center justify-between">
              <span class="w-8 h-8 rounded-xl bg-stone-900 text-white flex items-center justify-center text-xs font-serif font-bold">
                0{{ idx + 1 }}
              </span>
              <component :is="step.icon" class="w-5 h-5 text-stone-500" />
            </div>
            <h3 class="text-sm font-semibold text-stone-900 pt-2">{{ step.judul }}</h3>
            <p class="text-xs text-stone-500 font-light leading-relaxed">{{ step.deskripsi }}</p>
          </div>
        </div>
      </section>

      <!-- SECTION 2: CHECKLIST BUKTI DAN BUKTI VALID (2 KOLOM) -->
      <section class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- Syarat Bukti (Lg: 7 cols) -->
        <div class="lg:col-span-7 space-y-6">
          <div class="border-b border-stone-200 pb-4">
            <h2 class="text-xl font-serif font-semibold text-stone-900 flex items-center gap-2">
              <FileCheck class="w-5 h-5 text-stone-700" /> Checklist Bukti Pendukung
            </h2>
            <p class="text-xs text-stone-500 font-light mt-1">Siapkan berkas-berkas berikut sebelum mengisi formulir aduan.</p>
          </div>

          <div class="space-y-3">
            <div v-for="(item, i) in checklistBukti" :key="i" class="flex items-start gap-3.5 p-4 bg-white border border-stone-200 rounded-2xl">
              <div class="p-1.5 bg-emerald-100 text-emerald-700 rounded-lg shrink-0 mt-0.5">
                <Check class="w-4 h-4" />
              </div>
              <div class="space-y-0.5">
                <h4 class="text-xs font-semibold text-stone-900">{{ item.nama }}</h4>
                <p class="text-xs text-stone-500 font-light leading-relaxed">{{ item.detail }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Format & Spesifikasi File (Lg: 5 cols) -->
        <div class="lg:col-span-5 bg-stone-900 text-stone-200 p-6 rounded-2xl space-y-6">
          <div class="space-y-2 border-b border-stone-800 pb-4">
            <span class="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Spesifikasi Berkas</span>
            <h3 class="text-lg font-serif font-semibold text-white">Ketentuan Upload File</h3>
          </div>

          <ul class="space-y-4 text-xs font-light">
            <li class="flex items-start gap-3">
              <Paperclip class="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
              <div>
                <strong class="font-medium text-white block">Format Gambar & Dokumen:</strong>
                <span class="text-stone-400">JPG, PNG, WEBP, atau PDF.</span>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <HardDrive class="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
              <div>
                <strong class="font-medium text-white block">Batas Ukuran Maksimal:</strong>
                <span class="text-stone-400">Maksimal 10 MB per berkas lampiran.</span>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <Eye class="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
              <div>
                <strong class="font-medium text-white block">Keterbacaan Teks:</strong>
                <span class="text-stone-400">Tangkapan layar harus jelas, tidak buram/blur, dan tidak diedit/direkayasa.</span>
              </div>
            </li>
          </ul>

          <div class="p-4 bg-stone-800 rounded-xl border border-stone-700 text-[11px] text-stone-300 leading-relaxed">
            💡 <strong>Tips : </strong> Gabungkan beberapa tangkapan layar percakapan menjadi satu berkas PDF jika jumlah bukti gambar cukup banyak.
          </div>
        </div>

      </section>

      <!-- SECTION 3: FAQ ACCORDION INTERAKTIF -->
      <section class="space-y-6 pt-4">
        <div class="text-center max-w-xl mx-auto space-y-2">
          <h2 class="text-2xl font-serif font-semibold text-stone-900">Pertanyaan Sering Diajukan (FAQ)</h2>
          <p class="text-xs text-stone-500 font-light">Jawaban cepat atas pertanyaan paling umum terkait status dan keamanan aduan Anda.</p>
        </div>

        <div class="max-w-3xl mx-auto space-y-3">
          <div 
            v-for="(faq, index) in listFaq" 
            :key="index"
            class="border border-stone-200 rounded-2xl overflow-hidden bg-white"
          >
            <button 
              @click="toggleFaq(index)" 
              class="w-full p-4 text-left flex items-center justify-between gap-4 font-medium text-xs text-stone-900 hover:bg-stone-50 transition-colors cursor-pointer"
            >
              <span>{{ faq.tanya }}</span>
              <ChevronDown 
                class="w-4 h-4 text-stone-500 transition-transform duration-200 shrink-0" 
                :class="{ 'rotate-180': faqOpen === index }" 
              />
            </button>
            <div 
              v-show="faqOpen === index" 
              class="p-4 pt-0 text-xs text-stone-500 font-light leading-relaxed border-t border-stone-100 bg-stone-50/50"
            >
              {{ faq.jawab }}
            </div>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { 
  BookOpen, 
  AlertOctagon, 
  GitCommit, 
  FileCheck, 
  Check, 
  Paperclip, 
  HardDrive, 
  Eye, 
  ChevronDown,
  PenTool,
  ShieldCheck,
  Search,
  CheckCircle2
} from 'lucide-vue-next';

// Data Alur
const alurLaporan = [
  {
    judul: '1. Pengisian Formulir',
    deskripsi: 'Lengkapi identitas, isi kategori insiden, kronologi kejadian, dan unggah berkas bukti yang valid.',
    icon: PenTool
  },
  {
    judul: '2. Verifikasi Berkas',
    deskripsi: 'Tim verifikator mengecek keabsahan identitas, tangkapan layar bukti, serta kesesuaian kategori.',
    icon: Search
  },
  {
    judul: '3. Tindak Lanjut & Investigasi',
    deskripsi: 'Aduan diteruskan ke unit teknis/penegak hukum terkait untuk analisis dan pemblokiran/penanganan.',
    icon: ShieldCheck
  },
  {
    judul: '4. Pembaruan Status',
    deskripsi: 'Pantau riwayat aduan secara real-time melalui dashboard akun Anda hingga status dinyatakan Selesai.',
    icon: CheckCircle2
  }
];

// Data Checklist
const checklistBukti = [
  {
    nama: 'Tangkapan Layar (Screenshot) Percakapan',
    detail: 'Bukti percakapan di aplikasi pesan (WhatsApp, Telegram, DM Instagram) yang memuat nomor/akun pelaku.'
  },
  {
    nama: 'Bukti Transfer atau Transaksi',
    detail: 'Struk ATM, M-Banking, e-Wallet, atau resi transaksi yang menampilkan nomor rekening tujuan dan nominal.'
  },
  {
    nama: 'Tautan / URL Akun atau Website Pelaku',
    detail: 'Alamat web phishing, profil media sosial pelaku, atau tautan grup tempat insiden terjadi.'
  },
  {
    nama: 'Tanda Identitas Pelapor (KTP / SIM)',
    detail: 'Diperlukan untuk memvalidasi bahwa laporan dibuat oleh individu nyata (mencegah laporan palsu).'
  }
];

// Data FAQ Accordion
const faqOpen = ref(0);
const toggleFaq = (index) => {
  faqOpen.value = faqOpen.value === index ? null : index;
};

const listFaq = [
  {
    tanya: 'Apakah identitas saya aman saat mengirimkan laporan?',
    jawab: 'Sangat aman. Seluruh data pelapor dilindungi dengan enkripsi ketat dan hanya dibuka untuk kepentingan verifikasi resmi sesuai ketentuan regulasi privasi data.'
  },
  {
    tanya: 'Berapa lama waktu yang dibutuhkan untuk memproses aduan?',
    jawab: 'Proses verifikasi awal memakan waktu 1x24 jam kerja. Tindak lanjut teknis bervariasi antara 3–7 hari kerja tergantung pada tingkat kompleksitas insiden.'
  },
  {
    tanya: 'Bisakah saya mengubah atau membatalkan laporan yang sudah terkirim?',
    jawab: 'Laporan yang sudah berstatus "Diproses" tidak dapat diubah. Namun Anda dapat menambahkan catatan bukti baru melalui menu detail Laporan Saya.'
  },
  {
    tanya: 'Apa yang harus dilakukan jika bukti yang saya punya melebihi 10 MB?',
    jawab: 'Anda dapat mengompresi gambar/PDF terlebih dahulu atau menyimpan berkas di Google Drive/OneDrive lalu mencantumkan tautannya pada kolom kronologi.'
  }
];
</script>