# nextbnb 공부기록

## Portal

리액트의 포탈(Portal)을 이용해서 모달을 만들 수 있다. 포탈은 부모 컴포넌트의 DOM계층 외부에 있는 DOM노드로 자식을 렌더링하는 방법이다. 쉽게 생각하면 엘리먼트를 다른 엘리먼트에서 렌더링하는 방법이다.

```js
ReactDom.createPortal(child, container);
```

첫번째 인자로 리액트 컴포넌트를 받고, 두번째 인자로 리액트 컴포넌트를 넣을 DOM을 받는다.

부모컴포넌트 업데이트 -> 자식 컴포넌트 업데이트

## dynamic

컴포넌트를 dynamic을 사용하여 서버사이드 렌더링을 하지 않고 불러올 수 있다. 컴포넌트안에서 window를 사용하게 될 예정이라면, dynamic을 사용해서 서버사이드렌더링을 방지할 수 있다. dynamic을 사용하지 않고 import 하여 컴포넌트를 사용한다면, window is undefined라는 에러를 보게 된다. 서버에서는 window와 document를 사용할 수 없다.
