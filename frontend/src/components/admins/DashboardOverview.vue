<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-serif font-semibold text-stone-900">Dashboard Overview</h1>
        <p class="text-xs text-stone-500 font-light mt-1">Pantau performa, distribusi kasus, dan aktivitas laporan terbaru.</p>
      </div>
    </div>

    <!-- Stat Cards Grid -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
        <div class="flex items-center justify-between text-stone-500">
          <span class="text-xs font-light">Total Laporan</span>
          <Inbox class="w-4 h-4 text-stone-400" />
        </div>
        <div class="text-2xl font-serif font-semibold text-stone-900 mt-2">{{ stats.total }}</div>
      </div>

      <div class="p-5 rounded-2xl bg-white border border-amber-200/80 bg-amber-50/30 shadow-xs">
        <div class="flex items-center justify-between text-amber-700">
          <span class="text-xs font-light">Menunggu Verifikasi</span>
          <Clock class="w-4 h-4 text-amber-500" />
        </div>
        <div class="text-2xl font-serif font-semibold text-amber-900 mt-2">{{ stats.pending }}</div>
      </div>

      <div class="p-5 rounded-2xl bg-white border border-blue-200/80 bg-blue-50/30 shadow-xs">
        <div class="flex items-center justify-between text-blue-700">
          <span class="text-xs font-light">Dalam Proses</span>
          <Search class="w-4 h-4 text-blue-500" />
        </div>
        <div class="text-2xl font-serif font-semibold text-blue-900 mt-2">{{ stats.proses }}</div>
      </div>

      <div class="p-5 rounded-2xl bg-white border border-emerald-200/80 bg-emerald-50/30 shadow-xs">
        <div class="flex items-center justify-between text-emerald-700">
          <span class="text-xs font-light">Selesai Ditangani</span>
          <CheckCircle2 class="w-4 h-4 text-emerald-500" />
        </div>
        <div class="text-2xl font-serif font-semibold text-emerald-900 mt-2">{{ stats.selesai }}</div>
      </div>
    </div>

    <!-- Section Konten Tambahan: Main Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Kolom Kiri (2 Span): Laporan Terbaru -->
      <div class="lg:col-span-2 bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
        <div class="flex items-center justify-between border-b border-stone-100 pb-3">
          <div class="flex items-center gap-2">
            <FileText class="w-4 h-4 text-stone-600" />
            <h3 class="text-sm font-semibold text-stone-900">Laporan Terbaru Masuk</h3>
          </div>
          <span class="text-[11px] text-stone-400 font-light">5 Teratas</span>
        </div>

        <div v-if="recentReports.length > 0" class="divide-y divide-stone-100">
          <div 
            v-for="item in recentReports" 
            :key="item.id || item._id" 
            class="py-3 flex items-center justify-between text-xs hover:bg-stone-50/50 rounded-xl px-2 transition"
          >
            <div class="space-y-1 max-w-[65%]">
              <div class="flex items-center gap-2">
                <span class="font-mono text-[10px] bg-stone-100 px-1.5 py-0.5 rounded text-stone-600 font-medium">
                  #{{ (item.id || item._id || '').toString().slice(-6) }}
                </span>
                <span class="font-medium text-stone-900 truncate">
                  {{ formatJenisKasus(item.jenisKasus) }}
                </span>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <!-- Badge Status -->
              <span 
                :class="getStatusBadgeClass(item.status)"
                class="px-2 py-0.5 rounded-full text-[10px] font-medium"
              >
                {{ item.status || 'PENDING' }}
              </span>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-8 text-xs text-stone-400 font-light">
          Belum ada laporan yang tercatat.
        </div>
        <button 
        @click="$emit('navigate-to-pengaduan')"
        class="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium transition cursor-pointer shadow-xs flex items-center gap-1.5 self-start sm:self-auto">
        <span>Kelola Semua Laporan</span>
        <ArrowRight class="w-3.5 h-3.5" />
      </button>
      </div>

      <!-- Kolom Kanan (1 Span): Distribusi & Ringkasan Performa -->
      <div class="space-y-6">
        <!-- Ringkasan Tingkat Penyelesaian -->
        <div class="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-3">
          <h3 class="text-sm font-semibold text-stone-900 flex items-center gap-2">
            <PieChart class="w-4 h-4 text-stone-600" />
            <span>Tingkat Penyelesaian</span>
          </h3>
          
          <div class="pt-2">
            <div class="flex justify-between text-xs mb-1">
              <span class="text-stone-500 font-light">Progress Selesai</span>
              <span class="font-semibold text-stone-900">{{ completionRate }}%</span>
            </div>
            <div class="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
              <div 
                class="bg-emerald-500 h-full transition-all duration-500" 
                :style="{ width: `${completionRate}%` }"
              ></div>
            </div>
          </div>

          <div class="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
            <span class="text-stone-500 font-light">Laporan Ditolak</span>
            <span class="font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-md text-[11px]">
              {{ stats.ditolak }} Kasus
            </span>
          </div>
        </div>

        <!-- Info Quick System -->
        <div class="bg-stone-900 text-stone-200 rounded-2xl p-5 shadow-xs space-y-2">
          <div class="flex items-center justify-between text-xs">
            <span class="font-medium text-white">Status Sistem</span>
            <span class="flex items-center gap-1.5 text-emerald-400 text-[11px]">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Aktif
            </span>
          </div>
          <p class="text-[11px] text-stone-400 font-light leading-relaxed">
            Semua modul penanganan laporan dan antrean verifikasi berjalan normal.
          </p>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { 
  Inbox, 
  Clock, 
  Search, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  PieChart 
} from 'lucide-vue-next';

defineEmits(['navigate-to-pengaduan']);

const pengaduanList = ref([]);
const stats = ref({
  total: 0,
  pending: 0,
  proses: 0,
  selesai: 0,
  ditolak: 0
});

// Computed: 5 Laporan Terbaru
const recentReports = computed(() => {
  return [...pengaduanList.value].reverse().slice(0, 5);
});

// Computed: Persentase Penyelesaian Kasus
const completionRate = computed(() => {
  if (stats.value.total === 0) return 0;
  return Math.round((stats.value.selesai / stats.value.total) * 100);
});

// Helper Format Jenis Kasus dari ENUM
const formatJenisKasus = (val) => {
  if (!val) return 'Lainnya';
  return val.toLowerCase().split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
};

// Helper Warna Badge Status
const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'PROSES':
      return 'bg-blue-50 text-blue-700 border border-blue-200';
    case 'SELESAI':
      return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    case 'DITOLAK':
      return 'bg-red-50 text-red-700 border border-red-200';
    default:
      return 'bg-amber-50 text-amber-700 border border-amber-200';
  }
};

const fetchStats = async () => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:5000/api/pengaduan', {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    const data = res.data || [];
    pengaduanList.value = data; // Menyimpan raw data pengaduan

    stats.value.total = data.length;
    stats.value.pending = data.filter(d => !d.status || d.status === 'PENDING').length;
    stats.value.proses = data.filter(d => d.status === 'PROSES').length;
    stats.value.selesai = data.filter(d => d.status === 'SELESAI').length;
    stats.value.ditolak = data.filter(d => d.status === 'DITOLAK').length;
  } catch (err) {
    console.error('Gagal mengambil data statistik:', err);
  }
};

onMounted(() => {
  fetchStats();
});
</script>