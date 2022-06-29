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

  document.addEventListener('keydown', closePictureHandler);

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
    // const commentItem = document.createElement('li');
    // commentItem.classList.add('social__comment');
    // const commentItemImg = document.createElement('img');
    // commentItemImg.classList.add('social__picture');
    // commentItemImg.setAttribute('src', avatar);
    // commentItemImg.setAttribute('alt', name);
    // const commentItemText = document.createElement('p');
    // commentItemText.classList.add('social__text');
    // commentItemText.textContent = message;
    // commentItem.append(commentItemImg);
    // commentItem.append(commentItemText);
    // commentFragment.append(commentItem);
  });
  commentContainer.append(commentFragment);
};

const closePicture = () => {
  pictureContainer.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', closePictureHandler);
};

function closePictureHandler(event) {
  if (event.key === 'Escape') {
    closePicture();
  }
}

pictureCloseButton.addEventListener('click', closePicture);

export {renderFullPicture};