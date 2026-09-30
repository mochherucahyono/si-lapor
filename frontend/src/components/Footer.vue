<template>
  <footer class="bg-stone-900 text-stone-300 font-sans pt-16 pb-8 border-t border-stone-800">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      <!-- GRID ATAS (4 KOLOM) -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
        
        <!-- KOLOM 1: IDENTITAS BRAND & KONTAK (Lg: 4 Cols) -->
        <div class="lg:col-span-4 space-y-4">
          <div class="flex items-center gap-2.5 text-white">
            <div class="p-2 bg-stone-800 rounded-xl border border-stone-700">
              <ShieldAlert class="w-5 h-5 text-stone-200" />
            </div>
            <span class="text-xl font-serif font-bold tracking-tight">SiLapor</span>
          </div>

          <p class="text-xs text-stone-400 font-light leading-relaxed max-w-sm">
            Platform layanan pengaduan kejahatan siber terpadu. Berkomitmen menjaga keamanan, privasi, dan transparansi laporan masyarakat di ruang digital.
          </p>

          <!-- Detail Kontak -->
          <div class="space-y-2.5 pt-2 text-xs text-stone-400 font-light">
            <div class="flex items-start gap-3">
              <MapPin class="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
              <span>Gedung Pusat Layanan Siber, Lt. 5, Jl. Jend. Sudirman No. 12, Jakarta Selatan, Indonesia</span>
            </div>
            <div class="flex items-center gap-3">
              <Mail class="w-4 h-4 text-stone-500 shrink-0" />
              <a href="mailto:bantuan@silapor.go.id" class="hover:text-white transition-colors">bantuan@silapor.go.id</a>
            </div>
          </div>
        </div>

        <!-- KOLOM 2: NAVIGASI PLATFORM (Lg: 2 Cols) -->
        <div class="lg:col-span-2 space-y-3">
          <h4 class="text-xs font-semibold text-white tracking-wider">SiLapor</h4>
          <ul class="space-y-2.5 text-xs text-stone-400 font-light">
            <li><router-link to="/silapor" class="hover:text-white transition-colors">Beranda</router-link></li>
            <li><router-link to="/about-us" class="hover:text-white transition-colors">Tentang Kami</router-link></li>
            <li><router-link to="/statistic" class="hover:text-white transition-colors">Statistik Aduan</router-link></li>
            <li><router-link to="/pengaduan" class="hover:text-white transition-colors">Buat Laporan</router-link></li>
          </ul>
        </div>

        <!-- KOLOM 3: PUSAT BANTUAN & EDUKASI (Lg: 2 Cols) -->
        <div class="lg:col-span-2 space-y-3">
          <h4 class="text-xs font-semibold text-white tracking-wider">Informasi</h4>
          <ul class="space-y-2.5 text-xs text-stone-400 font-light">
            <li><router-link to="/guide" class="hover:text-white transition-colors">Panduan Laporan</router-link></li>
            <li><router-link to="/contact" class="hover:text-white transition-colors">Hubungi Kami</router-link></li>
          </ul>
        </div>

        <!-- KOLOM 4: BULETIN / NEWSLETTER (Lg: 4 Cols) -->
        <div class="lg:col-span-4 space-y-3">
          <h4 class="text-xs font-semibold text-white tracking-wider">Pembaruan Keamanan</h4>
          <p class="text-xs text-stone-400 font-light leading-relaxed">
            Dapatkan informasi terkini mengenai edukasi siber, bahaya modul kejahatan baru, serta pengumuman layanan secara berkala.
          </p>

          <!-- Form Subscribe -->
          <form @submit.prevent="handleSubscribe" class="pt-1 flex items-center gap-2">
            <input 
              v-model="emailInput" 
              type="email" 
              placeholder="Masukkan email Anda" 
              required 
              class="w-full bg-stone-800/80 border border-stone-700 text-stone-200 placeholder-stone-500 text-xs px-3.5 py-2.5 rounded-xl outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-500 transition-all"
            />
            <button 
              type="submit" 
              class="bg-stone-100 hover:bg-white text-stone-900 text-xs font-medium px-4 py-2.5 rounded-xl transition duration-200 shrink-0 cursor-pointer"
            >
              Berlangganan
            </button>
          </form>
          <p v-if="subscribeMsg" class="text-[11px] text-emerald-400 pt-0.5">{{ subscribeMsg }}</p>
        </div>

      </div>

      <!-- GARIS PEMBATAS -->
      <div class="border-t border-stone-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-light">
        
        <!-- Hak Cipta -->
        <p>&copy; {{ currentYear }} SiLapor. Hak Cipta Dilindungi Undang-Undang.</p>

        <!-- Link Privasi & Ketentuan -->
        <div class="flex items-center gap-6">
          <router-link to="/privasi" class="hover:text-stone-300 transition-colors">Kebijakan Privasi</router-link>
          <router-link to="/syarat" class="hover:text-stone-300 transition-colors">Syarat & Ketentuan</router-link>
        </div>

        <!-- Sosial Media Icons -->
        <div class="flex items-center gap-3 text-stone-400">
          <a href="#" class="p-2 bg-stone-800/60 hover:bg-stone-800 hover:text-white rounded-lg transition-colors" aria-label="Facebook">
            <Facebook class="w-4 h-4" />
          </a>
          <a href="#" class="p-2 bg-stone-800/60 hover:bg-stone-800 hover:text-white rounded-lg transition-colors" aria-label="Twitter">
            <Twitter class="w-4 h-4" />
          </a>
          <a href="#" class="p-2 bg-stone-800/60 hover:bg-stone-800 hover:text-white rounded-lg transition-colors" aria-label="Instagram">
            <Instagram class="w-4 h-4" />
          </a>
        </div>

      </div>

    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue';
import { 
  ShieldAlert, 
  MapPin, 
  Mail, 
  Facebook, 
  Twitter, 
  Instagram 
} from 'lucide-vue-next';

const currentYear = new Date().getFullYear();
const emailInput = ref('');
const subscribeMsg = ref('');

const handleSubscribe = () => {
  if (emailInput.value) {
    subscribeMsg.value = 'Terima kasih telah berlangganan!';
    emailInput.value = '';
    setTimeout(() => {
      subscribeMsg.value = '';
    }, 4000);
  }
};
</script>