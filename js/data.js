import {getRandomInteger, getRandomArrayElement, createIdGenerator} from './util.js';

const DESCRIPTION = [
  'описание фото раз',
  'описание фото два',
  'описание фото три',
  'описание фото четыре',
  'описание фото пять',
  'описание фото шесть',
  'описание фото семь',
  'описание фото восемь',
  'описание фото девять',
  'описание фото десять',
];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAME = [
  'Петя',
  'Маша',
  'Катя',
  'Сергей',
  'Митя',
  'София',
];

const NUMBER_GENERATION_OBJECTS = 25;

const AVATAR = {
  min: 1,
  max: 6,
};

const LIKE = {
  min: 15,
  max: 200,
};

const COMMENT = {
  min: 3,
  max: 25,
};

const getIdComment = createIdGenerator(1, 1000);
const createComment = () => ({
  id: getIdComment(),
  avatar: `img/avatar-${getRandomInteger(AVATAR.min, AVATAR.max)}.svg`,
  message: getRandomArrayElement(MESSAGE),
  name: getRandomArrayElement(NAME),
});

const createPost = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomInteger(LIKE.min, LIKE.max),
  comments: Array.from({length: getRandomInteger(COMMENT.min, COMMENT.max)}, createComment),
});

const generateObjects = () => Array.from({length: NUMBER_GENERATION_OBJECTS}, (_, idNumber) => createPost(idNumber + 1));

export {generateObjects};
