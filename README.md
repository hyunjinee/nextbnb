# nextbnb

Next.js를 이용해서 airbnb 사이트를 클론한 프로젝트입니다.

https://user-images.githubusercontent.com/63354527/166108906-3bb96612-c305-4508-9ca9-9183beaf86fa.mov

- Cypress로 진행한 E2E 테스트 동영상입니다.
- **현재는 GeoCoding API, AWS S3 버킷을 사용할 수 없습니다. (일부 기능이 동작하지 않습니다.)**

### Description

- Next.js, TypeScript를 **학습**하기 위해 만든 프로젝트
- Cypress를 이용한 E2E 테스트 진행
- redux toolkit을 활용한 전역 상태 관리
- AWS S3 bucket, Google GeoCoding API 사용
- Vercel를 통한 서비스 배포

### 어려웠던 점과 느낀점

_CSS의 폭격_

- 최근에 CSS의 부족함을 느껴서 이런 CSS의 양이 많이 들어가는 마크업을 해보고 싶었는데 이 프로젝트를 통해 많이 연습할 수 있었다.
- CSS의 중요성에 대한생각: 화면에 내가 놓고 싶은 UI를 배치할 수 있어야한다. 1px이라도 달라졌을 때 사용자가 느끼는 경험이 달라질 수 있다.

_redux toolkit_

- 숙소 등록하는 과정이 11단계였다. 하나의 객체의 값이 32개였는데 이를 전역 상태로 관리하면서 숙소를 등록하는 과정이 재밌었다. 이렇게 많은 키가 많은 객체를 관리해보는 것은 처음이었다.
- RTK를 사용해보면서 기전 리덕스보다 설정하기도 쉽고, 코드의 양이 상당히 많이 줄어들었다고 느꼈다. Recoil이나 Zustand 같은 상태관리 라이브러리도 많이쓰이는데, RTK도 충분히 편하다고 생각한다.
- 스토어에서 관리하는 객체의 상태가 아무리 복잡해도 reducer함수에서 이름만 잘 맞춰주면서 함수를 작성하면 헷갈리지 않는다!!

_cypress_

- 브라우저의 권한요청과 file을 올리는 작업을 자동화 하는 과정에서 cypress 확장 라이브러리를 사용해서 구현할 수 있었다.
- cypress에서 api 요청을 테스트하는 방법을 배웠다. 하지만 아직 cypress를 능숙하게 활용하지는 못하지만 이번 프로젝트를 통해서 숙련도가 올랐다고 생각한다.
