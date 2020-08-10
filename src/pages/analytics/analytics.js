import './analytics.css';
import CSS_CLASSES from '../../js/constants/CSS_CLASSES.js';
import DataStorage from '../../js/modules/DataStorage.js';
import Statistics from '../../js/components/Statistics.js';

const { localStorage } = window;
const dataStorage = new DataStorage(localStorage);
const sectionElements = {
  analyticsGlobal: document.querySelector(`.${CSS_CLASSES.analyticsGlobal}`),
  analyticsDays: document.querySelector(`.${CSS_CLASSES.analyticsDays}`),
};
const storageData = {
  query: dataStorage.getItem('query'),
  news: dataStorage.getItem('news'),
};

const statistics = new Statistics(storageData, sectionElements);

statistics.init();
