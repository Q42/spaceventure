var Inventory = {
  items: {
    'keycard': false
  },
  get: function (name) {
    Inventory.items[name] = true;
  },
  take: function (name) {
    return this.get(name);
  },
  drop: function (name) {
    Inventory.items[name] = false;
  },
  has: function (name) {
    return Inventory.items[name] === true;
  }
};