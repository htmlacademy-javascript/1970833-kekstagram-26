import {isEscapeKey} from './util.js';
import {chooseEffectDefault} from './image-editing.js';
import {sendData} from './api.js';

const MAX_HASHTAGS = 5;
const SCALE_VALUE_DEFAULT = 100;
const SCALE_DEFAULT = 1;

const body = document.querySelector('body');
const uploadFile = document.querySelector('#upload-file');
const buttonCancelUpload = document.querySelector('#upload-cancel');
const imgUpload = document.querySelector('.img-upload__overlay');
const uploadForm = document.querySelector('#upload-select-image');
const textHashtags = imgUpload.querySelector('.text__hashtags');
const textComment = imgUpload.querySelector('.text__description');

const scaleControlImage = document.querySelector('.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview img');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',

});
const re = /^#[A-Za-zА-яа-яЁё0-9]{1,19}$/;

// значения констант для отправки данных
const successContainer = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const successButton = successContainer.querySelector('.success__button');

const errorContainer = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorButton = errorContainer.querySelector('.error__button');

const submitButton = document.querySelector('#upload-submit');

const getPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt) && !body.contains(errorContainer)) {
    evt.preventDefault();
    closelImgUpload();
  }
};

// открытие формы редактирования изображения
const openUploadFile = () => {
  imgUpload.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', getPopupEscKeydown);
  previewImage.style.transform = `scale(${SCALE_DEFAULT})`;
  scaleControlImage.value = `${SCALE_VALUE_DEFAULT}%`;
  chooseEffectDefault();
};

uploadFile.addEventListener('change', openUploadFile);

// закрытие формы редактирования изображения
function closelImgUpload() {
  imgUpload.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', getPopupEscKeydown);
  uploadFile.value = '';
  textHashtags.value = '';
  textComment.value = '';
  pristine.validate();
  uploadForm.reset();
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
  return hashtagsArr.length <= MAX_HASHTAGS;
};

pristine.addValidator(textHashtags, validateQuantityHashtags, 'Не более 5 хэш-тэгов');

const validateRepeatHashtags = (text) => {
  if (text === '') {
    return true;
  }

  const hashtagsArr = text.toLowerCase().trim().split(' ');
  return new Set(hashtagsArr).size === hashtagsArr.length;
};

pristine.addValidator(textHashtags, validateRepeatHashtags, 'Хэш-тэги не должны повторяться');

// на время выполнения запроса к серверу кнопка «Отправить» блокируется
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

// закрытие окна об успешной отправке
const getPopupSuccessClose = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessPopup();
  }
};

const getSuccessContainerClick = (evt) => {
  if (evt.target === successContainer) {
    closeSuccessPopup();
  }
};

function closeSuccessPopup () {
  successContainer.remove();
  document.removeEventListener('click', getSuccessContainerClick);
  document.removeEventListener('keydown', getPopupSuccessClose);
  successButton.addEventListener('click', () => closeSuccessPopup());
}

// открытие окна об успешной отправке
const showSuccessPopup = () => {
  body.append(successContainer);
  document.addEventListener('click', getSuccessContainerClick);
  document.addEventListener('keydown', getPopupSuccessClose);
  successButton.addEventListener('click', () => closeSuccessPopup());
};

const onSuccessFormSend = () => {
  closelImgUpload();
  showSuccessPopup();
  unblockSubmitButton();
};

// закрытие окна об ошибке
const onPopupErrorClose = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorPopup();
  }
};

const getErrorContainerClick = (evt) => {
  if (evt.target === errorContainer) {
    closeErrorPopup();
  }
};

function closeErrorPopup () {
  errorContainer.remove();
  document.removeEventListener('click', getErrorContainerClick);
  document.removeEventListener('keydown', onPopupErrorClose);
  errorButton.removeEventListener('click', () => closeErrorPopup());
}

// открытие окна об ошибке
const showErrorPopup = () => {
  body.append(errorContainer);
  document.addEventListener('click', getErrorContainerClick);
  document.addEventListener('keydown', onPopupErrorClose);
  errorButton.addEventListener('click', () => closeErrorPopup());
};

const onErrorFormSend = () => {
  showErrorPopup();
  unblockSubmitButton();
};

// отменяет обработчик Esc при фокусе
const canсelsFocusInEscapeKey = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

textHashtags.addEventListener('keydown', canсelsFocusInEscapeKey);
textComment.addEventListener('keydown', canсelsFocusInEscapeKey);

// отправка формы
const setFormUpload = () => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(onSuccessFormSend, onErrorFormSend, new FormData(evt.target));
    }
  });
};

export {setFormUpload};
