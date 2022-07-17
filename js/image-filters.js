import {compareImage} from './util.js';

const filterConteiner = document.querySelector('.img-filters');
const filterButtonDefault = filterConteiner.querySelector('#filter-default');
const filterButtonRandom = filterConteiner.querySelector('#filter-random');
const filterButtonDiscussed = filterConteiner.querySelector('#filter-discussed');

// изменение состояния кнопок переключения фильтров
const changeStatusButtons = (clickButton) => {
  filterConteiner.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  clickButton.classList.add('img-filters__button--active');
};

// нажатие на кнопку «По умолчанию»
const setFilterButtonDefault = (cb) => {
  filterButtonDefault.addEventListener('click', () => {
    changeStatusButtons(filterButtonDefault);
    cb();
  });
};

// нажатие на кнопку «Случайные»
const setFilterButtonRandom = (cb) => {
  filterButtonRandom.addEventListener('click', () => {
    changeStatusButtons(filterButtonRandom);
    cb();
  });
};

// нажатие на кнопку «Обсуждаемые»
const setFilterButtonDiscussed = (cb) => {
  filterButtonDiscussed.addEventListener('click', () => {
    changeStatusButtons(filterButtonDiscussed);
    cb();
  });
};

export {compareImage, setFilterButtonDefault, setFilterButtonRandom, setFilterButtonDiscussed};
