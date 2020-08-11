import Api from './Api.js';

class GithubApi extends Api {
  constructor(config) {
    super(config);

    this._baseUrl = this._config.baseUrl;
    this._reposPath = this._config.reposPath;
    this._owner = this._config.owner;
    this._repo = this._config.repo;
    this._commitsPath = this._config.commitsPath;
    this._options = this._config.options;
  }

  getCommits() {
    const formattedOptions = super.constructor.formatOptions(this._options);
    const url = `${this._baseUrl}/${this._reposPath}/${this._owner}/${this._repo}/${this._commitsPath}?${formattedOptions}`;

    return super.constructor.makeRequest(url);
  }

  getUrlToCommits() {
    const url = `https://github.com//${this._owner}/${this._repo}/${this._commitsPath}`;

    return url;
  }
}

export default GithubApi;
