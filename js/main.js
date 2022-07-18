import {renderPicture} from './rendering-thumbnails.js';
import {setFormUpload} from './form-upload.js';
import {imageEditing} from './image-editing.js';
import {getData} from './api.js';
import {showAlert, debounce, shuffleArray} from './util.js';
import {compareImage, setFilterButtonDefault, setFilterButtonRandom, setFilterButtonDiscussed} from './image-filters.js';
import {showImageUploadUser} from './image-upload-user.js';


const RERENDER_DELAY = 500;
const COUNT_RANDOM_IMAGES = 10;

getData((images) => {
  renderPicture(images);

  setFilterButtonDefault(debounce(
    () => renderPicture(images), RERENDER_DELAY));

  setFilterButtonRandom(debounce(
    () => renderPicture(shuffleArray(images.slice()).slice(0, COUNT_RANDOM_IMAGES)), RERENDER_DELAY));

  setFilterButtonDiscussed(debounce(
    () => renderPicture(images.slice().sort(compareImage)), RERENDER_DELAY));
}, showAlert);

setFormUpload();

imageEditing();

showImageUploadUser();
