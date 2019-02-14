/* eslint-disable linebreak-style */
/* eslint-disable no-console */

import Meals from '../models/Meals';

class MealService {
  constructor() {
    this.meals = [
      {
        id: 1,
        name: 'Jollof Rice',
        size: 'plates',
        price: '500',
        currency: 'NGN',
        caterer_id: '1',
      },
      {
        id: 2,
        name: 'Bread and Beans',
        size: 'plates',
        price: '600',
        currency: 'NGN',
        caterer_id: '5',
      },
      {
        id: 3,
        name: 'Dodo and Beans',
        size: 'plates',
        price: '500',
        currency: 'NGN',
        caterer_id: '12',
      },
    ];
  }

  getAllMeals() {
    return this.meals.map((data) => {
      const meal = new Meals();
      meal.id = data.id;
      meal.name = data.name;
      meal.size = data.size;
      meal.price = data.price;
      meal.currency = data.currency;
      meal.caterer_id = data.caterer_id;
      return meal;
    });
  }

  getAll() {
    return this.getAllMeals();
  }

  getMeal(id) {
    // -1 because we have our data in an array which starts with zero
    return this.getAllMeals()[id - 1];
  }

  add(name, size, price, currency, catererId) {
    const mealSNumber = this.meals.length;
    const id = mealSNumber + 1;
    const meal = {
      id,
      name,
      size,
      price,
      currency,
      caterer_id: catererId,
    };
    this.meals.push(meal);
    return this.getMeal(id);
  }
}

export default MealService;
