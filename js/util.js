// cлучайное целое число от min до max включительно
const getRandomInteger = (min, max) => {
  if (min < max && min >= 0 && max > 0) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  }
};

// проверка максимальной длины строки
const maxLengthComment = 140;

const stringLength = (string) => {
  if (typeof string === 'string') {
    return string.length <= maxLengthComment;
  }
};

// cлучайный элемент массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// генератор id комментариев
const createIdGenerator = (min, max) => {
  const commentsId = [];
  return () => {
    let commentId;
    do {
      commentId = getRandomInteger(min, max);
    }
    while (commentsId.includes(commentId));
    commentsId.push(commentId);
    return commentId;
  };
};

// проверка нажатия клавиши Escape
const isEscapeKey = (evt) => evt.key === 'Escape';

// проверка нажатия клавиши Enter
const isEnterKey = (evt) => evt.key === 'Enter';

export {getRandomInteger, stringLength, getRandomArrayElement, createIdGenerator, isEscapeKey, isEnterKey};
