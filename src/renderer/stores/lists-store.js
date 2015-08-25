import { EventEmitter } from 'events'

class ListsStore extends EventEmitter {
  constructor() {
    super();
    this.listsTable = {};
  }

  getLists() {
    return Object.keys(this.listsTable).map((key) => {
      return this.listsTable[key];
    }).sort((a, b) => {
      return a.name < b.name;
    });
  }

  mergeLists(lists) {
    lists.forEach((list) => {
      this.listsTable[list.id_str] = list;
    });
    this.emit('changed');
  }
}

export default new ListsStore();
