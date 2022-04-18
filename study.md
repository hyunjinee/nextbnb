# nextbnb 공부기록

## Portal

리액트의 포탈(Portal)을 이용해서 모달을 만들 수 있다. 포탈은 부모 컴포넌트의 DOM계층 외부에 있는 DOM노드로 자식을 렌더링하는 방법이다. 쉽게 생각하면 엘리먼트를 다른 엘리먼트에서 렌더링하는 방법이다.

```js
ReactDom.createPortal(child, container);
```

첫번째 인자로 리액트 컴포넌트를 받고, 두번째 인자로 리액트 컴포넌트를 넣을 DOM을 받는다.