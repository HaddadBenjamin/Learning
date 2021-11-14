/// <reference types="cypress" />

describe('LinkedIn Bot', () => {
  it('displays two todo items by default', () => {
    cy.viewport(1536, 864)
    cy.visit('https://www.linkedin.com/login/fr');

    cy.get('#username').type('<YOUR USERNAME>');
    cy.get('#password').type('<YOUR PASSWORD>');
    cy.get('button[type="submit"]').click();

    cy.get('[aria-label="Recherche"]', {timeout: 30000}).type('<PEOPLE JOB TITLE>{enter}');
    cy.contains('Voir tous les résultats de personnes', {timeout: 30000}).first().click();

    const loopIterations = 500;
    const loopArray = new Array(loopIterations).fill(0)
    cy.wrap(loopArray).each((num, i, array) =>
    {
      cy.wait(2000)
      cy.get('body').then($body =>
      {
        if ($body.find(':contains("Se connecter")').length)
        {
          cy.wait(2000)
          cy.contains('Se connecter', {timeout: 30000}).first().click();
          cy.wait(2000)
          cy.contains('Envoyer', {timeout: 30000}).first().click();
        }
        else
        {
          cy.scrollTo('bottom')
          cy.wait(2000)
          cy.get('.artdeco-button__text:contains("Suivant")', {timeout: 5000}).first().click();
        }
      })
    })
  })
})
