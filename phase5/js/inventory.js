var Inventory = {
  items: {
    lint: {
      nouns: ["pocket lint", "lint"],
      has: true
    },
    keycard: {
      nouns: ["keycard", "card", "key"],
      has: false
    },
    buckazoid: {
      nouns: ["buckazoid", "buckazoids", "buck", "bucks", "money", "dollar", "dollars", "cash", "coin", "coins", "money"],
      has: false
    }
  },
  get: function (name) {
    Inventory.items[name].has = true;
  },
  take: function (name) {
    return this.get(name);
  },
  drop: function (name) {
    Inventory.items[name].has = false;
  },
  has: function (name) {
    return Inventory.items[name].has === true;
  }
};