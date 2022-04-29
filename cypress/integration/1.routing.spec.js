/// <reference types="Cypress"/>

describe('nextbnb의 모든 라우팅 테스트', () => {
  before(() => {
    cy.visit('/');
  });

  it('유저는 첫 방문시에 메인 페이지로 이동한다.', () => {
    cy.url().should('eq', `${Cypress.config().baseUrl}`);
  });

  // it('유저는 회원가입을 할 수 있다.', () => {
  //   cy.get('.header-sign-up-button').click();
  //   cy.get('[data-cy=signup-email]').click().type('hyunjin@kakao.com');
  //   cy.get('[data-cy=signup-lastname').click().type('LEE');
  //   cy.get('[data-cy=signup-firstname').click().type('HYUNJIN');
  //   cy.get('[data-cy=signup-password').click().type('1234567890');
  //   cy.get('[data-cy=signup-birthday-month').select('1월');
  //   cy.get('[data-cy=signup-birthday-day').select('10');
  //   cy.get('[data-cy=signup-birthday-year').select('1999');
  //   cy.get('[data-cy=signup-register').click();
  // });

  it('유저는 로그인을 할 수 있다.', () => {
    cy.get('.header-login-button').click();
    cy.get('[data-cy=login-email-input]').type('hyunjin@kakao.com');
    cy.get('[data-cy=login-password-input]').type('1234567890');
    cy.get('[data-cy=login-submit]').click();
  });

  it('유저 profile를 클릭해서 숙소등록 라우터로 이동할 수 있다. /room/register/building', () => {
    cy.get('.header-user-profile').click();
    cy.get('[data-cy=room-register]').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}room/register/building`);
  });

  it('/room/register/bedrooms 라우터로 이동할 수 있다.', () => {
    cy.visit('/room/register/bedrooms');
  });

  it('/room/register/bathroom 라우터로 이동할 수 있다.', () => {
    cy.visit('/room/register/bathroom');
  });

  it('/room/register/location 라우터로 이동할 수 있다.', () => {
    cy.visit('/room/register/location');
  });

  it('/room/register/geometry 라우터로 이동할 수 있다.', () => {
    cy.visit('/room/register/geometry');
  });

  it('/room/register/conveniences 라우터로 이동할 수 있다.', () => {
    cy.visit('/room/register/conveniences');
  });

  it('/room/register/photo 라우터로 이동할 수 있다.', () => {
    cy.visit('/room/register/photo');
  });

  it('/room/register/description 라우터로 이동할 수 있다.', () => {
    cy.visit('/room/register/description');
  });

  it('/room/register/title 라우터로 이동할 수 있다.', () => {
    cy.visit('/room/register/title');
  });

  it('/room/register/price 라우터로 이동할 수 있다.', () => {
    cy.visit('/room/register/price');
  });

  it('/room/register/date 라우터로 이동할 수 있다.', () => {
    cy.visit('/room/register/date');
  });

  it('/room/register/checklist 라우터로 이동할 수 있다.', () => {
    cy.visit('/room/register/checklist');
  });

  it('숙소 검색 페이지로 이동할 수 있다. /room?adultCount=1', () => {
    cy.visit('/room?adultCount=1');
  });

  it('숙소 상세페이지로 이동할 수 있다. /room/1', () => {
    cy.visit('/room/1');
  });
});
