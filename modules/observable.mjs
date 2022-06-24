export default class Observable {
  _data;

  subscribers = [];

  constructor(initialData) {
    this._data = initialData;
  }

  subscribe(id, action) {
    this.subscribers = [...this.subscribers, { id, action }];
  }

  unsubscribe(id) {
    this.subscribers = this.subscribers.filter((s) => s.id !== id);
  }

  next(data) {
    this._data = data;
    this.subscribers.forEach((subscriber) => subscriber.action(this._data));
  }
}