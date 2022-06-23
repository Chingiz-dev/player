export default class Store {
  _storeName;

  constructor(storeName) {
    this._storeName = storeName;
  }

  putToStore(data){
    localStorage.setItem(this._storeName, data);
  }

  getFromStore(){
    return localStorage.getItem(this._storeName);
  }

  clearStore(){
    localStorage.removeItem(this._storeName);
  }
}