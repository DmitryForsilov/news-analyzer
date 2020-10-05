import './index.css';
import CSS_SELECTORS from '../../js/constants/CSS_SELECTORS.js';
import MESSAGES from '../../js/constants/MESSAGES.js';
import NEWS_API_CONFIG from '../../js/constants/NEWS_API_CONFIG.js';
import normalizeTimeStamp from '../../js/utils/normalizeTimeStamp.js';
import convertTimeStampToUtcDate from '../../js/utils/convertTimeStampToUtcDate.js';
import getTimeStampDaysBefore from '../../js/utils/getTimeStampDaysBefore.js';
import DataStorage from '../../js/modules/DataStorage.js';
import NewsApi from '../../js/modules/NewsApi.js';
import SearchForm from '../../js/components/SearchForm.js';
import Results from '../../js/components/Results.js';

/* --- dom elements --- */
const { localStorage } = window;
const { form } = document.forms;
const { input } = form.elements;
const { submitButton } = form.elements;
const inputError = form.querySelector(CSS_SELECTORS.inputError);
const resultsContainer = document.querySelector(CSS_SELECTORS.resultsContainer);

/* --- Functions --- */
const initInputQuery = (inputElement, query) => {
  if (query) {
    inputElement.defaultValue = query;
  }
};

const makeNewsStorageCallbacks = (dataStorage) => {
  const getNews = () => dataStorage.getItem('news');
  const getRenderedNewsCount = () => dataStorage.getItem('renderedNews');
  const setRenderedNewsCount = (count) => dataStorage.setItem('renderedNews', count);

  return { getNews, getRenderedNewsCount, setRenderedNewsCount };
};

const makeSubmitFormCallback = (newsApi, dataStorage, results) => (query, callbacks) => {
  const timeStamp = normalizeTimeStamp(Date.now());
  const currentDate = convertTimeStampToUtcDate(timeStamp);
  const dateSevenDaysBefore = convertTimeStampToUtcDate(getTimeStampDaysBefore(timeStamp));

  dataStorage.clearStorage();
  callbacks.disableFormElements();
  results.renderPreloader();

  newsApi.getNews(query, currentDate, dateSevenDaysBefore)
    .then(({ articles }) => {
      if (articles.length === 0) {
        results.renderFeedback(MESSAGES.nothingFound);
      } else {
        dataStorage.setItem('query', query);
        dataStorage.setItem('news', articles);
        results.renderNewsContainer();
        results.addNewsCardsHandler();
      }
    })
    .catch((error) => {
      console.log(error);
      results.renderFeedback(MESSAGES.requestError);
    })
    .finally(() => callbacks.enableFormElements());
};

/* --- instances --- */
const newsApi = new NewsApi(NEWS_API_CONFIG);
const dataStorage = new DataStorage(localStorage);
const results = new Results(resultsContainer, makeNewsStorageCallbacks(dataStorage));
const searchForm = new SearchForm(
  {
    form, input, inputError, submitButton,
  },
  makeSubmitFormCallback(newsApi, dataStorage, results),
  MESSAGES,
);

/* --- listeners --- */
searchForm.setEvenListeners();

/* --- init --- */
initInputQuery(input, dataStorage.getItem('query'));
results.initRenderNews();
