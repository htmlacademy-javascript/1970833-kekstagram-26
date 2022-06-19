import {generateObjects} from './data.js';

const pictures = document.querySelector('.pictures');
const pictureElementTemplate = document.querySelector('#picture').content.querySelector('.picture');

const userPhotos = generateObjects();

const pictureFragment = document.createDocumentFragment();

userPhotos.forEach(({url, comments, likes}) => {
  const picture = pictureElementTemplate.cloneNode(true);
  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__comments').textContent = comments;
  picture.querySelector('.picture__likes').textContent = likes;
  pictureFragment.append(picture);
});

pictures.append(pictureFragment);
