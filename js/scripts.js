var Board = {
  createCat: function (catName) {
    var category = Object.create(Category);
    category.initializeCat(catName);
    category.purchases = [];
    return category
  },
  initializeCat: function(catName) {
    this.catName = catName
    this.allCategories.push(catName);
    return this.catName;
  }
}

var Cell = {
  create: function(itemName, itemCost) {
    var purchase = Object.create(Purchase);
    purchase.initialize(itemName, itemCost);
    return purchase;
  },
  initialize: function(itemName, itemCost) {
    this.itemName = itemName;
    this.itemCost = itemCost;
    //this.itemsArray = [];
    return this.purchase
  },

  itemDisplay: function() {
    return this.itemName + " - $" + parseInt(this.itemCost).toFixed(2);
  }
};


