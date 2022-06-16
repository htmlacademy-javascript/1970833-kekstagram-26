// Случайное целое число от min до max включительно
const getRandomInteger = (min, max) => {
  if (min < max && min >= 0 && max > 0) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  }
};

export {getRandomInteger};
