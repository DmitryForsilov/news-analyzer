import './analytics.css';
import CSS_SELECTORS from '../../js/constants/CSS_SELECTORS.js';
import DataStorage from '../../js/modules/DataStorage.js';
import Statistics from '../../js/components/Statistics.js';

/* --- dom elements --- */
const { localStorage } = window;
const sectionElements = {
  analyticsGlobal: document.querySelector(CSS_SELECTORS.analyticsGlobal),
  analyticsDays: document.querySelector(CSS_SELECTORS.analyticsDays),
};

/* --- Functions --- */
const getStorageData = (dataStorage) => {
  const storageData = {
    query: dataStorage.getItem('query'),
    news: dataStorage.getItem('news'),
  };

  return storageData;
};

/* --- instances --- */
const dataStorage = new DataStorage(localStorage);
const statistics = new Statistics(getStorageData(dataStorage), sectionElements);

/* --- init --- */
statistics.initRender();
