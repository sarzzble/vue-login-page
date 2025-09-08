<template>
  <div>
    <div
      class="max-w-[900px] mx-auto my-10 p-8 rounded-2xl border shadow-[0_8px_32px_rgba(60,120,180,0.12)] flex flex-col gap-6"
      :style="{
        background: 'color-mix(in srgb, var(--color-background) 96%, transparent)',
        borderColor: 'var(--color-border)',
        color: 'var(--color-text)',
      }"
    >
      <h1 class="font-bold text-3xl text-center" :style="{ color: 'var(--color-heading)' }">
        {{ t('encryption.title') }}
      </h1>

      <div class="flex flex-col gap-6">
        <div
          class="flex items-center justify-center gap-2 bg-[color-mix(in_srgb,var(--color-background-soft)_85%,transparent)] border rounded-full px-2 py-1 mx-auto"
          :style="{ borderColor: 'var(--color-border)' }"
        >
          <button
            id="modeEncrypt"
            @click="mode = 'encrypt'"
            :class="[
              'px-4 py-2 rounded-full text-sm transition',
              mode === 'encrypt'
                ? 'bg-blue-500 text-white shadow'
                : 'text-[var(--color-text)] hover:bg-[color-mix(in_srgb,var(--color-background-mute)_60%,transparent)]',
            ]"
          >
            {{ t('encryption.modeEncrypt') }}
          </button>
          <button
            id="modeDecrypt"
            @click="mode = 'decrypt'"
            :class="[
              'px-4 py-2 rounded-full text-sm transition',
              mode === 'decrypt'
                ? 'bg-blue-500 text-white shadow'
                : 'text-[var(--color-text)] hover:bg-[color-mix(in_srgb,var(--color-background-mute)_60%,transparent)]',
            ]"
          >
            {{ t('encryption.modeDecrypt') }}
          </button>
        </div>

        <!-- Encrypt form -->
        <div
          v-if="mode === 'encrypt'"
          class="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-center"
        >
          <input
            id="textInput"
            type="text"
            v-model="inputTextEncrypt"
            class="border rounded p-3 w-full transition"
            :style="{
              borderColor: 'var(--color-border)',
              background: 'var(--color-background-soft)',
              color: 'var(--color-text)',
            }"
            :placeholder="t('encryption.placeholder')"
          />

          <select
            id="encryptionAlgorithm"
            v-model="selectedAlgorithm"
            class="border rounded p-3 min-w-[220px] transition"
            :style="{
              borderColor: 'var(--color-border)',
              background: 'var(--color-background-soft)',
              color: 'var(--color-text)',
            }"
          >
            <option class="text-gray-600" value="crypto-js/sha256">crypto-js/sha256</option>
            <option class="text-gray-600" value="crypto-js/aes">crypto-js/aes</option>
            <option class="text-gray-600" value="crypto-js/des">crypto-js/des</option>
          </select>
        </div>

        <!-- Decrypt form -->
        <div v-else class="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-center">
          <input
            id="textInput"
            type="text"
            v-model="inputTextDecrypt"
            class="border rounded p-3 w-full transition"
            :style="{
              borderColor: 'var(--color-border)',
              background: 'var(--color-background-soft)',
              color: 'var(--color-text)',
            }"
            :placeholder="t('encryption.decryptResultTitle')"
          />

          <select
            id="encryptionAlgorithm"
            v-model="selectedAlgorithm"
            class="border rounded p-3 min-w-[220px] transition"
            :style="{
              borderColor: 'var(--color-border)',
              background: 'var(--color-background-soft)',
              color: 'var(--color-text)',
            }"
          >
            <option class="text-gray-600" value="crypto-js/sha256">crypto-js/sha256</option>
            <option class="text-gray-600" value="crypto-js/aes">crypto-js/aes</option>
            <option class="text-gray-600" value="crypto-js/des">crypto-js/des</option>
          </select>
        </div>

        <div class="grid grid-cols-1 gap-4" v-if="selectedAlgorithm !== 'crypto-js/sha256'">
          <div class="flex items-center gap-3">
            <input
              id="secretKey"
              type="text"
              v-model="secretKey"
              class="border rounded p-3 w-full transition"
              :style="{
                borderColor: 'var(--color-border)',
                background: 'var(--color-background-soft)',
                color: 'var(--color-text)',
              }"
              :placeholder="t('encryption.keyPlaceholder')"
            />
          </div>
        </div>

        <div v-if="mode === 'decrypt' && selectedAlgorithm === 'crypto-js/sha256'">
          <p class="text-yellow-600 text-sm">{{ t('encryption.sha256Warning') }}</p>
        </div>

        <div class="flex items-center justify-center gap-4 mt-2">
          <button
            id="actionButton"
            @click="mode === 'encrypt' ? encryptText() : decryptText()"
            class="bg-blue-600 text-white px-5 py-2.5 rounded-lg cursor-pointer hover:bg-blue-700 shadow-sm"
          >
            {{ mode === 'encrypt' ? t('encryption.encrypt') : t('encryption.decrypt') }}
          </button>
        </div>

        <div v-if="errorMessage" class="mx-auto">
          <div class="text-sm bg-red-100 border border-red-300 text-red-700 px-3 py-2 rounded">
            {{ t('encryption.error') }}
          </div>
        </div>
      </div>

      <div v-if="resultText" class="mt-8">
        <h2 class="font-bold text-xl mb-2 text-center">
          {{
            mode === 'encrypt' ? t('encryption.resultTitle') : t('encryption.decryptResultTitle')
          }}
        </h2>

        <div
          class="relative w-full p-4 rounded-xl border font-mono text-[0.95rem]"
          :style="{
            background: 'var(--color-background-soft)',
            color: 'var(--color-text)',
            borderColor: 'var(--color-border)',
          }"
        >
          <div id="resultText" class="pr-12 break-words select-text">
            {{ resultText }}
          </div>

          <button
            id="copyButton"
            @click="copyToClipboard"
            :disabled="disable"
            :class="[
              'absolute top-2 right-2 p-2 rounded-md border transition',
              'bg-[var(--color-background-mute)] border-[var(--color-border)] hover:bg-[var(--color-background-soft)]',
              disable ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
            ]"
          >
            <CopyIcon class="w-5 h-5" :class="['text-[var(--color-text)]']" />
          </button>

          <span
            v-if="disable"
            class="absolute -top-3 right-2 px-2 py-1 rounded-lg shadow text-xs font-light z-10 border"
            :style="{
              background: 'color-mix(in srgb, var(--color-background-mute) 70%, transparent)',
              color: 'var(--color-text)',
              borderColor: 'var(--color-border)',
            }"
          >
            {{ t('encryption.copied') }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SHA256, AES, DES, enc } from 'crypto-js/'
import CopyIcon from '@/components/svg/CopyIcon.vue'
import { useI18n } from 'vue-i18n'

const mode = ref('encrypt')
const inputTextEncrypt = ref('')
const inputTextDecrypt = ref('')
const resultText = ref('')
const errorMessage = ref('')
const selectedAlgorithm = ref('crypto-js/sha256')
const secretKey = ref('')

const { t } = useI18n()

function encryptText() {
  if (inputTextEncrypt.value) {
    errorMessage.value = ''

    if (selectedAlgorithm.value === 'crypto-js/sha256') {
      resultText.value = SHA256(inputTextEncrypt.value).toString()
    } else if (selectedAlgorithm.value === 'crypto-js/aes') {
      const key = secretKey.value || 'secret key'
      resultText.value = AES.encrypt(inputTextEncrypt.value, key).toString()
    } else if (selectedAlgorithm.value === 'crypto-js/des') {
      const key = secretKey.value || 'secret key'
      resultText.value = DES.encrypt(inputTextEncrypt.value, key).toString()
    }

    inputTextEncrypt.value = ''
  } else {
    errorMessage.value = 'error'
  }
}

let disable = ref(false)

function copyToClipboard() {
  if (resultText.value && !disable.value) {
    navigator.clipboard.writeText(resultText.value)
    disable.value = true
  }

  setTimeout(() => {
    disable.value = false
  }, 2000)
}

function decryptText() {
  if (!inputTextDecrypt.value) {
    errorMessage.value = 'error'
    return
  }

  errorMessage.value = ''

  if (selectedAlgorithm.value === 'crypto-js/sha256') {
    resultText.value = ''
    return
  }

  const key = secretKey.value || 'secret key'

  try {
    if (selectedAlgorithm.value === 'crypto-js/aes') {
      const bytes = AES.decrypt(inputTextDecrypt.value, key)
      resultText.value = bytes.toString(enc.Utf8)
    } else if (selectedAlgorithm.value === 'crypto-js/des') {
      const bytes = DES.decrypt(inputTextDecrypt.value, key)
      resultText.value = bytes.toString(enc.Utf8)
    }

    if (!resultText.value) {
      errorMessage.value = 'error'
    }
  } catch (e) {
    console.error(e)
    errorMessage.value = 'error'
    resultText.value = ''
  }
}
</script>
