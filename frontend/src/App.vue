<template>
  <div class="min-h-screen bg-[#fffff] text-stone-800 font-sans antialiased">
    <!-- Header / Navbar -->
    <header v-if="!$route.path.startsWith('/admin')" class="bg-[#fffff]/90 backdrop-blur-md border-b border-stone-200 sticky top-0 z-50">
      <nav class="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        
        <!-- Logo -->
        <router-link to="/silapor" class="flex items-center gap-2" title="Beranda SiLapor" aria-label="Beranda SiLapor">
          <div class="w-8 h-8 rounded-xl bg-stone-900 flex items-center justify-center font-serif text-white font-bold text-sm shadow-xs">
            S
          </div>
          <h1 class="text-base font-serif font-semibold text-stone-900 tracking-tight">SiLapor</h1>
        </router-link>

        <!-- Desktop Navigation: Saat User Sudah Login -->
        <div v-if="currentUser" class="hidden md:flex items-center space-x-4">
          <router-link 
            to="/silapor" 
            active-class="bg-stone-200/60 text-stone-900"
            title="Beranda SiLapor"
            class="px-3 py-1.5 rounded-full text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-200/50 transition flex items-center gap-1.5"
          >
            <Home class="w-4 h-4" />
            <span>Beranda</span>
          </router-link>

          <router-link 
            to="/statistic" 
            active-class="bg-stone-200/60 text-stone-900"
            title="Statistik Laporan"
            class="px-3 py-1.5 rounded-full text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-200/50 transition flex items-center gap-1.5"
          >
            <BarChart class="w-4 h-4" />
            <span>Statistik</span>
          </router-link>
          <router-link 
            to="/about-us" 
            active-class="bg-stone-200/60 text-stone-900"
            title="Tentang Kami"
            class="px-3 py-1.5 rounded-full text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-200/50 transition flex items-center gap-1.5"
          >
            <Info class="w-4 h-4" />
            <span>Tentang Kami</span>
          </router-link>

          <span class="text-xs text-stone-300">|</span>
          
          <router-link 
            to="/pengaduan" 
            active-class="bg-stone-200/60 text-stone-900"
            title="Buat Pengaduan"
            class="px-3 py-1.5 rounded-full text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-200/50 transition flex items-center gap-1.5"
          >
            <Plus class="w-4 h-4" />
            <span>Buat</span>
          </router-link>

          <router-link 
            to="/riwayat" 
            active-class="bg-stone-200/60 text-stone-900"
            title="Riwayat Pengaduan"
            class="px-3 py-1.5 rounded-full text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-200/50 transition flex items-center gap-1.5"
          >
            <RotateCcw class="w-4 h-4" />
            <span>Riwayat</span>
          </router-link>

          <span class="text-xs text-stone-300">|</span>

          <router-link 
            to="/profile" 
            active-class="bg-stone-200/60 text-stone-900"
            :title="currentUser.nama ? currentUser.nama : 'Profil'"
            class="px-3 py-1.5 rounded-full text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-200/50 transition flex items-center gap-1.5"
          >
            <div class="w-4 h-4 rounded-full bg-stone-900 flex items-center justify-center text-white font-serif text-xs">
            {{ currentUser.nama ? currentUser.nama.charAt(0).toUpperCase() : 'U' }}
            </div>
            {{ currentUser.nama ? currentUser.nama.split(' ')[0] : 'Profil' }}
          </router-link>
          <!-- Tempat Pengembalian tombol logout -->
        </div>

        <!-- Desktop Navigation: Saat User Belum Login -->
        <div v-else class="hidden md:flex items-center space-x-2">
          <router-link 
            to="/silapor" 
            active-class="text-stone-900 bg-stone-200/60"
            title="Beranda SiLapor"
            class="px-3 py-1.5 rounded-full text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-200/50 transition flex items-center gap-1.5"
          >
            <Home class="w-4 h-4" />
            <span>Beranda</span>
          </router-link>

          <router-link 
            to="/statistic" 
            active-class="text-stone-900 bg-stone-200/60" 
            class="px-3 py-1.5 rounded-full text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-200/50 transition flex items-center gap-1.5"
          >
            <BarChart class="w-4 h-4" />
            <span>Statistik</span>
          </router-link>

          <router-link 
            to="/about-us" 
            active-class="text-stone-900 bg-stone-200/60" 
            class="px-3 py-1.5 rounded-full text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-200/50 transition flex items-center gap-1.5"
          >
            <Info class="w-4 h-4" />
            <span>Tentang Kami</span>
          </router-link>
          
          <router-link 
            to="/register" 
            active-class="text-stone-900 bg-stone-200/60"
            title="Daftar Akun"
            class="px-3 py-1.5 rounded-full text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-200/50 transition flex items-center gap-1.5"
          >
            <UserPlus class="w-4 h-4" />
            <span>Daftar</span>
          </router-link>
          <router-link 
            to="/login" 
            class="px-3.5 py-1.5 rounded-full text-xs font-medium bg-stone-900 text-white hover:bg-stone-800 transition shadow-xs flex items-center gap-1.5"
            title="Masuk ke Akun"
          >
            <LogIn class="w-4 h-4" />
            <span>Masuk</span>
          </router-link>
        </div>

        <!-- Tombol Hamburger Menu Mobile -->
        <button 
          @click="isOffcanvasOpen = true" 
          title="Menu"
          class="md:hidden p-2 text-stone-700 hover:text-stone-900 hover:bg-stone-200/50 rounded-full transition cursor-pointer"
          aria-label="Buka Menu Navigasi"
        >
          <Menu class="w-6 h-6" />
        </button>
      </nav>
    </header>

    <!-- Navigation Offcanvas Drawer (Mobile) -->
    <Teleport to="body">
      <!-- Backdrop Overlay -->
      <Transition
        enter-active-class="transition-opacity duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div 
          v-if="isOffcanvasOpen" 
          @click="isOffcanvasOpen = false"
          class="fixed inset-0 bg-stone-900/40 backdrop-blur-xs z-50 md:hidden"
        ></div>
      </Transition>

      <!-- Panel Offcanvas Sliding Drawer -->
      <Transition
        enter-active-class="transition-transform duration-300 ease-out"
        enter-from-class="translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transition-transform duration-200 ease-in"
        leave-from-class="translate-x-0"
        leave-to-class="translate-x-full"
      >
        <div 
          v-if="isOffcanvasOpen" 
          class="fixed inset-y-0 right-0 w-72 bg-white shadow-2xl z-50 md:hidden flex flex-col justify-between border-l border-stone-200 p-6"
        >
          <div>
            <!-- Header Offcanvas -->
            <div class="flex items-center justify-between pb-4 border-b border-stone-100">
              <div class="flex items-center gap-2">
                <div class="w-7 h-7 rounded-lg bg-stone-900 flex items-center justify-center font-serif text-white font-bold text-xs">
                  L
                </div>
                <span class="font-serif font-semibold text-stone-900 text-sm">SiLapor</span>
              </div>
              <button 
                @click="isOffcanvasOpen = false"
                title="Tutup Menu"
                class="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition"
              >
                <X class="w-5 h-5" />
              </button>
            </div>

            <!-- Profile Ringkasan saat Login (Mobile) -->
            <router-link v-if="currentUser" to="/profile" @click="isOffcanvasOpen = false" class="mt-4 p-3 bg-stone-50 rounded-xl border border-stone-100 hover:bg-stone-100 hover:border-stone-200 flex items-center gap-3">
              <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-full bg-stone-900 flex items-center justify-center text-white font-serif text-xs">
                    {{ currentUser.nama ? currentUser.nama.charAt(0).toUpperCase() : 'U' }}
                  </div>
                  <div>
                    <p class="text-[11px] text-stone-400 font-light">Masuk sebagai</p>
                    <p class="text-xs font-semibold text-stone-900 truncate max-w-[150px]">{{ currentUser.nama }}</p>
                  </div>
              </div>
            </router-link>

            <!-- Link Navigasi Mobile -->
            <div class="mt-6 space-y-1">
              <template v-if="currentUser">
                <router-link 
                  to="/silapor" 
                  @click="isOffcanvasOpen = false"
                  active-class="bg-stone-100 text-stone-900 font-medium"
                  class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs text-stone-900 hover:bg-stone-100 transition"
                >
                  <Home class="w-4 h-4 text-stone-900" />
                  <span>Beranda</span>
                </router-link>
                <router-link 
                  to="/pengaduan" 
                  @click="isOffcanvasOpen = false"
                  active-class="bg-stone-200 text-stone-900 font-medium"
                  class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs text-stone-900 hover:bg-stone-100 transition"
                >
                  <Plus class="w-4 h-4 text-stone-900" />
                  <span>Buat Laporan</span>
                </router-link>

                <router-link 
                  to="/riwayat" 
                  @click="isOffcanvasOpen = false"
                  active-class="bg-stone-100 text-stone-900 font-medium"
                  class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs text-stone-900 hover:bg-stone-100 transition"
                >
                  <RotateCcw class="w-4 h-4 text-stone-900" />
                  <span>Riwayat Saya</span>
                </router-link>

                <div class="border-t border-stone-100 my-2"></div>

                <router-link 
                  to="/statistic" 
                  @click="isOffcanvasOpen = false"
                  active-class="bg-stone-100 text-stone-900 font-medium"
                  class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs text-stone-900 hover:bg-stone-100 transition"
                >
                  <BarChart class="w-4 h-4 text-stone-900" />
                  <span>Statistik</span>
                </router-link>

                <router-link 
                  to="/about-us" 
                  active-class="bg-stone-100 text-stone-900 font-medium" 
                  class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs text-stone-900 hover:bg-stone-100 transition"
                >
                  <Info class="w-3.5 h-3.5" />
                  <span>Tentang Kami</span>
                </router-link>
              </template>

              <template v-else>
                <router-link 
                  to="/silapor" 
                  @click="isOffcanvasOpen = false"
                  active-class="bg-stone-100 text-stone-900 font-medium"
                  class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs text-stone-900 hover:bg-stone-100 transition"
                >
                  <Home class="w-4 h-4 text-stone-900" />
                  <span>Beranda</span>
                </router-link>

                <router-link 
                  to="/statistic" 
                  @click="isOffcanvasOpen = false"
                  active-class="bg-stone-100 text-stone-900 font-medium"
                  class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs text-stone-900 hover:bg-stone-100 transition"
                >
                  <BarChart class="w-4 h-4 text-stone-900" />
                  <span>Statistik</span>
                </router-link>

                <router-link 
                  to="/about-us" 
                  active-class="bg-stone-100 text-stone-900 font-medium" 
                  class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs text-stone-900 hover:bg-stone-100 transition"
                >
                  <Info class="w-3.5 h-3.5" />
                  <span>Tentang Kami</span>
                </router-link>

                <div class="border-t border-stone-100 my-2"></div>

                <router-link 
                  to="/register" 
                  @click="isOffcanvasOpen = false"
                  active-class="bg-stone-100 text-stone-900 font-medium"
                  class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs text-stone-900 hover:bg-stone-100 transition"
                >
                  <UserPlus class="w-4 h-4 text-stone-900" />
                  <span>Daftar Akun</span>
                </router-link>

                <router-link 
                  to="/login" 
                  @click="isOffcanvasOpen = false"
                  active-class="bg-stone-100 text-stone-900 font-medium"
                  class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs text-stone-900 hover:bg-stone-100 transition"
                >
                  <LogIn class="w-4 h-4 text-stone-900" />
                  <span>Masuk</span>
                </router-link>
              </template>
            </div>
          </div>

          <!-- Tombol Logout di Offcanvas -->
          <div v-if="currentUser" class="pt-4 border-t border-stone-100">
            <button 
              @click="isOffcanvasOpen = false; showLogoutModal = true" 
              class="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 text-xs font-medium transition cursor-pointer"
            >
              <LogOut class="w-4 h-4" />
              <span>Keluar dari Akun</span>
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Content Router View -->
    <main>
      <router-view @login-success="checkUserSession" @open-logout-modal="showLogoutModal = true" />
    </main>

    <!-- Modal Konfirmasi Logout -->
    <Teleport to="body">
      <div v-if="showLogoutModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs transition-opacity">
        <div class="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-stone-200 text-stone-800 animate-in fade-in zoom-in-95 duration-150">
          
          <div class="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-4">
            <LogOut class="w-5 h-5" />
          </div>

          <h3 class="text-base font-serif font-medium text-stone-900">Konfirmasi Keluar</h3>
          <p class="text-xs text-stone-500 mt-1 font-light leading-relaxed">
            Apakah Anda yakin ingin keluar dari akun? Sesi Anda saat ini akan diakhiri.
          </p>

          <div class="mt-6 flex items-center justify-end gap-2">
            <button 
              @click="showLogoutModal = false" 
              class="px-4 py-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 text-xs font-medium transition cursor-pointer"
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
    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Footer from './components/Footer.vue';

// Import Icon Lucide
import { 
  Menu, 
  X,
  Info,
  BarChart, 
  Plus, 
  RotateCcw, 
  CircleUser, 
  LogOut, 
  Home, 
  UserPlus, 
  LogIn 
} from 'lucide-vue-next';

const router = useRouter();
const route = useRoute();

const currentUser = ref(null);
const showLogoutModal = ref(false);
const isOffcanvasOpen = ref(false);

const checkUserSession = () => {
  const savedUser = localStorage.getItem('user');
  if (savedUser) {
    currentUser.value = JSON.parse(savedUser);
  } else {
    currentUser.value = null;
  }
};

onMounted(() => {
  checkUserSession();
});

// Kunci scroll background saat Modal Logout atau Offcanvas Menu terbuka
watch([showLogoutModal, isOffcanvasOpen], ([isModalOpen, isDrawerOpen]) => {
  if (isModalOpen || isDrawerOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

// Memantau perubahan rute untuk memperbarui sesi user secara real-time & menutup offcanvas saat navigasi
watch(route, () => {
  checkUserSession();
  isOffcanvasOpen.value = false;
});

const confirmLogout = () => {
  document.body.style.overflow = ''; // Mengembalikan scroll saat logout
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  currentUser.value = null;
  showLogoutModal.value = false;
  router.push('/login');
};
</script>