export default class Store {
  _storeName;

  constructor(storeName: string) {
    this._storeName = storeName;
  }

  putToStore(data: any):void {
    localStorage.setItem(this._storeName, data);
  }

  getFromStore():any {
    return localStorage.getItem(this._storeName);
  }

  clearStore(): void {
    localStorage.removeItem(this._storeName);
  }
}