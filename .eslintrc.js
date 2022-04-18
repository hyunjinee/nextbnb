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
    quotes: ['error', 'double'], // 더블 쿼터 사용
    '@typescript-eslint/quotes': ['error', 'double'], // 더블 쿼터 사용
    //"no-unused-vars" : "off", // 사용 안 한 변수 경고 중복
  },
};
