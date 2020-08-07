import normalizeUtcDate from '../utils/normalizeUtcDate.js';

class Results {
  constructor(section, newsStorageCallbacks, CSS_CLASSES) {
    this._section = section;
    this._getNews = newsStorageCallbacks.getNews;
    this._getRenderedNewsCount = newsStorageCallbacks.getRenderedNewsCount;
    this._setRenderedNewsCount = newsStorageCallbacks.setRenderedNewsCount;
    this._CSS_CLASSES = CSS_CLASSES;
  }

  static _calculateNewsToRenderCount(newsData, renderedNewsCount, newsToAdd) {
    const allNewsCount = newsData.length;
    const approximateCount = renderedNewsCount + newsToAdd;
    const newsToRenderCount = approximateCount <= allNewsCount
      ? approximateCount : allNewsCount;

    return newsToRenderCount;
  }

  _deleteSectionContent() {
    this._section.innerHTML = '';
  }

  _createNewsCard(data) {
    const newsCardContentMarkup = `
      <a href="${data.url}" class="news-card__wrapper-link link" target="_blank">
        <div class="news-card__img-wrapper"></div>
        <div class="news-card__text-content">
          <p class="news-card__date">${normalizeUtcDate(data.publishedAt)}</p>
          <h3 class="news-card__title">${data.title}</h3>
          <p class="news-card__text">${data.description}</p>
          <p class="news-card__site">${data.source.name}</p>
        </div>
      </a>
    `;

    const newsCardElement = document.createElement('article');
    newsCardElement.classList.add('news-card');
    newsCardElement.insertAdjacentHTML('afterbegin', newsCardContentMarkup);

    if (data.urlToImage) {
      const newsCardImageWrapper = newsCardElement.querySelector(`.${this._CSS_CLASSES.newsCardImageWrapper}`);
      newsCardImageWrapper.style['background-image'] = `url(${data.urlToImage})`;
    }

    return newsCardElement;
  }

  _areMoreNewsToRender(newsData) {
    const allNewsCount = newsData.length;
    const renderedNewsCount = this._getRenderedNewsCount();

    return allNewsCount > renderedNewsCount;
  }

  _toggleShowMoreButton(button, newsData) {
    if (this._areMoreNewsToRender(newsData)) {
      button.classList.remove(`${this._CSS_CLASSES.showMoreButtonHidden}`);
    } else {
      button.classList.add(`${this._CSS_CLASSES.showMoreButtonHidden}`);
    }
  }

  _renderNewsCardsCount(newsData, renderedNewsCount, newsToRenderCount) {
    for (let i = renderedNewsCount; i < newsToRenderCount; i += 1) {
      const card = this._createNewsCard(newsData[i]);
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

    this._deleteSectionContent();
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

    this._deleteSectionContent();
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
          <button class="news__show-more-button button">Показать еще</button>
        </div>
      </div>
    `;

    this._deleteSectionContent();
    this._section.insertAdjacentHTML('afterbegin', cardsContainerMarkup);

    this._newsCardsListContainer = this._section.querySelector(`.${this._CSS_CLASSES.newsCardsListContainer}`);
    this._newsCardsList = this._section.querySelector(`.${this._CSS_CLASSES.newsCardsList}`);

    this._showMoreButton = this._section.querySelector(`.${this._CSS_CLASSES.showMoreButton}`);
    this._showMoreButton.addEventListener('click', () => this.addNewsCardsHandler());
  }

  initRenderNews() {
    const newsToRenderCount = this._getRenderedNewsCount();

    if (newsToRenderCount) {
      const newsData = this._getNews();

      this.renderNewsContainer();
      this._renderNewsCardsCount(newsData, 0, newsToRenderCount);
      this._toggleShowMoreButton(this._showMoreButton, newsData);
    }
  }
}

export default Results;
