import {isEscapeKey} from './util.js';
import {effectDefault} from './image-editing.js';

const body = document.querySelector('body');
const uploadFile = document.querySelector('#upload-file');
const buttonCancelUpload = document.querySelector('#upload-cancel');
const imgUpload = document.querySelector('.img-upload__overlay');
const uploadForm = document.querySelector('#upload-select-image');
const textHashtags = imgUpload.querySelector('.text__hashtags');
const textComment = imgUpload.querySelector('.text__description');
const MAX_HASHTAGS = 5;

const scaleControlImage = document.querySelector('.scale__control--value');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',

});
const re = /^#[A-Za-zА-яа-яЁё0-9]{1,19}$/;

const initFromHandler = () => {
  const onPopupEscKeydown = (evt) => {
    if (isEscapeKey(evt)
      && document.activeElement !== textHashtags
      && document.activeElement !== textComment) {
      evt.preventDefault();
      closelImgUpload();
    }
  };

  // открытие формы редактирования изображения
  const openUploadFile = () => {
    imgUpload.classList.remove('hidden');
    body.classList.add('modal-open');
    document.addEventListener('keydown', onPopupEscKeydown);
    scaleControlImage.value = '100%';
    effectDefault();
  };

  uploadFile.addEventListener('change', () => {
    openUploadFile();
  });

  // закрытие формы редактирования изображения
  function closelImgUpload() {
    imgUpload.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onPopupEscKeydown);
    uploadFile.value = '';
    textHashtags.value = '';
    textComment.value = '';
  }

  buttonCancelUpload.addEventListener('click', () => {
    closelImgUpload();
  });

  // валидация формы добавления изображения (строка хэш-теги)
  const validateTextHashtags = (text) => {
    if (text === '') {
      return true;
    }

    const hashtagsArr = text.toLowerCase().trim().split(' ');
    return hashtagsArr.every((hashtag) => re.test(hashtag));
  };

  pristine.addValidator(textHashtags, validateTextHashtags, 'Хэш-тэг начинается со знака "#". Содержит только буквы и цифры, не содержит пробелы. Количество символов: min=2, max=20, включая "#"');

  const validateQuantityHashtags = (text) => {
    if (text === '') {
      return true;
    }

    const hashtagsArr = text.toLowerCase().trim().split(' ');
    if (hashtagsArr.length > MAX_HASHTAGS) {
      return false;
    }
    return true;
  };

  pristine.addValidator(textHashtags, validateQuantityHashtags, 'Не более 5 хэш-тэгов');

  const validateRepeatHashtags = (text) => {
    if (text === '') {
      return true;
    }

    const hashtagsArr = text.toLowerCase().trim().split(' ');
    if (new Set(hashtagsArr).size !== hashtagsArr.length) {
      return false;
    }
    return true;
  };

  pristine.addValidator(textHashtags, validateRepeatHashtags, 'Хэш-тэги не должны повторяться');

  // отправка формы
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      uploadForm.submit();
    }
  });
};

export {initFromHandler};
