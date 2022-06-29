import {isEscapeKey} from './util.js';

const body = document.querySelector('body');
const pictureContainer = document.querySelector('.big-picture');

const pictureCloseButton = pictureContainer.querySelector('#picture-cancel');
const pictureImg = pictureContainer.querySelector('.big-picture__img img');
const pictureDescription = pictureContainer.querySelector('.social__caption');
const pictureLikesCount = pictureContainer.querySelector('.likes-count');

const commentCount = pictureContainer.querySelector('.social__comment-count');
const commentContainer = pictureContainer.querySelector('.social__comments');
const commentItem = pictureContainer.querySelector('.social__comment');
const commentLoader = pictureContainer.querySelector('.comments-loader');

const commentFragment = document.createDocumentFragment();

const renderFullPicture = ({url, description, likes, comments}) => {
  pictureContainer.classList.remove('hidden');
  commentCount.classList.add('hidden');
  commentLoader.classList.add('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', () => {
    onClosePictureHandler();
  });

  pictureImg.src = url;
  pictureDescription.textContent = description;
  pictureLikesCount.textContent = likes;

  comments.forEach(({avatar, message, name}) => {
    const commentClone = commentItem.cloneNode(true);
    const commentAvatarClone = commentClone.querySelector('img');
    commentAvatarClone.src = avatar;
    commentAvatarClone.alt = name;
    commentClone.querySelector('.social__text').textContent = message;
    commentFragment.append(commentClone);
  });
  commentContainer.append(commentFragment);
};

const onClosePicture = () => {
  pictureContainer.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onClosePictureHandler);
};

function onClosePictureHandler(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onClosePicture();
  }
}

pictureCloseButton.addEventListener('click', onClosePicture);

export {renderFullPicture};
