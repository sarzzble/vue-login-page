/* global describe, it, cy, expect, beforeEach */

describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('http://192.168.1.50:5173/')
  })

  it('should show validation errors for empty fields', () => {
    cy.get('button[type="submit"]').click()
    cy.contains('Email is required').should('be.visible')
    cy.contains('Password must be at least 6 characters long').should('be.visible')
  })

  it('should show error for invalid email format', () => {
    cy.get('input#email').type('invalid-email')
    cy.get('input#password').type('password123')
    cy.get('button[type="submit"]').click()
    cy.contains('Invalid email format').should('be.visible')
  })

  it('should show error for short password', () => {
    cy.get('input#email').type('test@example.com')
    cy.get('input#password').type('123')
    cy.get('button[type="submit"]').click()
    cy.contains('Password must be at least 6 characters long').should('be.visible')
  })

  it('should show error for wrong credentials', () => {
    cy.get('input#email').type('wrong@example.com')
    cy.get('input#password').type('wrongpass')
    cy.get('button[type="submit"]').click()
    cy.contains('Invalid email or password').should('be.visible')
  })

  it('should login successfully with correct credentials', () => {
    cy.get('input#email').type('test@example.com')
    cy.get('input#password').type('password123')
    cy.get('button[type="submit"]').click()
    cy.url().should('eq', 'http://192.168.1.50:5173/')
    cy.window().then((win) => {
      expect(win.localStorage.getItem('auth')).to.eq('true')
    })
  })

  it('should logout and clear localStorage', () => {
    // Login first
    cy.get('input#email').type('test@example.com')
    cy.get('input#password').type('password123')
    cy.get('button[type="submit"]').click()
    cy.url().should('eq', 'http://192.168.1.50:5173/')

    // Logout (assume there is a logout button with id="logout-btn")
    cy.get('#logout-btn').click()
    cy.url().should('include', 'http://192.168.1.50:5173/login')
    cy.window().then((win) => {
      expect(win.localStorage.getItem('auth')).to.be.null
      expect(win.localStorage.getItem('user')).to.be.null
    })
  })
})
