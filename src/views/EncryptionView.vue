<template>
  <div>
    <div class="flex flex-col items-center justify-center gap-4">
      <h1 class="font-bold text-2xl">Encryption</h1>

      <div class="flex flex-col items-center justify-center gap-4">
        <div class="flex items-center justify-center gap-4">
          <input
            id="textToEncrypt"
            type="text"
            v-model="textToEncrypt"
            class="border border-gray-300 p-2 rounded"
            placeholder="Enter text to encrypt"
          />

          <select
            id="encryptionAlgorithm"
            v-model="selectedAlgorithm"
            class="border border-gray-300 p-2 rounded"
          >
            <option class="text-gray-600" value="crypto-js/sha256">crypto-js/sha256</option>
            <option class="text-gray-600" value="crypto-js/aes">crypto-js/aes</option>
            <option class="text-gray-600" value="crypto-js/des">crypto-js/des</option>
          </select>

          <button
            id="encryptButton"
            @click="encryptText"
            class="bg-blue-500 text-white p-2 rounded cursor-pointer hover:bg-blue-600"
          >
            Encrypt
          </button>
        </div>

        <div>
          <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
        </div>
      </div>

      <div class="flex flex-col items-center justify-center mt-4 gap-2">
        <h2 class="font-bold text-xl">Encrypted Text</h2>

        <div v-if="encrypted" class="flex items-center justify-center gap-4">
          <p id="encryptedText">{{ encrypted }}</p>
          <div class="relative inline-block">
            <button
              id="copyButton"
              @click="copyToClipboard"
              :disabled="disable"
              :class="[
                'hover:rounded-full hover:bg-gray-400 p-2',
                disable ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
              ]"
            >
              <CopyIcon class="w-6" />
            </button>
            <span
              v-if="disable"
              class="absolute -top-3 -right-17.5 bg-gray-400 text-gray-700 px-2 py-1 rounded-lg shadow text-xs font-light z-10"
            >
              Copied
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SHA256, AES, DES } from 'crypto-js/'
import CopyIcon from '@/components/svg/CopyIcon.vue'

const textToEncrypt = ref('')
const encrypted = ref('')
const errorMessage = ref('')
const selectedAlgorithm = ref('crypto-js/sha256')

function encryptText() {
  if (textToEncrypt.value) {
    errorMessage.value = ''

    if (selectedAlgorithm.value === 'crypto-js/sha256') {
      encrypted.value = SHA256(textToEncrypt.value).toString()
    } else if (selectedAlgorithm.value === 'crypto-js/aes') {
      encrypted.value = AES.encrypt(textToEncrypt.value, 'secret key').toString()
    } else if (selectedAlgorithm.value === 'crypto-js/des') {
      encrypted.value = DES.encrypt(textToEncrypt.value, 'secret key').toString()
    }

    textToEncrypt.value = ''
  } else {
    errorMessage.value = 'Please enter text to encrypt.'
  }
}

let disable = ref(false)

function copyToClipboard() {
  if (encrypted.value && !disable.value) {
    navigator.clipboard.writeText(encrypted.value)
    disable.value = true
  }

  setTimeout(() => {
    disable.value = false
  }, 2000)
}
</script>
