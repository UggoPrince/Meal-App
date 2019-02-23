/* eslint-disable linebreak-style */
import { validID, menuOptionValid } from './allHelpers';

export default class MenuValidation {
  constructor() {
    this.error = false;
    this.regEx = /^\d+$/ig;
  }

  validateAddMenu(mealId, catererId) {
    const invalid = {};
    if (!mealId && !catererId) {
      this.error = true;
      invalid.mealId = 'The mealId(s) is required.';
      invalid.catererId = 'Your catererId is required.';
      return { error: this.error, invalid };
    }

    if (!mealId) {
      this.error = true;
      invalid.mealId = 'The mealId(s) is required.';
      return { error: this.error, invalid };
    }

    if (!catererId) {
      this.error = true;
      invalid.catererId = 'Your catererId is required';
      return { error: this.error, invalid };
    }

    const menuOptValid = menuOptionValid(mealId);
    if (menuOptValid.error) {
      this.error = true;
      invalid.mealId = menuOptValid.invalid;
    }

    if (validID(catererId) === false) {
      this.error = true;
      invalid.catererId = `caterer id [${catererId}] is invalid.`;
    }

    return { error: this.error, invalid };
  }
}
