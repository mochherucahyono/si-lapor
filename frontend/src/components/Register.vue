<template>
  <div class="min-h-[85vh] flex items-center justify-center bg-[#fffff] px-4 py-12 font-sans text-stone-800">
    <div class="max-w-md w-full bg-white p-8 rounded-2xl shadow-xs border border-stone-200">
      
      <!-- Header Form -->
      <div class="text-center mb-8">
        <div class="w-10 h-10 rounded-xl bg-stone-900 mx-auto flex items-center justify-center text-white font-serif font-bold text-lg mb-3 shadow-xs">
          S
        </div>
        <h2 class="text-2xl font-serif text-stone-900">Daftar Akun Baru</h2>
        <p class="text-xs text-stone-500 mt-1 font-light">Buat akun untuk mengakses layanan pengaduan siber</p>
      </div>

      <!-- Alert Pesan Sukses / Error -->
      <div v-if="alert.message" :class="`p-3.5 mb-6 rounded-xl text-xs flex items-center gap-2 ${alert.type === 'success' ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' : 'bg-red-50 border border-red-200 text-red-700'}`">
        <CheckCircle2 v-if="alert.type === 'success'" class="w-4 h-4 shrink-0 text-emerald-600" />
        <AlertCircle v-else class="w-4 h-4 shrink-0 text-red-500" />
        <span>{{ alert.message }}</span>
      </div>

      <!-- Form Register -->
      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label class="block text-xs font-medium text-stone-700 mb-1.5 flex items-center gap-1.5">
            <User class="w-3.5 h-3.5 text-stone-400" />
            <span>Nama Lengkap</span>
          </label>
          <input 
            v-model="form.nama" 
            type="text" 
            required 
            placeholder="Masukkan nama lengkap" 
            class="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-800 text-sm outline-none focus:border-stone-800 focus:ring-1 focus:ring-stone-800 transition duration-200" 
          />
        </div>

        <div>
          <label class="block text-xs font-medium text-stone-700 mb-1.5 flex items-center gap-1.5">
            <Mail class="w-3.5 h-3.5 text-stone-400" />
            <span>Alamat Email</span>
          </label>
          <input 
            v-model="form.email" 
            type="email" 
            required 
            placeholder="nama@email.com" 
            class="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-800 text-sm outline-none focus:border-stone-800 focus:ring-1 focus:ring-stone-800 transition duration-200" 
          />
        </div>

        <div>
          <label class="block text-xs font-medium text-stone-700 mb-1.5 flex items-center gap-1.5">
            <Phone class="w-3.5 h-3.5 text-stone-400" />
            <span>No. Telepon / Whatsapp</span>
          </label>
          <input 
            v-model="form.telepon" 
            type="text" 
            placeholder="08123456789" 
            class="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-800 text-sm outline-none focus:border-stone-800 focus:ring-1 focus:ring-stone-800 transition duration-200" 
          />
        </div>

        <div>
          <label class="block text-xs font-medium text-stone-700 mb-1.5 flex items-center gap-1.5">
            <Lock class="w-3.5 h-3.5 text-stone-400" />
            <span>Kata Sandi</span>
          </label>
          <input 
            v-model="form.password" 
            type="password" 
            required 
            placeholder="••••••••" 
            class="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-800 text-sm outline-none focus:border-stone-800 focus:ring-1 focus:ring-stone-800 transition duration-200" 
          />
        </div>

        <!-- Tombol Register dengan State Loading Spinner -->
        <button 
          :disabled="loading" 
          type="submit" 
          class="w-full mt-2 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-400 text-white font-medium py-3 rounded-xl text-sm transition duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed shadow-xs"
        >
          <!-- Animated Spinner Lucide Icon -->
          <Loader2 v-if="loading" class="animate-spin h-4 w-4 text-white" />
          <UserPlus v-else class="w-4 h-4" />

          <span>{{ loading ? 'Mendaftarkan Akun...' : 'Daftar Akun' }}</span>
        </button>
      </form>

      <!-- Footer Link ke Login -->
      <div class="mt-6 text-center text-xs text-stone-500 font-light flex items-center justify-center gap-1">
        <span>Sudah memiliki akun?</span> 
        <router-link to="/login" class="text-stone-900 font-medium hover:underline inline-flex items-center gap-0.5">
          <span>Masuk</span>
        </router-link>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

// Import Icon Lucide
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  UserPlus, 
  Loader2, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight 
} from 'lucide-vue-next';

const emit = defineEmits(['navigate-login']);
const form = ref({ nama: '', email: '', telepon: '', password: '' });
const loading = ref(false);
const alert = ref({ message: '', type: '' });

const handleRegister = async () => {
  loading.value = true;
  alert.value = { message: '', type: '' };
  try {
    const res = await axios.post('http://localhost:5000/api/auth/register', form.value);
    alert.value = { 
      message: res.data.message || 'Pendaftaran berhasil! Silakan masuk ke akun Anda.', 
      type: 'success' 
    };
    form.value = { nama: '', email: '', telepon: '', password: '' };
  } catch (err) {
    alert.value = { 
      message: err.response?.data?.message || 'Registrasi gagal. Periksa kembali data Anda.', 
      type: 'error' 
    };
  } finally {
    loading.value = false;
  }
};
</script>