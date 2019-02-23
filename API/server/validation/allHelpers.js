/* eslint-disable linebreak-style */
/* eslint-disable no-restricted-globals */

export const validID = (id) => {
  if (isNaN(id)) {
    return false;
  }
  if (Math.sign(id) === -1) {
    return false;
  }
  return true;
};

export const menuOptionValid = (meals) => {
  let error = false;
  const invalid = {};

  if (typeof meals === 'string') {
    if (!validID(meals)) {
      error = true;
      invalid.mealId = `mealId ${meals} is invalid yes`;
    }
  }
  if (typeof meals === 'object') {
    const mNum = meals.length;
    for (let i = 0; i < mNum; i += 1) {
      if (!validID(meals[i])) {
        error = true;
        invalid[`mealId ${i + 1}`] = `mealId ${meals[i]} is invalid`;
      }
    }
  }
  if (error) return { error, invalid };
  return { error: false };
};
