class DataStorage {
  constructor(storage) {
    this._storage = storage;
  }

  setItem(key, value) {
    this._storage.setItem(key, JSON.stringify(value));
  }

  getItem(key) {
    const data = this._storage.getItem(key);

    return JSON.parse(data);
  }
}

export default DataStorage;
