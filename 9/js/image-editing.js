const previewImage = document.querySelector('.img-upload__preview');

const scaleControlImage = document.querySelector('.scale__control--value');
const decrementScaleImage = document.querySelector('.scale__control--smaller');
const incrementScaleImage = document.querySelector('.scale__control--bigger');

const sliderEffectLevel = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const effectValueElement = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');

const IMAGE_SCALE = {
  minScale: 25,
  maxScale: 100,
  stepScale: 25,
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

// выбор эффекта по умолчанию «Оригинал» (скрытие слайдера и эффектов)
const effectDefault = () => {
  sliderEffectLevel.classList.add('hidden');
  previewImage.className = 'img-upload__preview';
  previewImage.style.filter = '';
};

const imageEditing = () => {

  // редактирование масштаба изображения
  const imageScaleChange = (evt) => {
    let imageScaleValue = +scaleControlImage.value.slice(0, -1); // преобразования к числу в явном виде + возврат нового массива
    if (evt) {
      if (imageScaleValue < IMAGE_SCALE.maxScale) {
        imageScaleValue += IMAGE_SCALE.stepScale;
      }
    } else {
      if (imageScaleValue > IMAGE_SCALE.minScale) {
        imageScaleValue -= IMAGE_SCALE.stepScale;
      }
    }

    scaleControlImage.value = `${imageScaleValue}%`;
    previewImage.style.transform = `scale(${imageScaleValue / 100})`;
  };

  const onIncrementButton = () => imageScaleChange(true);
  const decrementButton = () => imageScaleChange(false);
  incrementScaleImage.addEventListener('click', onIncrementButton);
  decrementScaleImage.addEventListener('click', decrementButton);

  // слайдер изменения уровня эффекта
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 1,
    },
    start: 0,
    step: 0.1,
    connect: 'lower',
  });

  // переключение эффектов
  const effectChange = (evt) => {
    if (evt.target.value === 'none') {
      effectDefault();
    } else {
      sliderEffectLevel.classList.remove('hidden');
      previewImage.classList.add(`effects__preview--${evt.target.value}`);

      const arrayEffects = SETTINGS_EFFECTS[evt.target.value];
      const {minEffectSlider, maxEffectSlider, stepSlider} = arrayEffects;

      sliderElement.noUiSlider.updateOptions({
        range: {
          min: minEffectSlider,
          max: maxEffectSlider,
        },
        step: stepSlider,
        start: maxEffectSlider,
      });
      sliderElement.noUiSlider.set(maxEffectSlider);
    }
  };
  effectsList.addEventListener('change', effectChange);

  // интенсивность эффектов
  sliderElement.noUiSlider.on('update', () => {
    const sliderValue = sliderElement.noUiSlider.get();
    const arrayEffects = SETTINGS_EFFECTS[document.querySelector('input[name="effect"]:checked').value];

    effectValueElement.value = sliderValue;

    if (arrayEffects !== undefined) {
      const {filter, unit} = arrayEffects;
      previewImage.style.filter = `${filter}(${sliderValue}${unit})`;
    }
  });
};

export {imageEditing, effectDefault};
