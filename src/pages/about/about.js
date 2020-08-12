import 'swiper/swiper-bundle.css';
import './about.css';
import Swiper, { Navigation, Pagination } from 'swiper';
import MESSAGES from '../../js/constants/MESSAGES.js';
import CSS_SELECTORS from '../../js/constants/CSS_SELECTORS.js';
import SWIPER_CONFIG from '../../js/constants/SWIPER_CONFIG.js';
import GithubApi from '../../js/modules/GitubApi.js';
import GITHUB_API_CONFIG from '../../js/constants/GITHUB_API_CONFIG.js';
import CommitsSection from '../../js/components/CommitsSection.js';

/* --- Элементы --- */
const commitsContainer = document.querySelector(CSS_SELECTORS.commitsContainer);

/* --- Функции --- */
const initSwiper = () => {
  Swiper.use([Navigation, Pagination]);

  const mySwiper = new Swiper(CSS_SELECTORS.sliderContainer, SWIPER_CONFIG);

  mySwiper.init();
};

const renderCommitsSection = (commitsSection, githubApi) => {
  githubApi.getCommits()
    .then((commits) => {
      if (commits.length === 0) {
        commitsSection.renderFeedback(MESSAGES.nothingFound);
      } else {
        const urlToCommits = githubApi.getUrlToCommits();

        commitsSection.renderCommitsContent(commits, urlToCommits);
        initSwiper();
      }
    })
    .catch((error) => {
      console.log(error);
      commitsSection.renderFeedback(MESSAGES.commitsError);
    });
};

/* --- Экземпляры классов --- */
const commitsSection = new CommitsSection(commitsContainer);
const githubApi = new GithubApi(GITHUB_API_CONFIG);

/* --- Инициализация --- */
renderCommitsSection(commitsSection, githubApi);
