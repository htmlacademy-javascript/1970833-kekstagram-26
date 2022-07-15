const URL_GET = 'https://26.javascript.pages.academy/kekstagram/data';
const URL_SEND = 'https://26.javascript.pages.academy/kekstagram';

const getData = async (onSuccess, onFail) => {
  try {
    const response = await fetch(URL_GET);

    if (!response.ok) {
      throw new Error('Не удалось загрузить фотографии');
    }

    const offers = await response.json();
    onSuccess(offers);
  } catch (error) {
    onFail(error.message);
  }
};

const sendData = async (onSuccess, onFail, body) => {
  try {
    const response = await fetch(URL_SEND,
      {
        method: 'POST',
        body,
      }
    );

    if (!response.ok) {
      throw new Error('Не удалось отправить фотографию. Попробуйте ещё раз');
    }

    onSuccess();
  } catch (error) {
    onFail(error.message);
  }
};

export {getData, sendData};
