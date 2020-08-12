import formatUtcDateToDayMonthYear from '../utils/formatUtcDateToDayMonthYear';
import sanitizeHTML from '../utils/sanitizeHTML.js';

class Commits {
  constructor(commitsContainer) {
    this._commitsContainer = commitsContainer;
  }

  static _deleteSectionContent(section) {
    section.innerHTML = '';
  }

  static _createCommitMarkup(data) {
    const urlToCommit = sanitizeHTML(data.html_url);
    const avatarUrl = sanitizeHTML(data.author.avatar_url);
    const commitDate = formatUtcDateToDayMonthYear(sanitizeHTML(data.commit.committer.date));
    const commitName = sanitizeHTML(data.commit.committer.name);
    const commitEmail = sanitizeHTML(data.commit.committer.email);
    const commitDescription = sanitizeHTML(data.commit.message);

    const commitMarkup = `
      <article class="swiper-slide commit">
        <a href="${urlToCommit}" class="commit__wrapper-link link" target="_blank">
          <p class="commit__date">${commitDate}</p>
          <div class="commit__title-container">
            <img src="${avatarUrl}" alt="Фотография автора" class="commit__avatar">
            <div class="commit__title-text-wrapper">
              <h3 class="commit__name">${commitName}</h3>
              <p class="commit__email">${commitEmail}</p>
            </div>
          </div>
          <p class="commit__description">${commitDescription}</p>
        </a>
      </article>
    `;

    return commitMarkup;
  }

  _createSliderMakup(commits) {
    const commitsMarkup = commits
      .map((commit) => this.constructor._createCommitMarkup(commit))
      .join('');

    const sliderMakup = `
    <div class="swiper-container">
      <div class="swiper-wrapper">
        ${commitsMarkup}
      </div>
      <div class="swiper-pagination"></div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
    `;

    return sliderMakup;
  }

  _createCommitsContentMarkup(commits, urlToCommits) {
    const sliderMakup = this._createSliderMakup(commits);

    const commitsContentMarkup = `
      <div class="commits__content main-container main-container_place_commits">
        <div class="commits__title-container">
          <h2 class="commits__title title">История коммитов из&nbsp;GitHub</h2>
          <div class="commits__link-wrapper">
            <a href="${urlToCommits}" class="commits__link link" target="_blank">Открыть в Github</a>
          </div>
        </div>
        ${sliderMakup}
        <a href="${urlToCommits}" class="commits__github-button button" target="_blank">Открыть в Github</a>
      </div>
    `;

    return commitsContentMarkup;
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

    this.constructor._deleteSectionContent(this._commitsContainer);
    this._commitsContainer.insertAdjacentHTML('afterbegin', feedbackMarkup);
  }

  renderCommitsContent(commits, urlToCommits) {
    this.constructor._deleteSectionContent(this._commitsContainer);
    this._commitsContainer.insertAdjacentHTML('afterbegin', this._createCommitsContentMarkup(commits, urlToCommits));
  }
}

export default Commits;
