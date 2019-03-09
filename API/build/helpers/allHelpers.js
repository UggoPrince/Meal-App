"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* eslint-disable linebreak-style */
var validID = function validID(id) {
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

var canModifyMeal = function canModifyMeal(name, price) {
  var ntrue = false;
  var ptrue = false;

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

var menuOptionValid = function menuOptionValid(mealNum) {
  var mNum = mealNum.length;

  for (var i = 0; i < mNum; i += 1) {
    var m = parseInt(mealNum[i], 10);

    if (!validID(m)) {
      return {
        message: 'error',
        error: mealNum[i]
      };
    }
  }

  return {
    message: 'success'
  };
};

var _default = {
  validID: validID,
  canModifyMeal: canModifyMeal,
  menuOptionValid: menuOptionValid
};
exports.default = _default;
//# sourceMappingURL=allHelpers.js.map