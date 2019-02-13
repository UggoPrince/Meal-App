/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */

import Meals from '../models/Meals';

class MealService {
  getAllMeals() {
    this.meals = [
      {
        id: 1,
        name: 'Jollof Rice',
        size: 'plates',
        price: '500',
        currency: 'NGN',
      },
      {
        id: 2,
        name: 'Bread and Beans',
        size: 'plates',
        price: '600',
        currency: 'NGN',
      },
      {
        id: 3,
        name: 'Dodo and Beans',
        size: 'plates',
        price: '500',
        currency: 'NGN',
      },
    ];

    return this.meals.map((data) => {
      const meal = new Meals();
      meal.id = data.id;
      meal.name = data.name;
      meal.size = data.size;
      meal.price = data.price;
      meal.currency = data.currency;
      return meal;
    });
  }

  getAll() {
    return this.getAllMeals();
  }
}

export default MealService;
