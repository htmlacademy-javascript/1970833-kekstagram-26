import {debounce, shuffleArray, compareImage} from './util.js';
import {renderPicture} from './rendering-thumbnails.js';

const RERENDER_DELAY = 500;
const COUNT_RANDOM_IMAGES = 10;

const filterObject = {
  'filter-default': (images) => images.slice(),
  'filter-random': (images) => shuffleArray(images.slice()).slice(0, COUNT_RANDOM_IMAGES),
  'filter-discussed': (images) => images.slice().sort(compareImage),
};

const filterConteiner = document.querySelector('.img-filters');
const filterButtons = filterConteiner.querySelectorAll('button');

const debounceButtonFilter = debounce((id, images) => renderPicture(filterObject[id](images)), RERENDER_DELAY);

const filterRendering = (images) => {
  filterConteiner.classList.remove('img-filters--inactive');
  filterButtons.forEach((button) => {
    button.addEventListener('click', (evt) => {
      filterConteiner.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
      debounceButtonFilter(evt.target.id, images);
    });
  });
};

export {filterRendering};
