export default class MapRepository {
  constructor() {
    this.map = {};
  }

  find(id) {
    return this.map[id];
  }

  update(value) {
    this.map[value.id_str] = value;
  }
}
