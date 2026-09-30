<template>
  <div class="max-w-4xl mx-auto px-4 py-12 text-stone-800">
    <!-- Header Section -->
    <div class="text-center max-w-2xl mx-auto space-y-3">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-[11px] font-medium text-stone-700">
        <ShieldCheck class="w-3.5 h-3.5 text-stone-800" />
        <span>Layanan Pengaduan Siber & Digital</span>
      </div>
      <h1 class="text-2xl md:text-3xl font-serif font-bold text-stone-900 tracking-tight">
        Mewujudkan Ruang Digital yang Aman & Transparan
      </h1>
      <p class="text-xs md:text-sm text-stone-500 font-light leading-relaxed">
        SiLapor adalah platform pengaduan independen yang dirancang untuk memudahkan masyarakat dalam melaporkan insiden kejahatan siber, kejahatan data, dan aktivitas ilegal digital secara aman dan terintegrasi.
      </p>
    </div>

    <!-- Stats / Highlights -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
      <div class="bg-white p-5 rounded-2xl border border-stone-200 text-center space-y-1 shadow-xs">
        <div class="w-10 h-10 rounded-xl bg-stone-100 text-stone-900 flex items-center justify-center mx-auto mb-3">
          <Lock class="w-5 h-5" />
        </div>
        <h3 class="text-sm font-semibold text-stone-900">Aman & Terenkripsi</h3>
        <p class="text-[11px] text-stone-500 font-light leading-relaxed">
          Setiap laporan yang masuk dilindungi dengan standar keamanan data tinggi untuk menjaga kerahasiaan identitas pelapor.
        </p>
      </div>

      <div class="bg-white p-5 rounded-2xl border border-stone-200 text-center space-y-1 shadow-xs">
        <div class="w-10 h-10 rounded-xl bg-stone-100 text-stone-900 flex items-center justify-center mx-auto mb-3">
          <Clock class="w-5 h-5" />
        </div>
        <h3 class="text-sm font-semibold text-stone-900">Pantau Real-Time</h3>
        <p class="text-[11px] text-stone-500 font-light leading-relaxed">
          Pelapor dapat melacak status penanganan laporan secara transparan dari tahap verifikasi hingga penanganan selesai.
        </p>
      </div>

      <div class="bg-white p-5 rounded-2xl border border-stone-200 text-center space-y-1 shadow-xs">
        <div class="w-10 h-10 rounded-xl bg-stone-100 text-stone-900 flex items-center justify-center mx-auto mb-3">
          <Users class="w-5 h-5" />
        </div>
        <h3 class="text-sm font-semibold text-stone-900">Tim Profesional</h3>
        <p class="text-[11px] text-stone-500 font-light leading-relaxed">
          Laporan diproses oleh tim penanggung jawab yang berkompeten di bidang penanganan insiden siber.
        </p>
      </div>
    </div>

    <!-- Misi Kami -->
    <div class="mt-12 bg-white rounded-2xl border border-stone-200 p-6 md:p-8 shadow-xs space-y-4">
      <h2 class="text-base font-serif font-semibold text-stone-900 border-b border-stone-100 pb-3">
        Misi Utama SiLapor
      </h2>
      <ul class="space-y-3 text-xs text-stone-600 font-light leading-relaxed">
        <li class="flex items-start gap-2.5">
          <CheckCircle2 class="w-4 h-4 text-stone-900 shrink-0 mt-0.5" />
          <span>Memberikan wadah pengaduan masyarakat yang ramah pengguna, transparan, dan dapat diakses kapan saja.</span>
        </li>
        <li class="flex items-start gap-2.5">
          <CheckCircle2 class="w-4 h-4 text-stone-900 shrink-0 mt-0.5" />
          <span>Mempercepat alur tindak lanjut kasus kejahatan siber seperti pencurian data, penipuan online, dan judi online.</span>
        </li>
        <li class="flex items-start gap-2.5">
          <CheckCircle2 class="w-4 h-4 text-stone-900 shrink-0 mt-0.5" />
          <span>Meningkatkan kesadaran masyarakat akan pentingnya keamanan informasi dan privasi data pribadi.</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ShieldCheck, Lock, Clock, Users, CheckCircle2 } from 'lucide-vue-next';
</script>