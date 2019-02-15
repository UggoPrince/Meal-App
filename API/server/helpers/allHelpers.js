/* eslint-disable linebreak-style */
const validID = (id) => {
  if (id === 0) {
    return false;
  }
  if (Number.isNaN(id)) {
    return false;
  }
  if (Math.sign(id) === -1) {
    return false;
  }
  return true;
};

const canModifyMeal = (name, price) => {
  let ntrue = false;
  let ptrue = false;
  if (name === undefined || name.length === 0) {
    ntrue = true;
  }
  if (price === undefined || price.length === 0) {
    ptrue = true;
  }

  if (ntrue && ptrue) {
    return false;
  }
  return true;
};

export default { validID, canModifyMeal };