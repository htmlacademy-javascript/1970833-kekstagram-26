import {renderFullPicture} from './full-picture.js';

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
  pictureList.append(pictureFragment);
};

export {renderPicture};
