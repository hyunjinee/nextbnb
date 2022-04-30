/// <reference types="Cypress"/>

describe('사용자는 로그인을 할 수 있다.', () => {
  before(() => {
    cy.viewport(1280, 1100);
    cy.visit('/');
  });

  it('로그인되어 있다면 로그아웃 한다.', () => {
    cy.reload();
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('사용자는 로그인을 할 수 있다.', () => {
    cy.contains('로그인').click();
    cy.get('[data-cy=login-email-input]').type('hyunjin@kakao.com');
    cy.get('[data-cy=login-password-input]').type('1234567890');
    cy.get('[data-cy=login-submit]').click();
  });
});
