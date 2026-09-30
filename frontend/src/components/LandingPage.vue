<template>
  <div class="min-h-screen bg-[#fffff] text-stone-800 font-sans antialiased selection:bg-stone-200">
    
    <!-- HERO SECTION -->
    <section class="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
      <!-- Badge / Announcement -->
      <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-stone-300 bg-white text-stone-600 text-xs sm:text-sm font-medium mb-8 shadow-xs">
        <span class="flex h-2 w-2 rounded-full bg-emerald-500"></span>
        <span>SiLapor - Sistem Pengaduan Masyarakat Terintegrasi</span>
      </div>

      <!-- Main Headline -->
      <h1 class="text-4xl sm:text-6xl font-serif font-normal text-stone-900 tracking-tight leading-tight">
        Sampaikan laporan siber dengan aman, transparan, dan terstruktur.
      </h1>

      <!-- Subtitle -->
      <p class="mt-6 text-lg sm:text-xl text-stone-600 font-light leading-relaxed max-w-2xl mx-auto">
        Platform resmi untuk memproses laporan kejahatan siber dan aduan sosial. Dilengkapi enkripsi data dan penanganan cepat oleh tim ahli.
      </p>

      <!-- CTA Buttons -->
      <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
        <router-link
          to="/pengaduan"
          class="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-100 font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-xs cursor-pointer"
        >
          <span>Buat Laporan Baru</span>
        </router-link>

        <router-link
          to="/login"
          class="w-full sm:w-auto px-7 py-3.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 font-medium text-sm transition-all duration-200 shadow-xs cursor-pointer flex items-center justify-center gap-2"
        >
          <LogIn class="w-4 h-4" />
          <span>Masuk ke Akun</span>
        </router-link>
      </div>
    </section>

    <!-- HIGHLIGHT STATS SECTION -->
    <section class="max-w-4xl mx-auto px-6 py-10 border-y border-stone-200">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div>
          <div class="text-2xl sm:text-3xl font-serif font-medium text-stone-900">256-bit</div>
          <div class="text-xs text-stone-500 mt-1 font-light">Enkripsi Data Pelapor</div>
        </div>
        <div>
          <div class="text-2xl sm:text-3xl font-serif font-medium text-stone-900">24/7</div>
          <div class="text-xs text-stone-500 mt-1 font-light">Sistem Pemantauan Active</div>
        </div>
        <div>
          <div class="text-2xl sm:text-3xl font-serif font-medium text-stone-900">100%</div>
          <div class="text-xs text-stone-500 mt-1 font-light">Kerahasiaan Identitas</div>
        </div>
        <div>
          <div class="text-2xl sm:text-3xl font-serif font-medium text-stone-900">Real-time</div>
          <div class="text-xs text-stone-500 mt-1 font-light">Pelacakan Status Aduan</div>
        </div>
      </div>
    </section>

    <!-- FEATURES SECTION -->
    <section class="max-w-4xl mx-auto px-6 py-16">
      <div class="text-center mb-12">
        <h2 class="text-2xl sm:text-3xl font-serif text-stone-900">Dirancang untuk Perlindungan Maksimal</h2>
        <p class="mt-2 text-stone-500 text-sm font-light">Proses pengaduan yang ramah pengguna tanpa mengorbankan privasi.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Feature 1: Keamanan -->
        <div class="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs hover:border-stone-300 transition-all duration-200">
          <div class="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center text-stone-700 mb-4">
            <ShieldCheck class="w-5 h-5" />
          </div>
          <h3 class="text-base font-medium text-stone-900 mb-2">Perlindungan Anonim</h3>
          <p class="text-xs text-stone-600 leading-relaxed font-light">
            Identitas dan berkas verifikasi Anda tersimpan dengan proteksi ketat hanya untuk kepentingan validasi petugas.
          </p>
        </div>

        <!-- Feature 2: Terstruktur -->
        <div class="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs hover:border-stone-300 transition-all duration-200">
          <div class="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center text-stone-700 mb-4">
            <FileText class="w-5 h-5" />
          </div>
          <h3 class="text-base font-medium text-stone-900 mb-2">Kategori Spesifik</h3>
          <p class="text-xs text-stone-600 leading-relaxed font-light">
            Mendukung berbagai kategori kasus kejahatan siber terkini untuk tindak lanjut verifikasi yang presisi.
          </p>
        </div>

        <!-- Feature 3: Respon Cepat -->
        <div class="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs hover:border-stone-300 transition-all duration-200">
          <div class="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center text-stone-700 mb-4">
            <Zap class="w-5 h-5" />
          </div>
          <h3 class="text-base font-medium text-stone-900 mb-2">Tindak Lanjut Cepat</h3>
          <p class="text-xs text-stone-600 leading-relaxed font-light">
            Setiap aduan yang masuk langsung teralokasi ke sistem antrean verifikasi untuk segera mendapatkan response.
          </p>
        </div>
      </div>
    </section>

    <!-- SECTION 4: ALUR PROSEDUR LAPORAN -->
    <section class="max-w-4xl mx-auto px-6 py-16 border-t border-stone-200">
      <div class="text-center mb-12">
        <h2 class="text-2xl sm:text-3xl font-serif text-stone-900">Alur Pelaporan yang Mudah</h2>
        <p class="mt-2 text-stone-500 text-sm font-light">Hanya butuh 3 langkah sederhana untuk mengirimkan laporan Anda.</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 relative">
        <div class="text-center space-y-3">
          <div class="w-12 h-12 rounded-2xl bg-stone-900 text-white flex items-center justify-center mx-auto font-serif font-bold text-lg shadow-xs">
            1
          </div>
          <h3 class="text-sm font-semibold text-stone-900">Isi Form & Bukti</h3>
          <p class="text-xs text-stone-600 font-light leading-relaxed">
            Lengkapi rincian kronologi, identitas terlapor, dan unggah bukti pendukung (tangkapan layar/dokumen).
          </p>
        </div>

        <div class="text-center space-y-3">
          <div class="w-12 h-12 rounded-2xl bg-stone-900 text-white flex items-center justify-center mx-auto font-serif font-bold text-lg shadow-xs">
            2
          </div>
          <h3 class="text-sm font-semibold text-stone-900">Verifikasi Tim Siber</h3>
          <p class="text-xs text-stone-600 font-light leading-relaxed">
            Tim validator mengecek keabsahan berkas aduan Anda dan memprosesnya ke sistem investigasi.
          </p>
        </div>

        <div class="text-center space-y-3">
          <div class="w-12 h-12 rounded-2xl bg-stone-900 text-white flex items-center justify-center mx-auto font-serif font-bold text-lg shadow-xs">
            3
          </div>
          <h3 class="text-sm font-semibold text-stone-900">Pantau Perkembangan</h3>
          <p class="text-xs text-stone-600 font-light leading-relaxed">
            Dapatkan pembaruan status aduan secara transparan melalui menu Riwayat Pengaduan di akun Anda.
          </p>
        </div>
      </div>
    </section>

    <!-- SECTION 5: CAKUPAN KATEGORI KASUS -->
    <section class="max-w-4xl mx-auto px-6 py-16 border-t border-stone-200">
      <div class="text-center mb-10">
        <h2 class="text-2xl sm:text-3xl font-serif text-stone-900">Kategori Kejahatan Siber yang Ditangani</h2>
        <p class="mt-2 text-stone-500 text-sm font-light">Kami siap memproses berbagai jenis pelanggaran hukum di dunia digital.</p>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div class="p-4 rounded-xl bg-white border border-stone-200 text-center space-y-2">
          <AlertTriangle class="w-6 h-6 mx-auto text-amber-600" />
          <p class="text-xs font-medium text-stone-800">Penipuan Online</p>
        </div>

        <div class="p-4 rounded-xl bg-white border border-stone-200 text-center space-y-2">
          <UserX class="w-6 h-6 mx-auto text-stone-700" />
          <p class="text-xs font-medium text-stone-800">Pencurian Identitas</p>
        </div>

        <div class="p-4 rounded-xl bg-white border border-stone-200 text-center space-y-2">
          <Lock class="w-6 h-6 mx-auto text-stone-700" />
          <p class="text-xs font-medium text-stone-800">Hacking / Peretasan</p>
        </div>

        <div class="p-4 rounded-xl bg-white border border-stone-200 text-center space-y-2">
          <MessageSquare class="w-6 h-6 mx-auto text-stone-700" />
          <p class="text-xs font-medium text-stone-800">Pelecehan / Cyberbullying</p>
        </div>
      </div>
    </section>

    <!-- SECTION 6: FAQ ACCORDION -->
    <section class="max-w-3xl mx-auto px-6 py-16 border-t border-stone-200">
      <div class="text-center mb-10">
        <h2 class="text-2xl sm:text-3xl font-serif text-stone-900">Pertanyaan Umum (FAQ)</h2>
        <p class="mt-2 text-stone-500 text-sm font-light">Jawaban atas pertanyaan yang sering diajukan masyarakat.</p>
      </div>

      <div class="space-y-3">
        <div 
          v-for="(faq, index) in faqs" 
          :key="index" 
          class="bg-white rounded-xl border border-stone-200 overflow-hidden"
        >
          <button 
            @click="faq.open = !faq.open" 
            class="w-full text-left p-4 flex items-center justify-between text-xs font-medium text-stone-900 hover:bg-stone-50 transition cursor-pointer"
          >
            <span>{{ faq.question }}</span>
            <ChevronDown :class="`w-4 h-4 text-stone-400 transition-transform duration-200 ${faq.open ? 'rotate-180' : ''}`" />
          </button>
          <div v-if="faq.open" class="px-4 pb-4 text-xs text-stone-600 font-light leading-relaxed border-t border-stone-100 pt-3">
            {{ faq.answer }}
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 7: CTA BANNER -->
    <section class="max-w-4xl mx-auto px-6 pb-20">
      <div class="p-8 sm:p-10 rounded-3xl bg-stone-900 text-white text-center space-y-4 shadow-xl">
        <h2 class="text-2xl sm:text-3xl font-serif">Siap Melaporkan Kejadian?</h2>
        <p class="text-xs sm:text-sm text-stone-300 font-light max-w-lg mx-auto">
          Jangan biarkan tindakan kejahatan siber merugikan lebih banyak orang. Kirimkan aduan Anda secara aman di platform SiLapor.
        </p>
        <div class="pt-2">
          <router-link
            to="/pengaduan"
            class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-stone-900 font-medium text-xs hover:bg-stone-100 transition shadow-xs"
          >
            <CheckCircle2 class="w-4 h-4 text-emerald-600" />
            <span>Buat Pengaduan Sekarang</span>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Import Icon Lucide
import { 
  ArrowRight, 
  LogIn, 
  ShieldCheck, 
  FileText, 
  Zap, 
  AlertTriangle, 
  UserX, 
  Lock, 
  MessageSquare, 
  ChevronDown, 
  CheckCircle2 
} from 'lucide-vue-next';

defineEmits(['navigate']);

const faqs = ref([
  {
    question: 'Apakah kerahasiaan identitas pelapor terjamin?',
    answer: 'Ya, seluruh data pribadi dan berkas yang Anda unggah dilindungi dengan enkripsi ketat dan hanya diakses oleh petugas verifikator yang berwenang.',
    open: false
  },
  {
    question: 'Berapa lama proses verifikasi laporan?',
    answer: 'Proses verifikasi berkas awal umumnya membutuhkan waktu 1-2 hari kerja sebelum dialokasikan ke tim investigasi.',
    open: false
  },
  {
    question: 'Apakah saya bisa memantau perkembangan laporan saya?',
    answer: 'Tentu. Anda dapat melihat perkembangan status aduan secara real-time melalui halaman "Riwayat Saya" setelah masuk ke akun.',
    open: false
  }
]);
</script>