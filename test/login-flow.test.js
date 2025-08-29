import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import loginSchema from '@/lib/loginSchema'
import { vi } from 'vitest'

let lastRoute = null
// vue-router'u mockla
vi.mock('@/router', () => ({
  default: {
    push: (route) => {
      lastRoute = route
    },
  },
}))

// Helper for schema validation
function validateLogin(data) {
  try {
    loginSchema.parse(data)
    return true
  } catch {
    return false
  }
}

// Mock localStorage for Vitest (Node.js)
if (typeof globalThis !== 'undefined' && !globalThis.localStorage) {
  let store = {}
  globalThis.localStorage = {
    getItem(key) {
      return store[key] || null
    },
    setItem(key, value) {
      store[key] = value.toString()
    },
    removeItem(key) {
      delete store[key]
    },
    clear() {
      store = {}
    },
  }
}

describe('Login Flow', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  it('should validate correct login data', () => {
    const valid = validateLogin({
      email: 'test@example.com',
      password: 'password123',
    })
    expect(valid).toBe(true)
  })

  it('should not validate incorrect email', () => {
    const valid = validateLogin({
      email: 'invalid-email',
      password: 'password123',
    })
    expect(valid).toBe(false)
  })

  it('should not validate short password', () => {
    const valid = validateLogin({
      email: 'test@example.com',
      password: '123',
    })
    expect(valid).toBe(false)
  })

  it('should login and set localStorage', () => {
    const store = useAuthStore()
    store.login({ email: 'test@example.com', password: 'password123' })
    expect(store.isAuthenticated).toBe(true)
    expect(localStorage.getItem('auth')).toBe('true')
    expect(JSON.parse(localStorage.getItem('user'))).toEqual({
      email: 'test@example.com',
      password: 'password123',
    })
  })

  it('should logout and clear localStorage, and navigate to login', () => {
    const store = useAuthStore()
    store.login({ email: 'test@example.com', password: 'password123' })
    store.logout()
    expect(store.isAuthenticated).toBe(false)
    expect(localStorage.getItem('auth')).toBe(null)
    expect(localStorage.getItem('user')).toBe(null)
    // login sayfasına yönlendirme kontrolü
    expect(lastRoute).toEqual({ name: 'login' })
  })
})
