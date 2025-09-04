<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <section
    class="flex gap-12 max-w-[700px] mx-auto my-12 p-10 bg-white/95 rounded-2xl shadow-[0_8px_32px_rgba(60,120,180,0.12)]"
  >
    <header class="text-center mb-8">
      <h1 class="mb-4 text-2xl font-bold tracking-wide text-slate-800">
        {{ t('home.title') }}
      </h1>
      <p class="mb-6 text-[1.1rem] text-slate-600">
        {{ t('home.description') }}
      </p>
      <img src="/src/assets/logo.svg" alt="Logo" class="w-20 my-4 mx-auto block" />
    </header>
    <main>
      <section>
        <h2 class="text-xl mb-2 text-emerald-600">
          {{ t('home.featuresTitle') }}
        </h2>
        <ul class="flex flex-col gap-4 mb-5 p-0">
          <li
            class="flex items-center bg-slate-50 rounded-xl shadow-sm p-3 text-[1.08rem] text-slate-700 transition hover:bg-emerald-50 hover:shadow-md"
          >
            <span class="flex items-center justify-center w-8 h-8 mr-3">
              <i class="pi pi-key text-emerald-600 text-2xl"></i>
            </span>
            <span class="flex-1">{{ t('home.features.0') }}</span>
          </li>
          <li
            class="flex items-center bg-slate-50 rounded-xl shadow-sm p-3 text-[1.08rem] text-slate-700 transition hover:bg-emerald-50 hover:shadow-md"
          >
            <span class="flex items-center justify-center w-8 h-8 mr-3">
              <i class="pi pi-lock text-emerald-600 text-2xl"></i>
            </span>
            <span class="flex-1">{{ t('home.features.1') }}</span>
          </li>
          <li
            class="flex items-center bg-slate-50 rounded-xl shadow-sm p-3 text-[1.08rem] text-slate-700 transition hover:bg-emerald-50 hover:shadow-md"
          >
            <span class="flex items-center justify-center w-8 h-8 mr-3">
              <i class="pi pi-user text-emerald-600 text-2xl"></i>
            </span>
            <span class="flex-1">{{ t('home.features.2') }}</span>
          </li>
        </ul>
      </section>
      <section>
        <h2 class="text-xl mb-2 text-emerald-600">
          {{ t('home.infoTitle') }}
        </h2>
        <p class="text-gray-700 text-[1.05rem] mt-1">
          {{ t('home.infoText') }}
        </p>
      </section>
    </main>
  </section>
</template>

<style scoped></style>
