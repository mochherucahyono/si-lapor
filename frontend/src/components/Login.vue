<template>
  <div class="min-h-[80vh] flex items-center justify-center bg-[#fffff] px-4 py-12 font-sans text-stone-800">
    <div class="max-w-md w-full bg-white p-8 rounded-2xl shadow-xs border border-stone-200">
      
      <!-- Header Form -->
      <div class="text-center mb-8">
        <div class="w-10 h-10 rounded-xl bg-stone-900 mx-auto flex items-center justify-center text-white font-serif font-bold text-lg mb-3 shadow-xs">
          S
        </div>
        <h2 class="text-2xl font-serif text-stone-900">Masuk Akun</h2>
        <p class="text-xs text-stone-500 mt-1 font-light">Masukkan kredensial Anda untuk mengakses portal SiLapor</p>
      </div>

      <!-- Alert Pesan Error -->
      <div v-if="alert.message" class="p-3.5 mb-6 rounded-xl text-xs bg-red-50 border border-red-200 text-red-700 flex items-center gap-2">
        <AlertCircle class="w-4 h-4 shrink-0 text-red-500" />
        <span>{{ alert.message }}</span>
      </div>

      <!-- Toast Info Placeholder Reset Password -->
      <div v-if="resetInfo" class="p-3.5 mb-6 rounded-xl text-xs bg-amber-50 border border-amber-200 text-amber-800 flex items-center gap-2">
        <Info class="w-4 h-4 shrink-0 text-amber-600" />
        <span>{{ resetInfo }}</span>
      </div>

      <!-- Form Login -->
      <form @submit.prevent="handleLogin" class="space-y-4">
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

        <!-- Opsi Ingatkan Saya & Reset Password -->
        <div class="flex items-center justify-between text-xs pt-1">
          <label class="flex items-center gap-2 text-stone-600 cursor-pointer select-none">
            <input 
              v-model="rememberMe" 
              type="checkbox" 
              class="w-4 h-4 rounded border-stone-300 text-stone-900 focus:ring-stone-800 cursor-pointer accent-stone-900"
            />
            <span>Ingatkan saya</span>
          </label>

          <button 
            type="button" 
            @click="handleForgotPassword"
            class="text-stone-700 hover:text-stone-900 font-medium hover:underline cursor-pointer"
          >
            Lupa kata sandi?
          </button>
        </div>

        <!-- Tombol Login dengan State Loading & Spinner -->
        <button 
          :disabled="loading" 
          type="submit" 
          class="w-full mt-2 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-400 text-white font-medium py-3 rounded-xl text-sm transition duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed shadow-xs"
        >
          <Loader2 v-if="loading" class="animate-spin h-4 w-4 text-white" />
          <LogIn v-else class="w-4 h-4" />

          <span>{{ loading ? 'Memverifikasi...' : 'Masuk' }}</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { AlertCircle, Info, Mail, Lock, LogIn, Loader2 } from 'lucide-vue-next';

const router = useRouter();
const emit = defineEmits(['login-success']);
const form = ref({ email: '', password: '' });
const rememberMe = ref(false);
const loading = ref(false);
const alert = ref({ message: '' });
const resetInfo = ref('');

onMounted(() => {
  const savedEmail = localStorage.getItem('remembered_email');
  if (savedEmail) {
    form.value.email = savedEmail;
    rememberMe.value = true;
  }
});

const handleLogin = async () => {
  loading.value = true;
  alert.value = { message: '' };
  resetInfo.value = '';

  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', form.value);
    
    if (rememberMe.value) {
      localStorage.setItem('remembered_email', form.value.email);
    } else {
      localStorage.removeItem('remembered_email');
    }

    const userData = res.data.user;
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(userData));

    emit('login-success', userData);

    // Redirect berdasarkan role user
    if (userData && userData.role === 'ADMIN') {
      router.push('/admin');
    } else {
      router.push('/pengaduan');
    }
  } catch (err) {
    alert.value = { message: err.response?.data?.message || 'Koneksi Server Terputus. Website tidak dapat terhubung ke database server saat ini. Silakan coba memuat ulang halaman (refresh) dalam beberapa menit.' };
  } finally {
    loading.value = false;
  }
};

const handleForgotPassword = () => {
  resetInfo.value = 'Fitur reset password sedang dalam tahap pengembangan.';
  setTimeout(() => {
    resetInfo.value = '';
  }, 4000);
};
</script>