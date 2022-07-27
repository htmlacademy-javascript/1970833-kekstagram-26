const IMAGE_SCALE = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};

const SETTINGS_EFFECTS = {
  chrome: {
    filter: 'grayscale',
    minEffectSlider: 0,
    maxEffectSlider: 1,
    stepSlider: 0.1,
    unit: '',
  },
  sepia: {
    filter: 'sepia',
    minEffectSlider: 0,
    maxEffectSlider: 1,
    stepSlider: 0.1,
    unit: '',
  },
  marvin: {
    filter: 'invert',
    minEffectSlider: 0,
    maxEffectSlider: 100,
    stepSlider: 1,
    unit: '%',
  },
  phobos: {
    filter: 'blur',
    minEffectSlider: 0,
    maxEffectSlider: 3,
    stepSlider: 0.1,
    unit: 'px',
  },
  heat: {
    filter: 'brightness',
    minEffectSlider: 1,
    maxEffectSlider: 3,
    stepSlider: 0.1,
    unit: '',
  },
};

const previewImage = document.querySelector('.img-upload__preview img');

const scaleControlImage = document.querySelector('.scale__control--value');
const decrementScaleImage = document.querySelector('.scale__control--smaller');
const incrementScaleImage = document.querySelector('.scale__control--bigger');

const sliderEffectLevel = document.querySelector('.img-upload__effect-level');
const sliderContainer = document.querySelector('.effect-level__slider');
const effectValueContainer = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');

// выбор эффекта по умолчанию «Оригинал» (скрытие слайдера и эффектов)
const chooseEffectDefault = () => {
  sliderEffectLevel.classList.add('hidden');
  previewImage.className = 'img-upload__preview';
  previewImage.style.filter = '';
};

const imageEditing = () => {

  // редактирование масштаба изображения
  const imageScaleChange = (evt) => {
    let imageScaleValue = +scaleControlImage.value.slice(0, -1); // преобразования к числу в явном виде + возврат нового массива
    if (evt) {
      if (imageScaleValue < IMAGE_SCALE.MAX) {
        imageScaleValue += IMAGE_SCALE.STEP;
      }
    } else {
      if (imageScaleValue > IMAGE_SCALE.MIN) {
        imageScaleValue -= IMAGE_SCALE.STEP;
      }
    }

    scaleControlImage.value = `${imageScaleValue}%`;
    previewImage.style.transform = `scale(${imageScaleValue / 100})`;
  };

  const clickIncrementButton = () => imageScaleChange(true);
  const clickDecrementButton = () => imageScaleChange(false);
  incrementScaleImage.addEventListener('click', clickIncrementButton);
  decrementScaleImage.addEventListener('click', clickDecrementButton);

  // слайдер изменения уровня эффекта
  noUiSlider.create(sliderContainer, {
    range: {
      min: 0,
      max: 1,
    },
    start: 0,
    step: 0.1,
    connect: 'lower',
  });

  // переключение эффектов
  const changeEffect = (evt) => {
    if (evt.target.value === 'none') {
      chooseEffectDefault();
    } else {
      sliderEffectLevel.classList.remove('hidden');
      previewImage.classList.add(`effects__preview--${evt.target.value}`);

      const arrayEffects = SETTINGS_EFFECTS[evt.target.value];
      const {minEffectSlider, maxEffectSlider, stepSlider} = arrayEffects;

      sliderContainer.noUiSlider.updateOptions({
        range: {
          min: minEffectSlider,
          max: maxEffectSlider,
        },
        step: stepSlider,
        start: maxEffectSlider,
      });
      sliderContainer.noUiSlider.set(maxEffectSlider);
    }
  };
  effectsList.addEventListener('change', changeEffect);

  // интенсивность эффектов
  sliderContainer.noUiSlider.on('update', () => {
    const sliderValue = sliderContainer.noUiSlider.get();
    const arrayEffects = SETTINGS_EFFECTS[document.querySelector('input[name="effect"]:checked').value];

    effectValueContainer.value = sliderValue;

    if (arrayEffects !== undefined) {
      const {filter, unit} = arrayEffects;
      previewImage.style.filter = `${filter}(${sliderValue}${unit})`;
    }
  });
};

export {imageEditing, chooseEffectDefault};
