import {isEscapeKey} from './util.js';

const QUANTITY_ADD_COMMENTS = 5;

const body = document.querySelector('body');
const pictureContainer = document.querySelector('.big-picture');

const pictureCloseButton = pictureContainer.querySelector('#picture-cancel');
const pictureImg = pictureContainer.querySelector('.big-picture__img img');
const pictureDescription = pictureContainer.querySelector('.social__caption');
const pictureLikesCount = pictureContainer.querySelector('.likes-count');

const commentCount = pictureContainer.querySelector('.social__comment-count');
const commentContainer = pictureContainer.querySelector('.social__comments');
const commentItem = pictureContainer.querySelector('.social__comment');
const buttonLoadComments = pictureContainer.querySelector('.social__comments-loader');

const commentFragment = document.createDocumentFragment();

let onButtonLoadCommentsClick = null;

// закрытие полноэкранного изображения
const onFullPictureClose = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePicture();
  }
};

function closePicture () {
  pictureContainer.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onFullPictureClose);
  pictureCloseButton.removeEventListener('click', closePicture);
}

// отображение одного комментария
const renderComment = (({avatar, message, name}) => {
  const commentClone = commentItem.cloneNode(true);
  const commentAvatarClone = commentClone.querySelector('img');
  commentAvatarClone.src = avatar;
  commentAvatarClone.alt = name;
  commentClone.querySelector('.social__text').textContent = message;
  commentFragment.append(commentClone);
});

// отображение всех комментариев
const renderComments = (comments, countAddComments) => {
  buttonLoadComments.classList.remove('hidden');
  const countLoadComments = countAddComments * QUANTITY_ADD_COMMENTS;
  const countAllComments = comments.length;

  let countComment = 0;
  for (let i = 0; i < (countAllComments <= countLoadComments ? countAllComments : countLoadComments); i++) {
    renderComment(comments[i]);
    countComment++;
  }

  if (countAllComments <= countLoadComments) {
    buttonLoadComments.classList.add('hidden');
    buttonLoadComments.removeEventListener('click', onButtonLoadCommentsClick);
  } else {
    commentCount.classList.remove('hidden');
  }

  commentCount.textContent = `${countComment} из ${countAllComments} комментариев`;
  commentContainer.innerHTML = '';
  commentContainer.append(commentFragment);
};

// отображение полноэкранного изображения

const renderFullPicture = ({url, description, likes, comments}) => {
  pictureContainer.classList.remove('hidden');
  body.classList.add('modal-open');
  let countAddComments = 1;

  pictureImg.src = url;
  pictureDescription.textContent = description;
  pictureLikesCount.textContent = likes;

  renderComments(comments, countAddComments);
  pictureCloseButton.addEventListener('click', () => closePicture());
  document.addEventListener('keydown', onFullPictureClose);

  onButtonLoadCommentsClick = () => {
    countAddComments++;
    renderComments(comments, countAddComments);
  };

  buttonLoadComments.addEventListener('click', onButtonLoadCommentsClick);
};

export {renderFullPicture};
