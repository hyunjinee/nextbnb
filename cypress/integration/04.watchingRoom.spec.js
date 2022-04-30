/// <reference types="Cypress"/>

describe('사용자의 숙소 예약 및 구경 테스트', () => {
  beforeEach(() => {
    cy.viewport(1280, 1100);
    cy.visit('/');
  });

  it('사용자는 숙소를 검색할 수 있다.', () => {
    cy.contains('검색').click();
    cy.wait(300);
    cy.get(':nth-child(1) > a > .room-card-photo-wrapper > img').click(); // temp
    cy.scrollTo(0, 700, { duration: 1000 });
    cy.wait(500);
    cy.scrollTo(0, 700, { duration: 1000 });
  });
});
