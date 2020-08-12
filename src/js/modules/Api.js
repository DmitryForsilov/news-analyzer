class Api {
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

  static formatOptions(options) {
    const result = Object.entries(options)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    return result;
  }
}

export default Api;
