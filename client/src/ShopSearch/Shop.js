class Shop {
  constructor(data) {
    this.address = data.address || '';
    this.country = data.country || '';
    this.email = data.email || '';
    this.equipment1 = Shop.stringToBool(data.equipment1);
    this.equipment2 = Shop.stringToBool(data.equipment2);
    this.equipment3 = Shop.stringToBool(data.equipment3);
    this.equipment4 = Shop.stringToBool(data.equipment4);
    this.equipment5 = Shop.stringToBool(data.equipment5);
    this.future = data.future || '';
    this.mentions = parseInt(data.mentions, 10) || 0;
    this.relationship = parseInt(data.relationship, 10) || 0;
    this.shopname = data.shopname || '';
    this.size = data.size || '';
    this.type = parseInt(data.type, 10) || '';
    this.website = data.website || '';
  }

  static stringToBool(str) {
    if (typeof str === 'boolean') return str;
    return (str.toLowerCase() === 'true');
  }
}

export default Shop;
