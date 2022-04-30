/* eslint-disable no-unused-expressions */
/// <reference types="Cypress"/>
import { isPermissionAllowed } from 'cypress-browser-permissions';

context('유저는 숙소를 등록할 수 있다.', () => {
  beforeEach(() => {
    cy.viewport(1280, 1100);
  });

  before(() => {
    cy.visit(`${Cypress.config().baseUrl}room/register/building`);
  });

  it('등록할 숙소 종류를 선택하고 다음 페이지로 넘어갈 수 있다.', () => {
    cy.get('[data-cy=building-range-selector]').select('아파트');
    cy.get('[data-cy=building-type-selector]').select('별채');
    cy.wait(500);
    cy.contains('다인실').click();
    cy.wait(300);
    cy.contains('예. 게스트용으로 따로 마련된 숙소입니다.').click();
    cy.wait(300);
    cy.contains('계속').click();
  });

  it('숙소에 숙박할 인원을 선택하고 다음 페이지로 넘어갈 수 있다.', () => {
    cy.get('.counter-contents>button').eq(1).click();
    cy.wait(300);
    cy.get('.counter-contents>button').eq(1).click();
    cy.wait(300);
    cy.get('.counter-contents>button').eq(3).click();
    cy.wait(300);
    cy.get('.counter-contents>button').eq(3).click();
    cy.wait(300);
    cy.contains('침대 수정하기').click();
    cy.wait(300);

    cy.get('[data-cy=bed-type-selector]').select('더블');
    cy.wait(300);

    cy.get('.counter-contents>button').eq(7).click();
    cy.wait(300);

    cy.contains('계속').click();
  });

  it('숙소에 욕실의 개수를 선택하고 다음 페이지로 넘어갈 수 있다.', () => {
    cy.get('.counter-contents>button').eq(1).click();
    cy.contains('예').click();
    cy.contains('계속').click();
  });

  it('숙소의 위치를 설정하고 다음 페이지로 넘어갈 수 있다.', () => {
    cy.contains('현재 위치 사용').click();
    expect(isPermissionAllowed('geolocation')).to.be.true;

    cy.intercept('GET', '/api/maps/location?*').as('getLocation');
    cy.wait('@getLocation', { requestTimeout: 10000 })
      .its('response.statusCode')
      .should('be.oneOf', [200, 304]);
    cy.contains('계속').click();
  });

  it('지도 마커를 확인하고 다음 페이지로 넘어갈 수 있다.', () => {
    cy.wait(1000);
    cy.contains('계속').click();
  });

  it('편의 시설을 선택할 수 있고 다음 페이지로 이동할 수 있다.', () => {
    cy.contains('무선 인터넷').click();
    cy.contains('TV').click();
    cy.contains('계속').click();
  });

  it('공간을 선택하고 다음페이지로 이동할 수 있다.', () => {
    cy.contains('주방').click();
    cy.contains('헬스장').click();
    cy.contains('계속').click();
  });

  it('숙소 사진을 등록하고 다음 페이지로 이동할 수 있다.', () => {
    cy.get('input[type=file]').attachFile('home_card_image_1.jpg');
    cy.wait(1000);
    cy.contains('계속').click();
  });

  it('숙소에 대한 설명을 등록할 수 있고 다음페이지로 넘어갈 수 있다.', () => {
    cy.get('textarea').type('highly recommended!');
    cy.wait(500);
    cy.contains('계속').click();
  });

  it('숙소의 제목을 입력하고 다음 페이지로 넘어갈 수 있다.', () => {
    cy.get('input').type('super house');
    cy.wait(500);
    cy.contains('계속').click();
  });

  it('숙소의 기본 요금을 설정하고 다음 페이지로 넘어갈 수 있다.', () => {
    cy.wait(500);
    cy.get('input').type('100000');
    cy.contains('계속').click();
  });

  it('숙소의 예약 시작일과 예약 마감일을 설정하고 다음페이지로 넘어갈 수 있다.', () => {
    cy.get('[data-cy=register-room-start-date]').click();
    cy.get(
      ':nth-child(3) > .react-datepicker__month > :nth-child(5) > .react-datepicker__day--030'
    ).click(); // temp
    cy.get('[data-cy=register-room-end-date]').click();

    cy.get(':nth-child(2) > .react-datepicker__day--012').click(); // temp
    cy.contains('계속').click();
  });

  it('모두 체크 되어있는지 확인하고 등록하기 버튼을 눌러서 숙소 등록을 진행할 수 있다. -> 홈화면으로 이동', () => {
    cy.wait(500);
    cy.contains('등록하기').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}`);
  });
});
