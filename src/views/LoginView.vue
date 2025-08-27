<template>
  <CardUI>
    <div class="flex flex-col gap-8 items-center justify-center">
      <h1 class="text-2xl border-b-2">Login</h1>
      <Form :validation-schema="schema" @submit="handleSubmit" class="flex flex-col">
        <div class="flex items-center gap-2 mb-4">
          <label for="email" class="w-1/3">Email:</label>
          <div class="flex flex-col">
            <Field
              name="email"
              type="email"
              id="email"
              v-model="email"
              :rules="schema"
              class="border border-gray-300 rounded w-2/3 px-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <ErrorMessage name="email" class="text-red-500 text-sm w-2/3" />
          </div>
        </div>

        <div class="flex items-center gap-2 mb-4">
          <label for="password" class="w-1/3">Password:</label>
          <div class="flex flex-col">
            <Field
              name="password"
              type="password"
              id="password"
              v-model="password"
              :rules="schema"
              class="border border-gray-300 rounded w-2/3 px-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <ErrorMessage name="password" class="text-red-500 text-sm w-2/3" />
          </div>
        </div>

        <div v-if="invalidLogin" class="bg-red-200 flex items-center justify-center p-2 rounded-lg">
          <span class="text-red-500">{{ invalidLogin }}</span>
        </div>

        <button
          type="submit"
          class="bg-blue-500 text-white rounded p-2 cursor-pointer hover:bg-blue-600 mb-2"
        >
          Login
        </button>
        <GoogleLogin :callback="callback" />
      </Form>
    </div>
  </CardUI>
</template>

<script setup>
import loginSchema from '@/lib/loginSchema'
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import { Field, Form, ErrorMessage } from 'vee-validate'
import { jwtDecode } from 'jwt-decode'
import CardUI from '@/components/ui/CardUI.vue'

const schema = toTypedSchema(loginSchema)

const store = useAuthStore()
const { login } = store

const email = ref('')
const password = ref('')

const userEmail = 'test@example.com'
const userPassword = 'password123'

let invalidLogin = ''

const callback = (response) => {
  console.log('Handle the response', response)

  if (response?.credential) {
    const decoded = jwtDecode(response.credential)

    login()
    localStorage.setItem('name', decoded.name)
    router.push({ path: '/app' })
    console.log(decoded)
  }
}

const handleSubmit = () => {
  if (email.value === userEmail && password.value === userPassword) {
    login()
    email.value = ''
    password.value = ''
    router.push({ path: '/app' })
  } else {
    invalidLogin = 'Invalid email or password'
  }
}
</script>

<style scoped></style>
