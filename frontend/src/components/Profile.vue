<template>
  <div class="max-w-3xl mx-auto px-4 py-8">
    <div class="bg-white rounded-2xl border border-stone-200 shadow-xs p-6 md:p-8">
      
      <!-- Header Profil -->
      <div class="flex items-center gap-4 pb-6 border-b border-stone-100">
        <div class="w-16 h-16 rounded-2xl bg-stone-900 text-white flex items-center justify-center font-serif text-2xl font-bold">
          {{ user.nama ? user.nama.charAt(0).toUpperCase() : 'U' }}
        </div>
        <div>
          <h2 class="text-xl font-serif font-semibold text-stone-900">{{ user.nama }}</h2>
          <p class="text-xs text-stone-500 font-light">{{ user.email }}</p>
          <span class="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-stone-100 text-stone-700 uppercase tracking-wider">
            {{ user.role || 'Masyarakat' }}
          </span>
        </div>
      </div>

      <!-- Form Edit Profil -->
      <form @submit.prevent="handleUpdateProfile" class="mt-6 space-y-4">
        <h3 class="text-sm font-semibold text-stone-900 mb-2">Edit Informasi Akun</h3>

        <!-- Alert Notifikasi -->
        <!-- Toast Notification Floating di Pojok Kanan Bawah -->
        <div class="fixed bottom-5 right-5 z-50 space-y-2 max-w-xs w-full pointer-events-none">
          <!-- Pesan Sukses -->
          <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="transform translate-y-2 opacity-0 scale-95"
            enter-to-class="transform translate-y-0 opacity-100 scale-100"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="transform translate-y-0 opacity-100 scale-100"
            leave-to-class="transform translate-y-2 opacity-0 scale-95"
          >
            <div 
              v-if="successMessage" 
              class="pointer-events-auto flex items-center gap-2.5 p-3.5 bg-white border border-stone-200 shadow-xl rounded-2xl text-xs text-stone-800"
            >
              <CheckCircle2 class="w-4 h-4 text-emerald-500 shrink-0" />
              <span class="font-medium">{{ successMessage }}</span>
            </div>
          </Transition>

          <!-- Pesan Error -->
          <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="transform translate-y-2 opacity-0 scale-95"
            enter-to-class="transform translate-y-0 opacity-100 scale-100"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="transform translate-y-0 opacity-100 scale-100"
            leave-to-class="transform translate-y-2 opacity-0 scale-95"
          >
            <div 
              v-if="errorMessage" 
              class="pointer-events-auto flex items-center gap-2.5 p-3.5 bg-white border border-red-200 shadow-xl rounded-2xl text-xs text-stone-800"
            >
              <AlertCircle class="w-4 h-4 text-red-500 shrink-0" />
              <span class="font-medium text-red-600">{{ errorMessage }}</span>
            </div>
          </Transition>
        </div>

        <div>
          <label class="block text-xs font-medium text-stone-700 mb-1">Nama Lengkap</label>
          <input 
            v-model="form.nama" 
            type="text" 
            required 
            class="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-stone-900 transition"
          />
        </div>

        <div>
          <label class="block text-xs font-medium text-stone-700 mb-1">Alamat Email</label>
          <input 
            v-model="form.email" 
            type="email" 
            required 
            class="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-stone-900 transition"
          />
        </div>

        <div class="pt-2 flex items-center justify-between">
          <button 
            type="submit" 
            :disabled="isLoading"
            class="px-5 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-medium hover:bg-stone-800 transition disabled:opacity-50 cursor-pointer"
          >
            {{ isLoading ? 'Menyimpan...' : 'Simpan' }}
          </button>

          <!-- Tombol Trigger Logout -->
          <button 
            type="button" 
            @click="$emit('open-logout-modal')" 
            title="Keluar dari akun"
            class="flex items-center gap-1 px-4 py-2.5 bg-red-50 text-red-700 rounded-xl text-xs font-medium hover:bg-red-100 transition"
          >
            <LogOut class="w-4 h-4" />
            <span>Keluar</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { LogOut, CheckCircle2, AlertCircle } from 'lucide-vue-next';

const emit = defineEmits(['user-updated', 'open-logout-modal']);

const user = ref({});
const form = ref({ nama: '', email: '' });
const isLoading = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

onMounted(() => {
  const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
  user.value = savedUser;
  form.value = { 
    nama: savedUser.nama || '', 
    email: savedUser.email || '' 
  };
});

const handleUpdateProfile = async () => {
  isLoading.value = true;
  successMessage.value = '';
  errorMessage.value = '';

  try {
    const token = localStorage.getItem('token');
    
    // 1. Kirim request ke backend API untuk update di database MySQL
    const res = await axios.put(
      'http://localhost:5000/api/users/profile', // Sesuaikan URL endpoint backend Anda
      {
        nama: form.value.nama,
        email: form.value.email
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    // 2. Jika sukses di MySQL, perbarui data lokal di localStorage
    const updatedUser = { ...user.value, nama: form.value.nama, email: form.value.email };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    user.value = updatedUser;
    successMessage.value = res.data.message || 'Profil berhasil diperbarui.';
    setTimeout(() => {
      successMessage.value = '';
    }, 3000);
    
    // 3. Trigger update UI di App.vue / Header
    emit('user-updated');
  } catch (err) {
    console.error('Gagal update profile:', err);
    errorMessage.value = err.response?.data?.message || 'Gagal memperbarui profil.';
  } finally {
    isLoading.value = false;
  }
};
</script>