import formatUtcDateToDayMonthYear from '../utils/formatUtcDateToDayMonthYear.js';
import loadBackgroundImageFallback from '../utils/loadBackgroundImageFallback.js';
import sanitizeHTML from '../utils/sanitizeHTML.js';

class Results {
  constructor(section, newsStorageCallbacks) {
    this._section = section;
    this._getNews = newsStorageCallbacks.getNews;
    this._getRenderedNewsCount = newsStorageCallbacks.getRenderedNewsCount;
    this._setRenderedNewsCount = newsStorageCallbacks.setRenderedNewsCount;
  }

  static _calculateNewsToRenderCount(newsData, renderedNewsCount, newsToAdd) {
    const allNewsCount = newsData.length;
    const approximateCount = renderedNewsCount + newsToAdd;
    const newsToRenderCount = approximateCount <= allNewsCount
      ? approximateCount : allNewsCount;

    return newsToRenderCount;
  }

  static _deleteSectionContent(section) {
    section.innerHTML = '';
  }

  static _createNewsCard(data) {
    const urlToResource = sanitizeHTML(data.url);
    const urlToImage = sanitizeHTML(data.urlToImage);
    const newsCardDate = formatUtcDateToDayMonthYear(sanitizeHTML(data.publishedAt));
    const newsCardTitle = sanitizeHTML(data.title);
    const newsCardText = sanitizeHTML(data.description);
    const newsCardSite = sanitizeHTML(data.source.name);

    const newsCardContentMarkup = `
      <a href="${urlToResource}" class="news-card__wrapper-link link" target="_blank">
        <div class="news-card__img-wrapper"></div>
        <div class="news-card__text-content">
          <p class="news-card__date">${newsCardDate}</p>
          <h3 class="news-card__title">${newsCardTitle}</h3>
          <p class="news-card__text">${newsCardText}</p>
          <p class="news-card__site">${newsCardSite}</p>
        </div>
      </a>
    `;

    const newsCardElement = document.createElement('article');
    newsCardElement.classList.add('news-card');
    newsCardElement.insertAdjacentHTML('afterbegin', newsCardContentMarkup);

    const newsCardImageWrapper = newsCardElement.querySelector('.news-card__img-wrapper');
    loadBackgroundImageFallback(newsCardImageWrapper, urlToImage);

    return newsCardElement;
  }

  _areMoreNewsToRender(newsData) {
    const allNewsCount = newsData.length;
    const renderedNewsCount = this._getRenderedNewsCount();

    return allNewsCount > renderedNewsCount;
  }

  _toggleShowMoreButton(button, newsData) {
    if (this._areMoreNewsToRender(newsData)) {
      button.classList.remove('news__show-more-button_hidden');
    } else {
      button.classList.add('news__show-more-button_hidden');
    }
  }

  _renderNewsCardsCount(newsData, renderedNewsCount, newsToRenderCount) {
    for (let i = renderedNewsCount; i < newsToRenderCount; i += 1) {
      const card = this.constructor._createNewsCard(newsData[i]);
      this._newsCardsList.appendChild(card);
    }
  }

  addNewsCardsHandler(newsToAdd = 3) {
    const newsData = this._getNews();
    const renderedNewsCount = this._getRenderedNewsCount() || 0;
    const newsToRenderCount = this.constructor._calculateNewsToRenderCount(
      newsData, renderedNewsCount, newsToAdd,
    );

    this._renderNewsCardsCount(newsData, renderedNewsCount, newsToRenderCount);
    this._setRenderedNewsCount(newsToRenderCount);
    this._toggleShowMoreButton(this._showMoreButton, newsData);
  }

  renderPreloader() {
    const preloaderMarkup = `
      <div class="preloader main-container">
        <div class="preloader__content">
          <div class="preloader__circle"></div>
          <p class="preloader__text text">Идет поиск новостей...</p>
        </div>
      </div>
    `;

    this.constructor._deleteSectionContent(this._section);
    this._section.insertAdjacentHTML('afterbegin', preloaderMarkup);
  }

  renderFeedback({ title, text }) {
    const feedbackMarkup = `
      <div class="feedback main-container">
        <div class="feedback__content">
          <div class="feedback__sad-loupe"></div>
          <h2 class="feedback__title">${title}</h2>
          <p class="feedback__text text">${text}</p>
        </div>
      </div>
    `;

    this.constructor._deleteSectionContent(this._section);
    this._section.insertAdjacentHTML('afterbegin', feedbackMarkup);
  }

  renderNewsContainer() {
    const cardsContainerMarkup = `
      <div class="news main-container">
        <div class="news__title-container">
          <h2 class="news__title title">Результаты поиска</h2>
          <div class="news__link-wrapper">
            <a href="./analytics.html" class="news__link link">Посмотреть аналитику</a>
          </div>
        </div>
        <div class="news__cards-list-container">
          <div class="news__cards-list"></div>
          <button class="news__show-more-button news__show-more-button_hidden button">Показать еще</button>
        </div>
      </div>
    `;

    this.constructor._deleteSectionContent(this._section);
    this._section.insertAdjacentHTML('afterbegin', cardsContainerMarkup);

    this._newsCardsListContainer = this._section.querySelector('.news__cards-list-container');
    this._newsCardsList = this._section.querySelector('.news__cards-list');

    this._showMoreButton = this._section.querySelector('.news__show-more-button');
    this._showMoreButton.addEventListener('click', () => this.addNewsCardsHandler());
  }

  initRenderNews() {
    const renderedNews = this._getRenderedNewsCount();

    if (renderedNews) {
      this._setRenderedNewsCount(null);
      this.renderNewsContainer();
      this.addNewsCardsHandler();
    }
  }
}

export default Results;
