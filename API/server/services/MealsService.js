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
    const meals = this.getAllMeals();
    let meal = '';
    for (let i = 0; i < meals.length; i += 1) {
      if (meals[i].id === id) {
        meal = meals[i];
        break;
      }
    }
    return meal;
  }

  mealExist(id) {
    for (let i = 0; i < this.meals.length; i += 1) {
      if (this.meals[i].id === id) return { true: true, index: i };
    }
    return { true: false, index: -1 };
  }

  maxId() {
    let max = this.meals[0].id;
    for (let j = 1; j < this.meals.length; j += 1) {
      if (max < this.meals[j].id) max = this.meals[j].id;
    }
    return max;
  }

  add(name, size, price, currency, catererId) {
    const biggestID = this.maxId();
    const id = biggestID + 1;
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

  modify(index, name, price) {
    const meal = this.meals[index];
    if (name) meal.name = name;
    if (price) meal.price = price;
    this.meals[index] = meal;
    return this.getMeal(meal.id);
  }

  delete(index) {
    const deletedMeal = this.meals.splice(index, 1);
    return deletedMeal[0];
  }
}

export default MealService;
