import 'swiper/swiper-bundle.css';
import './about.css';
import Swiper, { Navigation, Pagination } from 'swiper';
import MESSAGES from '../../js/constants/MESSAGES.js';
import CSS_SELECTORS from '../../js/constants/CSS_SELECTORS.js';
import SWIPER_CONFIG from '../../js/constants/SWIPER_CONFIG.js';
import GithubApi from '../../js/modules/GitubApi.js';
import GITHUB_API_CONFIG from '../../js/constants/GITHUB_API_CONFIG.js';
import CommitsSection from '../../js/components/CommitsSection.js';

/* --- dom elements --- */
const commitsContainer = document.querySelector(CSS_SELECTORS.commitsContainer);

/* --- Functions --- */
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

/* --- instances --- */
const commitsSection = new CommitsSection(commitsContainer);
const githubApi = new GithubApi(GITHUB_API_CONFIG);

/* --- init --- */
renderCommitsSection(commitsSection, githubApi);
