/* eslint-disable linebreak-style */
import { validID } from './allHelpers';

export default class MealsValidation {
  constructor() {
    this.error = false;
  }

  validateAddMeal(name, size, price, currency, catererId) {
    const invalid = {};
    if (!name && !size && !price && !currency && !catererId) {
      this.error = true;
      invalid.name = 'The name is required.';
      invalid.size = 'The size is required.';
      invalid.price = 'The price is required';
      invalid.currency = 'The currency is required.';
      invalid.catererId = 'Your catererId is required';
    } else {
      if (!name) {
        this.error = true;
        invalid.name = 'The name is required.';
      }
      if (name && validID(name)) {
        this.error = true;
        invalid.name = 'name must be string';
      }
      if (!size) {
        this.error = true;
        invalid.size = 'The size is required.';
      }
      if (size && validID(size)) {
        this.error = true;
        invalid.size = 'Invalid size.';
      }
      if (!price) {
        this.error = true;
        invalid.price = 'The price is required.';
      }
      if (price && !validID(price)) {
        this.error = true;
        invalid.price = 'Invalid price.';
      }
      if (!currency) {
        this.error = true;
        invalid.currency = 'The currecny is required.';
      }
      if (currency && typeof (currency) !== 'string') {
        this.error = true;
        invalid.currency = 'Invalid currency.';
      }

      if (!catererId) {
        this.error = true;
        invalid.catererId = 'Your catererId is required';
      }
      if (catererId && !validID(catererId)) {
        this.error = true;
        invalid.catererId = 'Invalid catererId.';
      }
    }
    return { error: this.error, invalid };
  }

  // eslint-disable-next-line class-methods-use-this
  validateModifyMeal(mealId, mealName, mealPrice) {
    const invalid = {};
    if (validID(mealId) === false) {
      this.error = true;
      invalid.mealId = 'Invalid mealId.';
      return { error: this.error, invalid };
    }

    if (!mealName && !mealPrice) {
      this.error = true;
      invalid.mealName = 'mealName is required.';
      invalid.mealPrice = 'mealPrice is required.';
      return { error: this.error, invalid };
    }

    return { error: this.error, invalid };
  }

  validateDeleteMeal(id) {
    const invalid = {};
    if (validID(id) === false) {
      this.error = true;
      invalid.mealId = 'Invalid mealId.';
      return { error: this.error, invalid };
    }
    return { error: this.error, invalid };
  }
}
