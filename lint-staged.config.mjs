export default {
  '*.{js,jsx,ts,tsx}': ['prettier --write', 'eslint --fix'],
  '*.{css,scss}': ['prettier --write'],
  '*.{css,scss,md,json,html}': 'prettier --write',
};
