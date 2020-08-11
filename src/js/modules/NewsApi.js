import Api from './Api.js';

class NewsApi extends Api {
  getNews(query, currentDate, dateSevenDaysBefore) {
    const options = {
      ...this._config.options,
      q: query,
      from: dateSevenDaysBefore,
      to: currentDate,
    };

    const formattedOptions = super.constructor.formatOptions(options);
    const url = `${this._config.baseUrl}/${this._config.endpoint}?${formattedOptions}`;

    return super.constructor.makeRequest(url);
  }
}

export default NewsApi;
