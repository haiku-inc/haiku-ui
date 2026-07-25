const random25to60 = () => {
  return Math.floor(Math.random() * (60 - 25 + 1)) + 25;
};
const random5to25 = () => {
  return Math.floor(Math.random() * (30 - 10 + 1)) + 10;
};

export { random25to60, random5to25 };
