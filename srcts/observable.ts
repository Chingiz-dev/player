export default class Observable {
  _data;

  subscribers: any[] = [];

  constructor(initialData: any) {
    this._data = initialData;
  }

  subscribe(id: number, action: Function) {
    this.subscribers = [...this.subscribers, { id, action }];
  }

  unsubscribe(id: number) {
    this.subscribers = this.subscribers.filter((s) => s.id !== id);
  }

  next(data: any) {
    this._data = data;
    this.subscribers.forEach((subscriber) => subscriber.action(this._data));
  }
}