export default {
  baseUrl: NODE_ENV === 'development' // eslint-disable-line no-undef
    ? 'https://newsapi.org'
    : 'https://nomoreparties.co', // 'https://praktikum.tk/news'
  endpoint: 'v2/everything',
  options: {
    apiKey: '26a8a91802054a24bd726b2f2c9765c6',
    language: 'ru',
    pageSize: 100,
    sortBy: 'publishedAt',
  },
};
