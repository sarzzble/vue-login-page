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
        <p class="">{{ encrypted }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SHA256, AES, DES } from 'crypto-js/'

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
</script>
