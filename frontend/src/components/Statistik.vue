<template>
  <div class="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8 font-sans text-stone-800">
    <div class="max-w-6xl mx-auto space-y-12">
      
      <!-- HEADER HERO STATISTIK -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-stone-200">
        <div>
          <span class="text-xs font-semibold uppercase tracking-wider text-stone-500 bg-stone-100 px-2.5 py-1 rounded-md">
            Data Transparansi
          </span>
          <h1 class="text-3xl font-serif text-stone-900 mt-3 leading-snug">
            Statistik Laporan Kejahatan Siber
          </h1>
          <p class="text-xs text-stone-500 mt-2 font-light max-w-xl leading-relaxed">
            Rangkuman data penanganan aduan masyarakat secara terpadu untuk mendukung keamanan dan perlindungan di ekosistem digital.
          </p>
        </div>

        <!-- TOTAL RINGKASAN DATA -->
        <div class="bg-stone-900 text-white p-5 rounded-2xl flex items-center gap-5 shadow-sm min-w-[240px]">
          <div class="p-3 bg-stone-800 rounded-xl">
            <FileText class="w-6 h-6 text-stone-200" />
          </div>
          <div>
            <p class="text-[11px] uppercase tracking-wider text-stone-400 font-medium">Total Aduan Masuk</p>
            <p class="text-2xl font-serif font-bold text-white mt-0.5">38,347</p>
          </div>
        </div>
      </div>

      <!-- SECTION 1: KATEGORI KASUS TERBANYAK (GRID CARDS) -->
      <section class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-serif font-semibold text-stone-900 flex items-center gap-2">
            <ShieldAlert class="w-5 h-5 text-stone-700" />
            Kategori Laporan Utama
          </h2>
          <span class="text-xs text-stone-500 font-light">Diperbarui real-time</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div 
            v-for="item in topKasus" 
            :key="item.kategori"
            class="bg-white border border-stone-200 p-5 rounded-2xl shadow-xs hover:border-stone-400 transition-all group"
          >
            <div class="flex items-start justify-between">
              <span class="text-2xl font-serif font-bold text-stone-900 group-hover:text-stone-700 transition">
                {{ item.total.toLocaleString() }}
              </span>
              <component :is="item.icon" class="w-5 h-5 text-stone-400 group-hover:text-stone-900 transition" />
            </div>

            <h3 class="text-xs font-semibold text-stone-800 mt-3">
              {{ item.kategori }}
            </h3>
            <p class="text-[11px] text-stone-500 font-light mt-1 line-clamp-2 leading-relaxed">
              {{ item.deskripsi }}
            </p>
          </div>
        </div>
      </section>

      <!-- SECTION 2: GRAFIK PERSENTASE & DISTRIBUSI KASUS -->
      <section class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- DONUT CHART (DISTRIBUSI KASUS) -->
        <div class="lg:col-span-5 bg-white border border-stone-200 p-6 rounded-2xl shadow-xs space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-stone-100">
            <h3 class="text-sm font-semibold text-stone-900 flex items-center gap-2">
              <PieChartIcon class="w-4 h-4 text-stone-700" />
              Komposisi Aduan
            </h3>
            <span class="text-[11px] text-stone-400">Persentase</span>
          </div>

          <!-- Chart Container -->
          <div class="h-60 relative flex items-center justify-center">
            <Doughnut :data="chartData" :options="chartOptions" />
          </div>

          <!-- Legend List -->
          <div class="grid grid-cols-2 gap-2 pt-2 text-[11px]">
            <div v-for="(kategori, idx) in chartData.labels" :key="idx" class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full shrink-0" :style="{ backgroundColor: chartData.datasets[0].backgroundColor[idx] }"></span>
              <span class="text-stone-600 truncate">{{ kategori }}</span>
            </div>
          </div>
        </div>

        <!-- PERSEBARAN WILAYAH ADUAN -->
        <div class="lg:col-span-7 bg-white border border-stone-200 p-6 rounded-2xl shadow-xs space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-stone-100">
            <h3 class="text-sm font-semibold text-stone-900 flex items-center gap-2">
              <MapPin class="w-4 h-4 text-stone-700" />
              Peta Persebaran Konten & Insiden
            </h3>
            <span class="text-[11px] text-stone-400">Tingkat Wilayah</span>
          </div>

          <p class="text-xs text-stone-500 font-light leading-relaxed">
            Sebaran geografis aktivitas insiden siber yang teridentifikasi berdasarkan data laporan masyarakat di Indonesia.
          </p>

          <!-- Visual Placeholder Peta / SVG Wilayah -->
          <div class="bg-stone-50 border border-stone-100 rounded-xl p-4 flex flex-col items-center justify-center min-h-[220px] text-center">
            <Globe2 class="w-10 h-10 text-stone-300 mb-2" />
            <p class="text-xs font-medium text-stone-600">Visualisasi Peta Wilayah Indonesia</p>
            <p class="text-[11px] text-stone-400 max-w-xs mt-1">Konsentrasi laporan tertinggi berada di wilayah Jawa Barat, DKI Jakarta, dan Jawa Timur.</p>
          </div>

          <!-- Top Region Ranking -->
          <div class="space-y-2 pt-1">
            <div v-for="prov in topProvinsi" :key="prov.nama" class="space-y-1">
              <div class="flex justify-between text-[11px] text-stone-700">
                <span>{{ prov.nama }}</span>
                <span class="font-medium">{{ prov.persen }}%</span>
              </div>
              <div class="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                <div class="bg-stone-900 h-full rounded-full" :style="{ width: prov.persen + '%' }"></div>
              </div>
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
  FileText, 
  ShieldAlert, 
  PieChart as PieChartIcon, 
  MapPin, 
  Globe2,
  CreditCard,
  AlertTriangle,
  UserX,
  Lock,
  HelpCircle,
  EyeOff
} from 'lucide-vue-next';

// Chart.js Setup
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'vue-chartjs';

ChartJS.register(ArcElement, Tooltip, Legend);

// Data Kategori Kasus Utama (Inspirasi Kategori dari Referensi)
const topKasus = ref([
  {
    kategori: 'Penipuan Online',
    total: 14496,
    deskripsi: 'Investasi bodong, lotere, e-commerce, kartu kredit, dan penipuan lowongan kerja.',
    icon: CreditCard
  },
  {
    kategori: 'Ancaman Kekerasan',
    total: 8614,
    deskripsi: 'Pemerasan digital, intimidasi, serta ancaman keselamatan ruang pribadi.',
    icon: AlertTriangle
  },
  {
    kategori: 'Pencemaran Nama Baik',
    total: 6556,
    deskripsi: 'Fitnah, penghinaan langsung, dan perusakan reputasi melalui media sosial.',
    icon: UserX
  },
  {
    kategori: 'Ancaman Pencemaran',
    total: 3675,
    deskripsi: 'Pelecehan online, pemerasan dokumen pribadi, dan doxxing.',
    icon: EyeOff
  },
  {
    kategori: 'Manipulasi Data / Akses',
    total: 2880,
    deskripsi: 'Peniruan identitas, deepfake, cracking, dan eksfiltrasi data tanpa izin.',
    icon: Lock
  },
  {
    kategori: 'Lainnya',
    total: 2126,
    deskripsi: 'Berita bohong, judi online, ujaran kebencian, serta pelanggaran siber lainnya.',
    icon: HelpCircle
  }
]);

// Data Donut Chart
const chartData = ref({
  labels: ['Penipuan Online', 'Ancaman Kekerasan', 'Pencemaran Nama Baik', 'Ancaman Pencemaran', 'Manipulasi Data', 'Lainnya'],
  datasets: [
    {
      backgroundColor: ['#1c1917', '#44403c', '#78716c', '#a8a29e', '#d6d3d1', '#e7e5e4'],
      data: [14496, 8614, 6556, 3675, 2880, 2126],
      borderWidth: 0,
    }
  ]
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false }
  },
  cutout: '70%'
});

// Top Provinsi
const topProvinsi = ref([
  { nama: 'DKI Jakarta', persen: 32 },
  { nama: 'Jawa Barat', persen: 24 },
  { nama: 'Jawa Timur', persen: 18 },
  { nama: 'Jawa Tengah', persen: 12 }
]);
</script>