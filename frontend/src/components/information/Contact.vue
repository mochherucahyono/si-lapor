<template>
  <div class="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 font-sans text-stone-800">
    <div class="max-w-6xl mx-auto space-y-12">
      
      <!-- HERO HEADER -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-stone-200">
        <div>
          <span class="text-xs font-semibold uppercase tracking-wider text-stone-500 bg-stone-100 px-2.5 py-1 rounded-md">
            Layanan Pelanggan & Bantuan
          </span>
          <h1 class="text-3xl font-serif font-bold text-stone-900 mt-3">
            Hubungi Tim SiLapor
          </h1>
          <p class="text-xs text-stone-500 mt-2 font-light max-w-xl leading-relaxed">
            Punya kendala teknis, pertanyaan khusus, atau butuh bantuan mendesak? Kami siap membantu Anda.
          </p>
        </div>

        <!-- BADGE JAM OPERASIONAL LIVE -->
        <div class="bg-stone-50 border border-stone-200 p-4 rounded-2xl flex items-center gap-3 shrink-0">
          <span class="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
          <div class="text-xs">
            <p class="font-medium text-stone-900">Layanan Aktif Hari Ini</p>
            <p class="text-[11px] text-stone-500 font-light">Senin – Jumat | 08.00 – 17.00 WIB</p>
          </div>
        </div>
      </div>

      <!-- GRID CARDS KONTAK & FORM PESAN -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- INFORMASI KONTAK & DIREKTORI (Lg: 5 cols) -->
        <div class="lg:col-span-5 space-y-4">
          
          <div class="bg-white border border-stone-200 p-5 rounded-2xl space-y-4 shadow-xs">
            <h3 class="text-sm font-semibold text-stone-900 flex items-center gap-2">
              <Headphones class="w-4 h-4 text-stone-700" /> saluran Bantuan Resmi
            </h3>
            
            <div class="space-y-3 pt-1 text-xs">
              <div class="flex items-start gap-3 p-3 bg-stone-50 rounded-xl">
                <Mail class="w-4 h-4 text-stone-600 shrink-0 mt-0.5" />
                <div>
                  <span class="text-stone-400 text-[11px] block">Email Dukungan Teknis</span>
                  <a href="mailto:bantuan@silapor.go.id" class="font-medium text-stone-800 hover:underline">bantuan@silapor.go.id</a>
                </div>
              </div>

              <div class="flex items-start gap-3 p-3 bg-stone-50 rounded-xl">
                <PhoneCall class="w-4 h-4 text-stone-600 shrink-0 mt-0.5" />
                <div>
                  <span class="text-stone-400 text-[11px] block">Call Center (Bebas Pulsa)</span>
                  <span class="font-medium text-stone-800">1500-888 (Ext. 4)</span>
                </div>
              </div>

              <div class="flex items-start gap-3 p-3 bg-stone-50 rounded-xl">
                <MessageSquare class="w-4 h-4 text-stone-600 shrink-0 mt-0.5" />
                <div>
                  <span class="text-stone-400 text-[11px] block">WhatsApp Bot Lacak Tiket</span>
                  <span class="font-medium text-stone-800">+62 811-2345-6789</span>
                </div>
              </div>
            </div>
          </div>

          <!-- LOKASI KANTOR PUSAT -->
          <div class="bg-white border border-stone-200 p-5 rounded-2xl space-y-3 shadow-xs">
            <h3 class="text-sm font-semibold text-stone-900 flex items-center gap-2">
              <MapPin class="w-4 h-4 text-stone-700" /> Kantor Operasional
            </h3>
            <p class="text-xs text-stone-500 font-light leading-relaxed">
              Jl. Ahmad Yani Timur No.9, Bago, Kec. Tulungagung, Kabupaten Tulungagung, Jawa Timur 66212.
            </p>

            <!-- MAP PLACEHOLDER VISUAL -->
            <div class="bg-stone-100 border border-stone-200 rounded-xl h-36 flex flex-col items-center justify-center text-center p-4">
              <Globe class="w-8 h-8 text-stone-400 mb-1" />
              <span class="text-xs font-medium text-stone-700">Peta Lokasi Interaktif</span>
              <span class="text-[10px] text-stone-400">Peta Wilayah Layanan Terpadu</span>
            </div>
          </div>

        </div>

        <!-- FORM KIRIM PESAN LANGSUNG (Lg: 7 cols) -->
        <div class="lg:col-span-7 bg-white border border-stone-200 p-6 sm:p-8 rounded-2xl shadow-xs space-y-6">
          <div>
            <h2 class="text-lg font-serif font-semibold text-stone-900">Kirim Pesan Layanan</h2>
            <p class="text-xs text-stone-500 font-light mt-1">Gunakan formulir ini untuk pertanyaan umum, kendala akun, atau masukan platform.</p>
          </div>

          <form @submit.prevent="submitKirimPesan" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-1.5">
                <label class="text-xs font-medium text-stone-700">Nama Lengkap</label>
                <input 
                  v-model="formPesan.nama" 
                  type="text" 
                  required 
                  placeholder="Nama Anda" 
                  class="w-full bg-stone-50 border border-stone-200 rounded-xl text-xs px-3.5 py-2.5 outline-none focus:bg-white focus:border-stone-500 transition-all"
                />
              </div>

              <div class="space-y-1.5">
                <label class="text-xs font-medium text-stone-700">Alamat Email</label>
                <input 
                  v-model="formPesan.email" 
                  type="email" 
                  required 
                  placeholder="email@domain.com" 
                  class="w-full bg-stone-50 border border-stone-200 rounded-xl text-xs px-3.5 py-2.5 outline-none focus:bg-white focus:border-stone-500 transition-all"
                />
              </div>
            </div>

            <div class="space-y-1.5">
              <label class="text-xs font-medium text-stone-700">Kategori Pertanyaan</label>
              <select 
                v-model="formPesan.kategori" 
                class="w-full bg-stone-50 border border-stone-200 rounded-xl text-xs px-3 py-2.5 outline-none focus:bg-white focus:border-stone-500 transition-all"
              >
                <option value="teknis">Kendala Teknis / Web</option>
                <option value="status">Pertanyaan Status Laporan</option>
                <option value="kemitraan">Kemitraan & Kerjasama</option>
                <option value="lainnya">Lainnya</option>
              </select>
            </div>

            <div class="space-y-1.5">
              <label class="text-xs font-medium text-stone-700">Pesan / Masukan</label>
              <textarea 
                v-model="formPesan.pesan" 
                rows="4" 
                required 
                placeholder="Tuliskan pesan Anda secara jelas..." 
                class="w-full bg-stone-50 border border-stone-200 rounded-xl text-xs p-3.5 outline-none focus:bg-white focus:border-stone-500 transition-all resize-none"
              ></textarea>
            </div>

            <button 
              type="submit" 
              class="w-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium py-3 rounded-xl transition duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send class="w-4 h-4" /> Kirim Pesan
            </button>
          </form>

          <!-- Floating Toast Feedback -->
          <div v-if="pesanTerkirim" class="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
            <CheckCircle2 class="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Pesan Anda berhasil dikirim! Tim kami akan membalas melalui email dalam 1x24 jam.</span>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { 
  Headphones, 
  Mail, 
  PhoneCall, 
  MessageSquare, 
  MapPin, 
  Globe, 
  Send, 
  CheckCircle2 
} from 'lucide-vue-next';

const formPesan = ref({
  nama: '',
  email: '',
  kategori: 'teknis',
  pesan: ''
});

const pesanTerkirim = ref(false);

const submitKirimPesan = () => {
  pesanTerkirim.value = true;
  formPesan.value = { nama: '', email: '', kategori: 'teknis', pesan: '' };
  setTimeout(() => {
    pesanTerkirim.value = false;
  }, 5000);
};
</script>