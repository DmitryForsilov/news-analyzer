import upperFirst from '../utils/upperFirst.js';
import formatNumber from '../utils/formatNumber.js';
import formatUtcDateToDayWeekday from '../utils/formatUtcDateToDayWeekday.js';
import convertToPercent from '../utils/convertToPercent.js';

class Statistics {
  constructor(storageData, sectionElements) {
    this._query = storageData.query;
    this._news = storageData.news;
    this._analyticsGlobal = sectionElements.analyticsGlobal;
    this._analyticsDays = sectionElements.analyticsDays;
  }

  static _createAnalyticsGlobalContent(query, data) {
    const analyticsGlobalContentMarkup = `
      <ul class="analytics-global__breadcrumbs">
        <li class="analytics-global__breadcrumbs-item">
          <a href="./index.html" class="analytics-global__breadcrumbs-link">Главная</a>
        </li>
        <li class="analytics-global__breadcrumbs-item">/</li>
        <li class="analytics-global__breadcrumbs-item">
          <a class="analytics-global__breadcrumbs-link analytics-global__breadcrumbs-link_active">Аналитика</a>
        </li>
      </ul>
      
      <h1 class="analytics-global__title title">
        Вы спросили: &laquo;${upperFirst(query)}&raquo;
      </h1>

      <ul class="analytics-global__list">
        <li class="analytics-global__text">
          Новостей за неделю:
          <span class="analytics-global__count">${formatNumber(data.newsCount)}</span>
        </li>
        <li class="analytics-global__text">
          Упоминаний в заголовках:
          <span class="analytics-global__count">${formatNumber(data.mentionsInTitles)}</span>
        </li>
        <li class="analytics-global__text">
          Упоминаний в текстах:
          <span class="analytics-global__count">${formatNumber(data.mentionsInTexts)}</span>
        </li>
        <li class="analytics-global__text">
          Общее количество упоминаний:
          <span class="analytics-global__count">${formatNumber(data.allMentions)}</span>
        </li>
      </ul>
    `;

    const analyticsGlobalContentContainer = document.createElement('div');
    analyticsGlobalContentContainer
      .classList
      .add('analytics-global__content', 'main-container', 'main-container_place_analytics-global');
    analyticsGlobalContentContainer.insertAdjacentHTML('afterbegin', analyticsGlobalContentMarkup);

    return analyticsGlobalContentContainer;
  }

  static _createAnalyticsDaysContent(data) {
    const analyticsDaysContentMarkup = `
      <h2 class="analytics-days__title">Аналитика по дням</h2>
      <div class="table">
        <p class="table__date">Дата</p>
        <p class="table__mentions">Общее количество упоминаний, &#37;</p>
        <div class="table__border-item"></div>
      </div>
    `;

    const marksMarkup = `
      <ul class="table__count-marks">
        <li class="table__count-mark">0</li>
        <li class="table__count-mark">25</li>
        <li class="table__count-mark">50</li>
        <li class="table__count-mark">75</li>
        <li class="table__count-mark">100</li>
      </ul>
    `;

    const daysAndCharts = data.allMentionsInDaysSorted.reduce((acc, [date, mentions]) => {
      const persentage = convertToPercent(mentions, data.allMentions);

      if (!persentage) {
        return acc;
      }

      const day = `<p class="table__day">${date}</p>`;
      const chart = `<div class="table__chart" style="width: ${persentage}%">${persentage}</div>`;

      return `${acc}${day}${chart}`;
    }, '');

    const analyticsDaysContentContainer = document.createElement('div');
    analyticsDaysContentContainer.classList
      .add('analytics-days__content', 'main-container');
    analyticsDaysContentContainer.insertAdjacentHTML('afterbegin', analyticsDaysContentMarkup);

    const table = analyticsDaysContentContainer.querySelector('.table');
    table.insertAdjacentHTML('beforeend', `${marksMarkup}${daysAndCharts}${marksMarkup}`);

    return analyticsDaysContentContainer;
  }

  _calculateMentions() {
    const regExp = new RegExp(this._query, 'gi');
    const result = {
      mentionsInTitles: 0,
      mentionsInTexts: 0,
      allMentionsInDays: {},
    };

    this._news.forEach(({ title, description, publishedAt }) => {
      const date = formatUtcDateToDayWeekday(publishedAt);
      const mentionsInTitles = (title.match(regExp) || []).length;
      const mentionsInTexts = (description.match(regExp) || []).length;

      result.mentionsInTitles += mentionsInTitles;
      result.mentionsInTexts += mentionsInTexts;

      if (result.allMentionsInDays[date]) {
        result.allMentionsInDays[date] += mentionsInTitles + mentionsInTexts;
      } else {
        result.allMentionsInDays[date] = mentionsInTitles + mentionsInTexts;
      }
    });

    return result;
  }

  _processStorageData() {
    const newsCount = this._news.length;
    const { mentionsInTitles, mentionsInTexts, allMentionsInDays } = this._calculateMentions();
    const allMentions = mentionsInTitles + mentionsInTexts;
    const allMentionsInDaysSorted = Object.entries(allMentionsInDays);

    return {
      analyticsGlobalData: {
        newsCount,
        mentionsInTitles,
        mentionsInTexts,
        allMentions,
      },
      analyticsDaysData: {
        allMentionsInDaysSorted,
        allMentions,
      },
    };
  }

  static _renderSectionContent(sectionElement, contentElement) {
    sectionElement.innerHTML = '';
    sectionElement.appendChild(contentElement);
  }

  init() {
    const { analyticsGlobalData, analyticsDaysData } = this._processStorageData();
    const analyticsGlobalContent = this.constructor
      ._createAnalyticsGlobalContent(this._query, analyticsGlobalData);
    const analyticsDaysContent = this.constructor
      ._createAnalyticsDaysContent(analyticsDaysData);

    this.constructor._renderSectionContent(this._analyticsGlobal, analyticsGlobalContent);
    this.constructor._renderSectionContent(this._analyticsDays, analyticsDaysContent);
  }
}

export default Statistics;
