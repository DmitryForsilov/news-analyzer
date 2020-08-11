import './analytics.css';
import CSS_SELECTORS from '../../js/constants/CSS_SELECTORS.js';
import DataStorage from '../../js/modules/DataStorage.js';
import Statistics from '../../js/components/Statistics.js';

/* --- Элементы --- */
const { localStorage } = window;
const sectionElements = {
  analyticsGlobal: document.querySelector(CSS_SELECTORS.analyticsGlobal),
  analyticsDays: document.querySelector(CSS_SELECTORS.analyticsDays),
};

/* --- Функции --- */
const getStorageData = (dataStorage) => {
  const storageData = {
    query: dataStorage.getItem('query'),
    news: dataStorage.getItem('news'),
  };

  return storageData;
};

/* --- Экземпляры классов --- */
const dataStorage = new DataStorage(localStorage);
const statistics = new Statistics(getStorageData(dataStorage), sectionElements);

/* --- Инициализация --- */
statistics.initRender();
