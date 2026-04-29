export default {
  '*.{ts,js}': ['eslint --fix', 'prettier --write', 'tsc --noEmit'],
  '*.{html,scss,css,json,md}': ['prettier --write'],
};
