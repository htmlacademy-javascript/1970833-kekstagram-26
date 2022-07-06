import {generateObjects} from './data.js';
import {renderPicture} from './rendering-thumbnails.js';
import {initFromHandler} from './form-upload.js';
import {imageEditing} from './image-editing.js';

renderPicture(generateObjects());
initFromHandler();
imageEditing();
