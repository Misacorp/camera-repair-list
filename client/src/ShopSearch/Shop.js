class Shop {
  constructor(data) {
    this.shopname = data.shopname || '';
    this.address = data.address || '';
    this.country = data.country || '';
    this.email = data.email || '';
    this.website = Shop.parseWebsite(data.website) || '';
    this.phone = data.phone || '';

    this.equipment1 = Shop.stringIntToBool(data.equipment1);
    this.equipment2 = Shop.stringIntToBool(data.equipment2);
    this.equipment3 = Shop.stringIntToBool(data.equipment3);
    this.equipment4 = Shop.stringIntToBool(data.equipment4);
    this.equipment5 = Shop.stringIntToBool(data.equipment5);

    this.mentions = parseInt(data.mentions, 10) || 0;
    this.relationship = parseInt(data.relationship, 10) || 0;
    this.dataAccuracy = parseInt(data.dataaccuracy, 10) || 0;

    const newSize = parseInt(data.size, 10) - 1; // Range [1,4].
    this.size = Shop.fitToRange(newSize, 0, 3);
    this.future = Shop.fitToRange(parseInt(data.future, 10) - 1, 0, 4) || 0; // Range [1,5].
    this.type = Shop.fitToRange(parseInt(data.type, 10) - 1, 0, 2); // Range [1,3].
  }


  /**
   * Converts a string representation of an integer to a boolean.
   * Any integer value other than 0 will be true ex. "1", "99", "-5.67" = true
   * Zero or any non-numeric characters will be false ex. "0", "asd" = false
   */
  static stringIntToBool(str) {
    return !!+str;
  }


  /**
   * Apply a given value into a range. If it is out of the range, return -1.
   * @param {*} val Value to apply
   * @param {number} rangeStart Range start, inclusive
   * @param {number} rangeEnd Range end, inclusive
   */
  static fitToRange(val, rangeStart, rangeEnd) {
    let value = val;
    // Cast strings to int
    if (typeof val === 'string') value = parseInt(val, 10);
    // Return value if it is in the range.
    if (value >= rangeStart && value <= rangeEnd) return value;
    // Otherwise return 0.
    return -1;
  }


  /**
   * Parse website entries into a uniform format.
   * @param {string} site Website in an arbitrary form.
   * @returns {string} URL without protocol
   */
  static parseWebsite(site) {
    // Remove http:// or https://
    let url = site.replace(/(^\w+:|^)\/\//, '');
    // Remove any trailing slashes
    url = url.replace(/\/+$/, '');

    return url;
  }
}

export default Shop;
