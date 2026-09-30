<template>
  <div class="h-screen bg-[#faf9f6] text-stone-800 font-sans flex flex-col md:flex-row overflow-hidden">
    <!-- Sidebar (Fixed / Tidak ikut ter-scroll) -->
    <aside class="w-full md:w-64 bg-white border-r border-stone-200 shrink-0 p-5 flex flex-col justify-between h-auto md:h-screen sticky top-0 z-30">
      <div class="space-y-6">
        <!-- Brand -->
        <div class="flex items-center gap-2.5 px-2">
          <div class="w-8 h-8 rounded-xl bg-stone-900 text-white flex items-center justify-center font-serif font-bold text-sm shadow-xs">
            S
          </div>
          <div>
            <h2 class="text-sm font-semibold text-stone-900">SiLapor</h2>
            <p class="text-[10px] text-stone-400 font-light">Admin Panel</p>
          </div>
        </div>

        <!-- Navigation Menu -->
        <nav class="space-y-1">
          <button 
            @click="activeTab = 'overview'" 
            :class="`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition cursor-pointer ${
              activeTab === 'overview' 
                ? 'bg-stone-900 text-white shadow-xs' 
                : 'text-stone-600 hover:bg-stone-100'
            }`"
          >
            <LayoutDashboard class="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <button 
            @click="activeTab = 'pengaduan'" 
            :class="`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition cursor-pointer ${
              activeTab === 'pengaduan' 
                ? 'bg-stone-900 text-white shadow-xs' 
                : 'text-stone-600 hover:bg-stone-100'
            }`"
          >
            <FileText class="w-4 h-4" />
            <span>Kelola Pengaduan</span>
          </button>
        </nav>
      </div>

      <!-- Logout Button -->
      <div class="pt-4 border-t border-stone-100">
        <button 
          @click="showLogoutModal = true" 
          class="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium text-red-600 hover:bg-red-50 transition cursor-pointer"
        >
          <LogOut class="w-4 h-4" />
          <span>Keluar</span>
        </button>
      </div>
    </aside>

    <!-- Main Content Area (Scrollable Mandiri) -->
    <main class="flex-1 h-screen overflow-y-auto p-6 sm:p-8">
      <DashboardOverview v-if="activeTab === 'overview'" @navigate-to-pengaduan="activeTab = 'pengaduan'" />
      <KelolaPengaduan v-else-if="activeTab === 'pengaduan'" />
    </main>

    <!-- Modal Konfirmasi Logout -->
    <Teleport to="body">
      <div 
        v-if="showLogoutModal" 
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs transition-opacity"
      >
        <div class="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-stone-200 text-stone-800 animate-in fade-in zoom-in-95 duration-150">
          
          <div class="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-4">
            <LogOut class="w-5 h-5" />
          </div>

          <h3 class="text-base font-serif font-medium text-stone-900">Konfirmasi Keluar</h3>
          <p class="text-xs text-stone-500 mt-1 font-light leading-relaxed">
            Apakah Anda yakin ingin keluar dari halaman Admin? Sesi Anda saat ini akan diakhiri.
          </p>

          <div class="mt-6 flex items-center justify-end gap-2">
            <button 
              @click="showLogoutModal = false" 
              class="px-4 py-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 text-stone-700 text-xs font-medium transition cursor-pointer"
            >
              Batal
            </button>

            <button 
              @click="confirmLogout" 
              class="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-medium transition shadow-xs cursor-pointer"
            >
              Keluar
            </button>
          </div>

        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { LayoutDashboard, FileText, LogOut } from 'lucide-vue-next';
import DashboardOverview from './DashboardOverview.vue';
import KelolaPengaduan from './KelolaPengaduan.vue';

const router = useRouter();
const activeTab = ref('overview');
const showLogoutModal = ref(false);

// Kunci scroll background saat modal terbuka
watch(showLogoutModal, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

const confirmLogout = () => {
  document.body.style.overflow = ''; // Kembalikan scroll body
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  router.push('/login');
};
</script>