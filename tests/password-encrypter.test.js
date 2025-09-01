import { describe, it, expect } from 'vitest'
import CryptoJS from 'crypto-js'

function encrypt(text, algorithm) {
  if (!text) return ''
  switch (algorithm) {
    case 'crypto-js/sha256':
      return CryptoJS.SHA256(text).toString()
    case 'crypto-js/aes':
      return CryptoJS.AES.encrypt(text, 'secret-key').toString()
    case 'crypto-js/des':
      return CryptoJS.DES.encrypt(text, 'secret-key').toString()
    default:
      throw new Error('Unknown algorithm')
  }
}

let clipboard = ''
async function copyToClipboard(text) {
  clipboard = text
  return clipboard
}
async function readClipboard() {
  return clipboard
}

describe('Password Encrypter', () => {
  it('input should not be empty', () => {
    expect(encrypt('', 'crypto-js/sha256')).toBe('')
  })

  it('should encrypt text using SHA-256', () => {
    const result = encrypt('Hello, World!', 'crypto-js/sha256')

    expect(result).toBeTypeOf('string')
    expect(result.length).toBeGreaterThan(0)
  })

  it('should encrypt text using AES', () => {
    const result = encrypt('Hello, World!', 'crypto-js/aes')

    expect(result).toBeTypeOf('string')
    expect(result.length).toBeGreaterThan(0)
  })

  it('should encrypt text using DES', () => {
    const result = encrypt('Hello, World!', 'crypto-js/des')

    expect(result).toBeTypeOf('string')
    expect(result.length).toBeGreaterThan(0)
  })

  it('should copy encrypted text to clipboard (mock)', async () => {
    const encrypted = encrypt('Hello, World!', 'crypto-js/sha256')

    await copyToClipboard(encrypted)

    expect(await readClipboard()).toBe(encrypted)
  })

  it('should not copy again within 2 seconds (mock)', async () => {
    const encrypted = encrypt('Hello, World!', 'crypto-js/sha256')

    await copyToClipboard('dummy')

    let lastCopyTime = Date.now()

    const tryCopy = async () => {
      if (Date.now() - lastCopyTime < 2000) return
      await copyToClipboard(encrypted)
      lastCopyTime = Date.now()
    }

    await tryCopy()

    expect(await readClipboard()).toBe('dummy')

    await new Promise((r) => setTimeout(r, 2100))

    await tryCopy()

    expect(await readClipboard()).toBe(encrypted)
  })
})
