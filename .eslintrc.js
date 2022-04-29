module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    quotes: ['error', 'single'], // 더블 쿼터 사용
    '@typescript-eslint/quotes': ['error', 'single'], // 더블 쿼터 사용
    '@typescript-eslint/no-unused-vars': 'off',
    'no-unused-vars': 'off', // 사용 안 한 변수 경고 중복
    'space-comment': 'off', // 주석 뒤에 쓰지 말라는 경고
    'no-console': 'off', // 콘솔 사용 가능
    'no-alert': 'error', // alert 사용 경고
    'react/no-array-index-key': 'off', // key 값으로 index 사용가능
    'comma-dangle': 'off', // 마지막 콤마 없애기
    'react/jsx-one-expression-per-line': 'off', // 한 줄에 하나의 여러개의 JSX사용가능
    'react/prop-types': 'off', // prop-types 사용하지 않는다.
    'arrow-body-style': 'off', // 화살표 함수안에 return을 사용할 수 있다.
    'operator-linebreak': 'off',
    'import/prefer-default-export': 'off',
    'import/newline-after-import': 'off',
    'implicit-arrow-linebreak': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'no-confusing-arrow': 'off',
    'react/require-default-props': 'off',

    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', 'jsx', '.tsx'] }, // jsx 사용 가능한 확장자 설정
    ],
    'react/function-component-definition': 'off',
    'no-use-before-define': 'off',
    'no-undef': 'off',
    'react/react-in-jsx-scope': 'off', // react를 사용하여도 React를 꼭 import 하지 않아도된다.
    'react/jsx-props-no-spreading': 'off', // props를 스프레드 할 수 있다.
    'object-curly-newline': 'off', // { 다음 줄바꿈을 강제로 사용하지 않는다.
    'import-order': 'off', // import 순서 지정 끔
    'no-trailing-spaces': 'off',
    'no-param-reassign': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'newline-per-chained-call': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      }, // import시 확장자명은 사용하지 않는다.
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
      },
    },
  },
};
