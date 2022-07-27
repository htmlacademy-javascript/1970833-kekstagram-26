import {renderPicture} from './rendering-thumbnails.js';
import {setFormUpload} from './form-upload.js';
import {imageEditing} from './image-editing.js';
import {getData} from './api.js';
import {showAlert} from './util.js';
import {filterRendering} from './image-filters.js';
import {showImageUploadUser} from './image-upload-user.js';

getData((images) => {
  renderPicture(images);
  filterRendering(images);
}, showAlert);

setFormUpload();

imageEditing();

showImageUploadUser();
