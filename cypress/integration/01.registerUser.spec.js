/* eslint-disable no-unused-expressions */
/// <reference types="Cypress"/>
describe('유저는 회원 가입을 할 수 있다.', () => {
  before(() => {
    cy.viewport(1280, 1100);
    cy.visit('/');
  });

  it('유저는 회원가입을 할 수 있다.', () => {
    cy.get('.header-sign-up-button').click();
    cy.get('[data-cy=signup-email]').click().type('hyunjin@kakao.com');
    cy.get('[data-cy=signup-lastname').click().type('LEE');
    cy.get('[data-cy=signup-firstname').click().type('HYUNJIN');
    cy.get('[data-cy=signup-password').click().type('1234567890');
    cy.get('[data-cy=signup-birthday-month').select('1월');
    cy.get('[data-cy=signup-birthday-day').select('10');
    cy.get('[data-cy=signup-birthday-year').select('1999');
    cy.get('[data-cy=signup-register').click();
  });

  it('회원 가입이 된 유저는 자동으로 로그인된다.', () => {
    cy.get('.header-user-profile-image');
  });
});
