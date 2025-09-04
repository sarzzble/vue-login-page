/* global describe, it, cy, beforeEach */

describe('Password Encrypter', () => {
  beforeEach(() => {
    cy.visit('http://192.168.1.50:5173')
    cy.get('#email').should('not.be.disabled').type('test@example.com')
    cy.get('#password').should('not.be.disabled').type('password123')
    cy.get('#loginButton').click()
    cy.visit('http://192.168.1.50:5173/encryption')
    cy.get('#textToEncrypt').clear()
    cy.get('#encryptionAlgorithm').select('crypto-js/sha256')
  })

  it('input should not be empty', () => {
    cy.get('#textToEncrypt').should('exist')
    cy.get('#textToEncrypt').should('have.value', '')
  })

  it('should encrypt text using SHA-256', () => {
    cy.get('#textToEncrypt').should('not.be.disabled').type('Hello, World!')
    cy.get('#encryptionAlgorithm').select('crypto-js/sha256')
    cy.get('#encryptButton').click()
    cy.get('#encryptedText', { timeout: 10000 }).should('exist')
  })

  it('should encrypt text using AES', () => {
    cy.get('#textToEncrypt').should('not.be.disabled').type('Hello, World!')
    cy.get('#encryptionAlgorithm').select('crypto-js/aes')
    cy.get('#encryptButton').click()
    cy.get('#encryptedText', { timeout: 10000 }).should('exist')
  })

  it('should encrypt text using DES', () => {
    cy.get('#textToEncrypt').should('not.be.disabled').type('Hello, World!')
    cy.get('#encryptionAlgorithm').select('crypto-js/des')
    cy.get('#encryptButton').click()
    cy.get('#encryptedText', { timeout: 10000 }).should('exist')
  })
})
