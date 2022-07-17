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

// показ ошибки в случае проблем при взаимодействии с сервером
const ALERT_SHOW_TIME = 5000;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

// функция перемешивания массива
// источник - https://www.w3docs.com/snippets/javascript/how-to-randomize-shuffle-a-javascript-array.html

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// функция сортировки по убыванию
const compareImage = (imageA, imageB) => (
  imageB.comments.length - imageA.comments.length
);

export {getRandomInteger, stringLength, getRandomArrayElement, createIdGenerator, isEscapeKey, isEnterKey, showAlert, debounce, shuffleArray, compareImage};
