import {renderPicture} from './rendering-thumbnails.js';
import {setFormUpload} from './form-upload.js';
import {imageEditing} from './image-editing.js';
import {getData} from './api.js';
import {showAlert} from './util.js';

getData(renderPicture, showAlert);
setFormUpload();
imageEditing();
