<template>
  <div class="min-h-screen bg-[#fffff] py-10 px-4 sm:px-6 lg:px-8 font-sans text-stone-800">
    <div class="max-w-5xl mx-auto space-y-6">
      
      <!-- Header Halaman -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
        <div>
          <h1 class="text-2xl font-serif text-stone-900">Riwayat Pengaduan</h1>
          <p class="text-xs text-stone-500 font-light mt-1">Pantau perkembangan dan status penanganan laporan yang telah Anda kirimkan.</p>
        </div>

        <router-link 
          to="/pengaduan" 
          class="inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium px-4 py-2.5 rounded-xl transition shadow-xs"
        >
          <Plus class="w-4 h-4" />
          <span>Buat</span>
        </router-link>
      </div>

      <!-- Filter Bar: Search & Status Filter -->
      <div class="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
        <!-- Search Input -->
        <div class="relative w-full sm:w-80">
          <Search class="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Cari berdasarkan nomor tiket, pesan, atau kasus..." 
            class="w-full pl-10 pr-8 py-2 rounded-xl border border-stone-300 text-xs bg-white text-stone-800 outline-none focus:border-stone-800 focus:ring-1 focus:ring-stone-800 transition"
          />
          <button 
            v-if="searchQuery" 
            @click="searchQuery = ''" 
            class="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
          >
            <X class="w-3.5 h-3.5" />
          </button>
        </div>

        <!-- Filter Status Buttons -->
        <div class="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <button 
            v-for="status in statusOptions" 
            :key="status.value"
            @click="selectedStatus = status.value"
            :class="`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition cursor-pointer ${
              selectedStatus === status.value 
                ? 'bg-stone-900 text-white shadow-xs' 
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200/70'
            }`"
          >
            {{ status.label }}
          </button>
        </div>
      </div>

      <!-- State Loading -->
      <div v-if="loading" class="text-center py-16 bg-white rounded-2xl border border-stone-200 shadow-xs">
        <Loader2 class="animate-spin h-6 w-6 text-stone-800 mx-auto mb-2" />
        <p class="text-xs text-stone-500 font-light">Memuat riwayat laporan Anda...</p>
      </div>

      <!-- State Kosong / Belum Ada Pengaduan -->
      <div v-else-if="laporanList.length === 0" class="text-center py-16 bg-white rounded-2xl border border-stone-200 shadow-xs">
        <div class="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-400 mb-3">
          <FileText class="w-6 h-6" />
        </div>
        <h3 class="text-sm font-medium text-stone-800">Belum Ada Pengaduan</h3>
        <p class="text-xs text-stone-500 font-light mt-1">Anda belum pernah mengirimkan laporan kejahatan siber.</p>
        <router-link to="/pengaduan" class="inline-flex items-center gap-1 mt-4 text-xs font-medium text-stone-900 hover:underline">
          <span>Kirim laporan pertama Anda</span>
          <ArrowRight class="w-3.5 h-3.5" />
        </router-link>
      </div>

      <!-- State Hasil Pencarian / Filter Tidak Ditemukan -->
      <div v-else-if="filteredList.length === 0" class="text-center py-12 bg-white rounded-2xl border border-stone-200 shadow-xs p-6">
        <p class="text-xs text-stone-500 font-light">Tidak ada laporan yang sesuai dengan pencarian atau filter status yang dipilih.</p>
        <button 
          @click="resetFilters" 
          class="mt-3 px-3 py-1.5 rounded-xl border border-stone-300 text-xs text-stone-700 hover:bg-stone-50 font-medium transition cursor-pointer"
        >
          Reset Filter
        </button>
      </div>

      <!-- Daftar Card Pengaduan -->
      <div v-else class="space-y-4">
        <div 
          v-for="item in paginatedData" 
          :key="item.id" 
          class="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs hover:border-stone-300 transition duration-200"
        >
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3 mb-3">
            <div class="flex items-center gap-2">
              <span class="text-xs font-mono bg-stone-100 text-stone-700 px-2.5 py-1 rounded-md font-semibold">
               No. Tiket : #{{ item.nomorTiket || 'SLP-' + item.id }}
              </span>
              <span class="text-xs text-stone-400">•</span>
              <span class="text-xs text-stone-500 flex items-center gap-1">
                <Calendar class="w-3 h-3 text-stone-400" />
                {{ formatDate(item.createdAt) }}
              </span>
            </div>

            <!-- Status Badge -->
            <div>
              <span :class="getStatusBadgeClass(item.status)">
                <component :is="getStatusIcon(item.status)" class="w-3 h-3 shrink-0" />
                {{ formatStatus(item.status) }}
              </span>
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-medium text-stone-900">
                Jenis Kasus : <span class="text-stone-700">{{ formatJenisKasus(item.jenisKasus) }}</span>
              </h3>
            </div>
            
            <p class="text-xs text-stone-600 line-clamp-2 font-light leading-relaxed">
            {{ item.pesan }}
            </p>

            <div class="pt-2 flex items-center justify-between text-xs text-stone-500">
              <span class="flex items-center gap-1">
                <UserX class="w-3.5 h-3.5 text-stone-400" />
                <span>Terlapor : <strong class="text-stone-800 font-medium">{{ item.akunTerlapor }}</strong></span>
              </span>
              
              <button 
                @click="openDetail(item)" 
                class="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs transition duration-200 flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Lihat Detail & Progress</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination Controls -->
      <div v-if="totalPages > 1" class="flex items-center justify-between pt-4 border-t border-stone-200 text-xs text-stone-600">
        <p class="font-light">
          Menampilkan <strong class="font-medium text-stone-900">{{ startIndex + 1 }}</strong> - <strong class="font-medium text-stone-900">{{ Math.min(endIndex, filteredList.length) }}</strong> dari <strong class="font-medium text-stone-900">{{ filteredList.length }}</strong> laporan
        </p>

        <div class="flex items-center gap-1.5">
          <button 
            @click="currentPage--" 
            :disabled="currentPage === 1"
            class="p-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
          >
            <ChevronLeft class="w-4 h-4" />
          </button>

          <span class="px-3 py-1 bg-stone-100 rounded-lg text-xs font-medium text-stone-800">
            {{ currentPage }} / {{ totalPages }}
          </span>

          <button 
            @click="currentPage++" 
            :disabled="currentPage === totalPages"
            class="p-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
          >
            <ChevronRight class="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>

    <!-- MODAL DETAIL & TIMELINE PROGRESS -->
    <Teleport to="body">
      <div v-if="selectedLaporan" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs">
        <div class="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-xl border border-stone-200 max-h-[90vh] overflow-y-auto">
          
          <!-- Header Modal -->
          <div class="flex items-center justify-between border-b border-stone-100 pb-4 mb-5">
            <div>
              <span class="text-xs font-mono text-stone-500">Nomor Tiket</span>
              <h2 class="text-lg font-serif text-stone-900 font-semibold">
                #{{ selectedLaporan.nomorTiket || 'SLP-' + selectedLaporan.id }}
              </h2>
            </div>

            <button @click="selectedLaporan = null" class="text-stone-400 hover:text-stone-700 p-1 rounded-lg cursor-pointer">
              <X class="w-5 h-5" />
            </button>
          </div>

          <!-- Timeline Alur Progress -->
          <div class="mb-6 bg-stone-50 p-4 rounded-xl border border-stone-200/80">
            <h4 class="text-xs font-medium text-stone-700 mb-4 flex items-center gap-1.5">
              <Activity class="w-4 h-4 text-stone-500" />
              <span>Progres Penanganan Laporan</span>
            </h4>
            
            <div class="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
              
              <!-- Step 1: Diterima -->
              <div class="relative">
                <span class="absolute -left-6 top-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
                  <Check class="w-2.5 h-2.5 text-white" />
                </span>
                <p class="text-xs font-medium text-stone-900">Laporan Diterima System</p>
                <p class="text-[11px] text-stone-500 font-light mt-0.5">Laporan telah masuk ke basis data SiLapor.</p>
              </div>

              <!-- Step 2: Verifikasi -->
              <div class="relative">
                <span :class="`absolute -left-6 top-0 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center ${['PROSES', 'SELESAI'].includes(selectedLaporan.status) ? 'bg-emerald-500 text-white' : 'bg-stone-300 text-stone-500'}`">
                  <Check v-if="['PROSES', 'SELESAI'].includes(selectedLaporan.status)" class="w-2.5 h-2.5" />
                </span>
                <p class="text-xs font-medium text-stone-900">Verifikasi Berkas & Analisis</p>
                <p class="text-[11px] text-stone-500 font-light mt-0.5">Tim verifikator mengecek kelengkapan bukti digital.</p>
              </div>

              <!-- Step 3: Tindak Lanjut / Selesai -->
              <div class="relative">
                <span :class="`absolute -left-6 top-0 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center ${selectedLaporan.status === 'SELESAI' ? 'bg-emerald-500 text-white' : selectedLaporan.status === 'DITOLAK' ? 'bg-red-500 text-white' : 'bg-stone-300'}`">
                  <Check v-if="selectedLaporan.status === 'SELESAI'" class="w-2.5 h-2.5" />
                  <X v-else-if="selectedLaporan.status === 'DITOLAK'" class="w-2.5 h-2.5" />
                </span>
                <p class="text-xs font-medium text-stone-900">
                  {{ selectedLaporan.status === 'DITOLAK' ? 'Laporan Ditolak' : 'Tindak Lanjut & Penyelesaian' }}
                </p>

                <!-- Tanggapan Petugas / Catatan -->
                <p v-if="selectedLaporan.tanggapan" class="text-xs text-stone-700 bg-white p-3 rounded-lg border border-stone-200 mt-2 font-light">
                  <strong class="font-medium text-stone-900 block mb-0.5 flex items-center gap-1">
                    <MessageSquare class="w-3.5 h-3.5 text-stone-500" />
                    Catatan Tim Siber:
                  </strong>
                  {{ selectedLaporan.tanggapan }}
                </p>
              </div>

            </div>
          </div>

          <!-- Detail Informasi Terlapor & Pesan -->
          <div class="space-y-3 text-xs">
            <div class="grid grid-cols-2 gap-2 bg-stone-50 p-3 rounded-xl border border-stone-100">
              <div>
                <span class="text-stone-400 block text-[11px]">Jenis Kasus</span>
                <strong class="text-stone-800">{{ formatJenisKasus(selectedLaporan.jenisKasus) }}</strong>
              </div>
              <div>
                <span class="text-stone-400 block text-[11px]">Akun Terlapor</span>
                <strong class="text-stone-800">{{ selectedLaporan.akunTerlapor }}</strong>
              </div>
            </div>

            <div>
              <span class="text-stone-500 block mb-1">Rincian Pesan Laporan:</span>
              <p class="bg-stone-50 p-3 rounded-xl border border-stone-200 text-stone-700 font-light leading-relaxed">
                {{ selectedLaporan.pesan }}
              </p>
            </div>
          </div>

          <!-- Footer Modal -->
          <div class="mt-6 pt-4 border-t border-stone-100 flex justify-end">
            <button 
              @click="selectedLaporan = null" 
              class="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium transition cursor-pointer"
            >
              Tutup
            </button>
          </div>

        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import axios from 'axios';

// Import Icon Lucide
import { 
  Plus, 
  Loader2, 
  FileText, 
  ArrowRight, 
  Calendar, 
  X, 
  Check, 
  Clock, 
  Search, 
  CheckCircle2, 
  XCircle, 
  UserX, 
  Activity, 
  MessageSquare,
  ChevronLeft,
  ChevronRight
} from 'lucide-vue-next';

const laporanList = ref([]);
const loading = ref(true);
const selectedLaporan = ref(null);

// State untuk Filter, Search, dan Pagination
const searchQuery = ref('');
const selectedStatus = ref('ALL');
const currentPage = ref(1);
const itemsPerPage = ref(5);

const formatJenisKasus = (val) => {
  const mapKasus = {
    AKSES_ILEGAL: 'Akses Ilegal',
    ANCAMAN_KEKERASAN: 'Ancaman Kekerasan',
    ANCAMAN_PENCEMARAN: 'Ancaman Pencemaran',
    BERITA_BOHONG: 'Berita Bohong',
    CRACKING: 'Cracking',
    EKSFILTRASI_DATA: 'Eksfiltrasi Data',
    FASILITASI_KEJAHATAN_SIBER: 'Fasilitasi Kejahatan Siber',
    GANGGUAN_SISTEM: 'Gangguan Sistem',
    INTERSEPSI: 'Intersepsi',
    INTRUSI: 'Intrusi',
    JUDI_ONLINE: 'Judi Online',
    MANIPULASI_DATA_DARI_INTERSEPSI: 'Manipulasi Data Dari Intersepsi',
    MANIPULASI_DATA_YANG_TIDAK_SAH: 'Manipulasi Data Yang Tidak Sah',
    NARKOBA_ILLEGAL: 'Narkoba Illegal',
    PENCEMARAN_NAMA_BAIK: 'Pencemaran Nama Baik',
    PENCURIAN_DATA: 'Pencurian Data',
    PENGUNGKAPAN_DATA_YANG_TIDAK_SAH: 'Pengungkapan Data Yang Tidak Sah',
    PENIPUAN_ONLINE: 'Penipuan Online',
    PERDAGANGAN_HEWAN_YANG_DILINDUNGI: 'Perdagangan Hewan yang Dilindungi',
    PERDAGANGAN_ORANG: 'Perdagangan Orang',
    PERUNDUNGAN_ONLINE: 'Perundungan Online',
    PORNOGRAFI: 'Pornografi',
    PROSTITUSI: 'Prostitusi',
    PROVOKASI_PENGHASUTAN: 'Provokasi/Penghasutan',
    UJARAN_KEBENCIAN: 'Ujaran Kebencian (SARA)',
    LAINNYA: 'Lainnya',
  };

  return mapKasus[val] || val;
};

const statusOptions = [
  { label: 'Semua Status', value: 'ALL' },
  { label: 'Menunggu', value: 'PENDING' },
  { label: 'Proses', value: 'PROSES' },
  { label: 'Selesai', value: 'SELESAI' },
  { label: 'Ditolak', value: 'DITOLAK' }
];

const fetchRiwayat = async () => {
  loading.value = true;
  const token = localStorage.getItem('token');

  if (!token) {
    console.error('Token tidak ditemukan. Silakan login terlebih dahulu.');
    loading.value = false;
    return;
  }

  try {
    const res = await axios.get('http://localhost:5000/api/pengaduan/my-reports', {
      headers: { Authorization: `Bearer ${token}` }
    });
    laporanList.value = res.data;
  } catch (err) {
    console.error('Gagal mengambil data riwayat pengaduan:', err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchRiwayat();
});

// Filter Client-side berdasarkan field riil backend (nomorTiket, pesan, jenisKasus, akunTerlapor, status)
const filteredList = computed(() => {
  return laporanList.value.filter(item => {
    const query = searchQuery.value.toLowerCase();
    const nomorTiket = (item.nomorTiket || ('SLP-' + item.id)).toLowerCase();
    
    const matchQuery = nomorTiket.includes(query) ||
                       (item.pesan && item.pesan.toLowerCase().includes(query)) ||
                       (item.jenisKasus && item.jenisKasus.toLowerCase().includes(query)) ||
                       (item.akunTerlapor && item.akunTerlapor.toLowerCase().includes(query));

    let matchStatus = true;
    if (selectedStatus.value !== 'ALL') {
      if (selectedStatus.value === 'PENDING') {
        matchStatus = !item.status || item.status === 'PENDING';
      } else {
        matchStatus = item.status === selectedStatus.value;
      }
    }

    return matchQuery && matchStatus;
  });
});

// Reset ke halaman 1 ketika pencarian atau filter diubah
watch([searchQuery, selectedStatus], () => {
  currentPage.value = 1;
});

// Hitung total halaman dan paginasi data
const totalPages = computed(() => Math.ceil(filteredList.value.length / itemsPerPage.value) || 1);
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value);
const endIndex = computed(() => startIndex.value + itemsPerPage.value);

const paginatedData = computed(() => {
  return filteredList.value.slice(startIndex.value, endIndex.value);
});

const resetFilters = () => {
  searchQuery.value = '';
  selectedStatus.value = 'ALL';
  currentPage.value = 1;
};

const openDetail = (item) => {
  selectedLaporan.value = item;
};

const formatDate = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

const formatStatus = (status) => {
  switch (status) {
    case 'PROSES': return 'Dalam Investigasi';
    case 'SELESAI': return 'Selesai';
    case 'DITOLAK': return 'Ditolak';
    default: return 'Menunggu Verifikasi';
  }
};

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'PROSES':
      return 'bg-amber-50 text-amber-700 border border-amber-200 text-[11px] font-medium px-2.5 py-1 rounded-full inline-flex items-center gap-1.5';
    case 'SELESAI':
      return 'bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-medium px-2.5 py-1 rounded-full inline-flex items-center gap-1.5';
    case 'DITOLAK':
      return 'bg-red-50 text-red-700 border border-red-200 text-[11px] font-medium px-2.5 py-1 rounded-full inline-flex items-center gap-1.5';
    default:
      return 'bg-stone-100 text-stone-600 border border-stone-200 text-[11px] font-medium px-2.5 py-1 rounded-full inline-flex items-center gap-1.5';
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'PROSES': return Search;
    case 'SELESAI': return CheckCircle2;
    case 'DITOLAK': return XCircle;
    default: return Clock;
  }
};
</script>