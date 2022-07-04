import {generateObjects} from './data.js';
import {renderPicture} from './rendering-thumbnails.js';
import {initFromHandler} from './form-upload.js';

renderPicture(generateObjects());
initFromHandler();
