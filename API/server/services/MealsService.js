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

  getTotalMeals() {
    return this.meals.length;
  }

  modify(reqId, name, price) {
    const totalMeals = this.getTotalMeals();
    const id = parseInt(reqId, 10);
    if (id === 0) {
      return { message: 'error', error: 'invalid ID' };
    }
    if (id > totalMeals) {
      return { message: 'error', error: 'invalid ID' };
    }
    if (Number.isNaN(id)) {
      return { message: 'error', error: 'invalid ID' };
    }
    const meal = this.getMeal(id);
    let ntrue = false;
    let ptrue = false;

    if (name !== undefined && name.length !== 0) {
      meal.name = name;
    } else ntrue = true;

    if (price !== undefined && price.length !== 0) {
      meal.price = price;
    } else ptrue = true;

    if (ntrue && ptrue) {
      return { message: 'error', error: 'No data for the name and/or price update of meal was submitted' };
    }

    const mealid = id - 1; // because this.meals is an array
    this.updateMeal(mealid, meal);
    return { message: 'success', success: this.getMeal(id) };
  }

  updateMeal(mealId, meal) {
    this.meals[mealId] = meal;
  }
}

export default MealService;
