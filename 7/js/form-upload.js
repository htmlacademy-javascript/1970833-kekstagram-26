import {isEscapeKey} from './util.js';

const body = document.querySelector('body');
const uploadFile = document.querySelector('#upload-file');
const buttonCancelUpload = document.querySelector('#upload-cancel');
const imgUpload = document.querySelector('.img-upload__overlay');
const uploadForm = document.querySelector('#upload-select-image');
const textHashtags = uploadFile.querySelector('.text__hashtags');
const textComment = uploadFile.querySelector('.text__description');
const MAX_HASHTAGS = 5;

const pristine = new Pristine(uploadForm);
const re = /^#[A-Za-zА-яа-яЁё0-9]{1,19}$/;

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)
    && document.activeElement !== textHashtags
    && document.activeElement !== textComment) {
    evt.preventDefault();
    // eslint-disable-next-line no-use-before-define
    closelImgUpload();
  }
};

// открытие формы редактирования изображения
const openUploadFile = () => {
  imgUpload.classList.remove('.hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
};

uploadFile.addEventListener('change', () => {
  openUploadFile();
});

// закрытие формы редактирования изображения
const closelImgUpload = () => {
  imgUpload.classList.add('.hidden');
  body.classList.remove('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
  uploadFile.value = '';
  textHashtags.value = '';
  textComment.value = '';
};

buttonCancelUpload.addEventListener('click', () => {
  closelImgUpload();
});

// валидация формы добавления изображения (хэш-теги и комментарии)
const validateTextHashtags = (text) => {
  if (text === '') {
    return true;
  }

  const hashtagsArr = text.toLowerCase().trim().split('');

  if (hashtagsArr.length > MAX_HASHTAGS) {
    return false;
  }

  if (new Set(hashtagsArr).size !== hashtagsArr.length) {
    return false;
  }

  return hashtagsArr.every((hashtag) => re.test(hashtag));
};

pristine.addValidator(textHashtags, validateTextHashtags, 'Неправильно введён хэш-тэг');

// отправка формы
uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    uploadForm.submit();
  }
});
