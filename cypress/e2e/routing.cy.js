const urlBuilder = (path = '') => `http://localhost:3000${path}`

describe('Routing', () => {
  it('Testing the routing', () => {
    cy.visit(urlBuilder())
    cy.contains('Home').should('be.visible')
    cy.contains('News Letter').should('be.visible')
    cy.contains('Profile').should('be.visible')

    cy.contains('News Letter').click()
    cy.contains('Abonnez').should('be.visible')

    cy.contains('Profile').click()
    cy.contains('Welcome').should('be.visible')
    cy.contains('Wilfried').should('be.visible')
  })
})
