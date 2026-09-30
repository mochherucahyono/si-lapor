<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-serif font-semibold text-stone-900">Kelola Pengaduan</h1>
      <p class="text-xs text-stone-500 font-light mt-1">Verifikasi berkas, tindak lanjuti laporan, dan berikan tanggapan resmi.</p>
    </div>

    <!-- Search & Filter Bar -->
    <div class="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
      <div class="relative w-full sm:w-80">
        <Search class="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Cari tiket, kasus, atau pesan..." 
          class="w-full pl-10 pr-8 py-2 rounded-xl border border-stone-300 text-xs bg-white text-stone-800 outline-none focus:border-stone-800 focus:ring-1 focus:ring-stone-800 transition"
        />
        <button v-if="searchQuery" @click="searchQuery = ''" class="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer">
          <X class="w-3.5 h-3.5" />
        </button>
      </div>

      <div class="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
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

    <!-- Table Pengaduan -->
    <div class="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
      <div v-if="loading" class="p-12 text-center text-stone-500 space-y-2">
        <Loader2 class="w-6 h-6 animate-spin mx-auto text-stone-800" />
        <p class="text-xs font-light">Memuat daftar pengaduan...</p>
      </div>

      <div v-else-if="filteredList.length === 0" class="p-12 text-center text-stone-500 font-light text-xs">
        Tidak ada data pengaduan yang ditemukan.
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead class="bg-stone-50 text-stone-500 border-b border-stone-200 font-medium">
            <tr>
              <th class="p-4">Tiket / Tanggal</th>
              <th class="p-4">Kategori & Terlapor</th>
              <th class="p-4">Rincian Pesan</th>
              <th class="p-4">Status</th>
              <th class="p-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-stone-100">
            <tr v-for="item in filteredList" :key="item.id" class="hover:bg-stone-50/50 transition">
              <td class="p-4 space-y-1">
                <span class="font-mono text-stone-800 font-medium">#{{ item.nomorTiket || 'SLP-' + item.id }}</span>
                <p class="text-[11px] text-stone-400 font-light">{{ formatDate(item.createdAt) }}</p>
              </td>
              <td class="p-4 space-y-1">
                <p class="font-medium text-stone-900">{{ formatJenisKasus(item.jenisKasus) }}</p>
                <p class="text-[11px] text-stone-500 font-light">Terlapor: {{ item.akunTerlapor }}</p>
              </td>
              <td class="p-4 max-w-xs">
                <p class="line-clamp-2 text-stone-600 font-light leading-relaxed">{{ item.pesan }}</p>
              </td>
              <td class="p-4">
                <span :class="getStatusBadgeClass(item.status)">
                  {{ formatStatus(item.status) }}
                </span>
              </td>
              <td class="p-4 text-right">
                <button 
                  @click="openUpdateModal(item)"
                  class="px-3 py-1.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 text-stone-700 font-medium text-xs transition cursor-pointer shadow-xs"
                >
                  Tindak Lanjut
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- MODAL UPDATE STATUS & TANGGAPAN ADMIN -->
    <Teleport to="body">
      <div v-if="selectedItem" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs">
        <div class="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-stone-200 space-y-5">
          <div class="flex items-center justify-between border-b border-stone-100 pb-3">
            <h3 class="text-base font-serif font-semibold text-stone-900">Proses Aduan #{{ selectedItem.nomorTiket || 'SLP-' + selectedItem.id }}</h3>
            <button @click="selectedItem = null" class="text-stone-400 hover:text-stone-600 cursor-pointer">
              <X class="w-5 h-5" />
            </button>
          </div>

          <div class="space-y-4 text-xs">
            <!-- Pilihan Status -->
            <div>
              <label class="block font-medium text-stone-700 mb-1.5">Ubah Status Laporan</label>
              <select v-model="formStatus" class="w-full p-2.5 rounded-xl border border-stone-300 bg-white text-stone-800 outline-none focus:border-stone-800">
                <option value="PENDING">Menunggu Verifikasi (Pending)</option>
                <option value="PROSES">Dalam Investigasi (Proses)</option>
                <option value="SELESAI">Selesai</option>
                <option value="DITOLAK">Ditolak</option>
              </select>
            </div>

            <!-- Input Tanggapan -->
            <div>
              <label class="block font-medium text-stone-700 mb-1.5">Catatan / Tanggapan Tim Siber</label>
              <textarea 
                v-model="formTanggapan" 
                rows="4" 
                placeholder="Tuliskan catatan tindak lanjut atau alasan jika laporan ditolak..."
                class="w-full p-3 rounded-xl border border-stone-300 bg-white text-stone-800 outline-none focus:border-stone-800 font-light"
              ></textarea>
            </div>
          </div>

          <div class="flex justify-end gap-2 pt-3 border-t border-stone-100">
            <button @click="selectedItem = null" class="px-4 py-2 rounded-xl border border-stone-300 text-stone-700 text-xs font-medium hover:bg-stone-100 transition cursor-pointer">
              Batal
            </button>
            <button 
              @click="submitUpdate" 
              :disabled="submitting"
              class="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium transition cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <Loader2 v-if="submitting" class="w-3.5 h-3.5 animate-spin" />
              <span>Simpan Perubahan</span>
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { Search, X, Loader2 } from 'lucide-vue-next';

const laporanList = ref([]);
const loading = ref(true);
const searchQuery = ref('');
const selectedStatus = ref('ALL');

const selectedItem = ref(null);
const formStatus = ref('PENDING');
const formTanggapan = ref('');
const submitting = ref(false);

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
  { label: 'Semua', value: 'ALL' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'Proses', value: 'PROSES' },
  { label: 'Selesai', value: 'SELESAI' },
  { label: 'Ditolak', value: 'DITOLAK' }
];

const fetchAllPengaduan = async () => {
  loading.value = true;
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:5000/api/pengaduan', {
      headers: { Authorization: `Bearer ${token}` }
    });
    laporanList.value = res.data;
  } catch (err) {
    console.error('Gagal mengambil daftar pengaduan admin:', err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchAllPengaduan();
});

const filteredList = computed(() => {
  return laporanList.value.filter(item => {
    const query = searchQuery.value.toLowerCase();
    const nomorTiket = (item.nomorTiket || ('SLP-' + item.id)).toLowerCase();
    const matchQuery = nomorTiket.includes(query) ||
                       (item.pesan && item.pesan.toLowerCase().includes(query)) ||
                       (item.jenisKasus && item.jenisKasus.toLowerCase().includes(query));

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

const openUpdateModal = (item) => {
  selectedItem.value = item;
  formStatus.value = item.status || 'PENDING';
  formTanggapan.value = item.tanggapan || '';
};

const submitUpdate = async () => {
  if (!selectedItem.value) return;
  submitting.value = true;

  try {
    const token = localStorage.getItem('token');
   const res = await axios.put(`http://localhost:5000/api/pengaduan/${selectedItem.value.id}`, {
      status: formStatus.value,
      tanggapan: formTanggapan.value
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    selectedItem.value.status = formStatus.value;
    selectedItem.value.tanggapan = formTanggapan.value;
    selectedItem.value = null;
  } catch (err) {
    console.error('Gagal memperbarui status pengaduan:', err);
  } finally {
    submitting.value = false;
  }
};

const formatDate = (dateString) => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
};

const formatStatus = (status) => {
  switch (status) {
    case 'PROSES': return 'Proses';
    case 'SELESAI': return 'Selesai';
    case 'DITOLAK': return 'Ditolak';
    default: return 'Pending';
  }
};

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'PROSES': return 'bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-medium px-2 py-0.5 rounded-full';
    case 'SELESAI': return 'bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-medium px-2 py-0.5 rounded-full';
    case 'DITOLAK': return 'bg-red-50 text-red-700 border border-red-200 text-[10px] font-medium px-2 py-0.5 rounded-full';
    default: return 'bg-stone-100 text-stone-600 border border-stone-200 text-[10px] font-medium px-2 py-0.5 rounded-full';
  }
};
</script>