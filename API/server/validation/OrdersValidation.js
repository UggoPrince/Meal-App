/* eslint-disable linebreak-style */
import { validID } from './allHelpers';

export default class OrdersValidtion {
  constructor() {
    this.error = false;
  }

  validateAddOrder(mealId, customerId, catererId) {
    const invalid = {};
    if (!mealId && !customerId && !catererId) {
      this.error = true;
      invalid.mealId = 'The mealId is required.';
      invalid.customerId = 'Your customerId is reqiured.';
      invalid.catererId = 'The catererId is required.';
    } else {
      if (!mealId) {
        this.error = true;
        invalid.mealId = 'The mealId is required.';
      }
      if (!customerId) {
        this.error = true;
        invalid.customerId = 'The customerId is required.';
      }
      if (!catererId) {
        this.error = true;
        invalid.catererId = 'The catererId is required.';
      }
    }

    if (!validID(mealId)) {
      this.error = true;
      invalid.mealId = 'Invalid mealId.';
    }
    if (!validID(customerId)) {
      this.error = true;
      invalid.customerId = 'Invalid customerId.';
    }
    if (!validID(catererId)) {
      this.error = true;
      invalid.catererId = 'Invalid catererId.';
    }
    return { error: this.error, invalid };
  }

  validateModifyOrder(mealId, orderId) {
    const invalid = {};
    if (!validID(orderId)) {
      this.error = true;
      invalid.mealId = 'Invalid orderId.';
    }
    if (!mealId) {
      this.error = true;
      invalid.mealId = 'The mealId is required.';
    }
    if (!validID(mealId)) {
      this.error = true;
      invalid.mealId = 'Invalid mealId.';
    }
    return { error: this.error, invalid };
  }
}
