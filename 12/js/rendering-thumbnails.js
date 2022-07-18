import {renderFullPicture} from './image-render-full-size.js';

const renderPicture = (pictures) => {
  const pictureList = document.querySelector('.pictures');
  const pictureElementTemplate = document.querySelector('#picture').content.querySelector('.picture');

  const pictureFragment = document.createDocumentFragment();

  pictures.forEach((fullPhoto) => {
    const pictureClone = pictureElementTemplate.cloneNode(true);
    const {url, likes, comments} = fullPhoto;
    pictureClone.addEventListener('click', () => renderFullPicture(fullPhoto));
    pictureClone.querySelector('.picture__img').src = url;
    pictureClone.querySelector('.picture__likes').textContent = likes;
    pictureClone.querySelector('.picture__comments').textContent = comments.length;
    pictureFragment.append(pictureClone);
  });

  // убираются раннее отрисованные фотографии
  pictureList.querySelectorAll('.picture').forEach((picture) => picture.remove());

  pictureList.append(pictureFragment);
};

export {renderPicture};
