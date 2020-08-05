import './index.css';
import CSS_CLASSES from '../../js/constants/CSS_CLASSES.js';
import ERROR_MESSAGES from '../../js/constants/ERROR_MESSAGES.js';
import NEWS_API_CONFIG from '../../js/constants/NEWS_API_CONFIG.js';
import normalizeDate from '../../js/utils/normalizeDate.js';
import getTimeStampDaysBefore from '../../js/utils/getTimeStampDaysBefore.js';
import DataStorage from '../../js/modules/DataStorage.js';
import NewsApi from '../../js/modules/NewsApi.js';
import SearchForm from '../../js/components/SearchForm.js';

/* --- Элементы --- */
const { localStorage } = window;
const { form } = document.forms;
const { input } = form.elements;
const { submitButton } = form.elements;
const inputError = form.querySelector(`.${CSS_CLASSES.inputError}`);

/* --- Функции --- */
const makeSubmitFormCallback = (newsApi, dataStorage) => (query, callbacks) => {
  const timeStamp = Date.now();
  const currentDate = normalizeDate(timeStamp);
  const dateSevenDaysBefore = normalizeDate(getTimeStampDaysBefore(timeStamp));

  callbacks.disableFormElements();
  newsApi.getNews(query, currentDate, dateSevenDaysBefore)
    .then(({ articles }) => {
      dataStorage.setItem('news', articles);
      callbacks.resetForm();
    })
    .catch((error) => console.log('err', error))
    .finally(() => callbacks.enableFormElements());
};

/* --- Экземпляры классов --- */
const newsApi = new NewsApi(NEWS_API_CONFIG);
const dataStorage = new DataStorage(localStorage);
const searchForm = new SearchForm(
  {
    form, input, inputError, submitButton,
  },
  makeSubmitFormCallback(newsApi, dataStorage),
  ERROR_MESSAGES,
);

searchForm.setEvenListeners();
