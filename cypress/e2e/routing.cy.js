const urlBuilder = (path = '') => `http://localhost:3000${path}`

describe('Routing', () => {
  it('Testing the routing', () => {
    cy.visit(urlBuilder())
    cy.contains('Home').should('be.visible')
    cy.contains('News letter').should('be.visible')
    cy.contains('Pro file').should('be.visible')

    cy.contains('News letter').click()
    cy.contains('Abonnez').should('be.visible')

    cy.contains('Pro file').click()
    cy.contains('Welcome').should('be.visible')
    cy.contains('Wilfried').should('be.visible')
  })
})
