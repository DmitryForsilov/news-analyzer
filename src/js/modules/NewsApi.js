class NewsApi {
  constructor(config) {
    this._config = config;
  }

  static async makeRequest(url) {
    const response = await fetch(url);

    if (response.ok) {
      return response.json();
    }

    return Promise.reject(Error(`Error: ${response.status} ${response.statusText}`));
  }

  getNews(query, currentDate, dateSevenDaysBefore) {
    const options = {
      ...this._config.options,
      q: query,
      from: dateSevenDaysBefore,
      to: currentDate,
    };

    const preparedOptions = Object.entries(options)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    const url = `${this._config.baseUrl}/${this._config.endpoint}?${preparedOptions}`;

    return this.constructor.makeRequest(url);
  }
}

export default NewsApi;
