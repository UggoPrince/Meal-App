"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.menuOptionValid = exports.validID = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* eslint-disable linebreak-style */

/* eslint-disable no-restricted-globals */
var validID = function validID(id) {
  if (isNaN(id)) {
    return false;
  }

  if (Math.sign(id) === -1) {
    return false;
  }

  return true;
};

exports.validID = validID;

var menuOptionValid = function menuOptionValid(meals) {
  var error = false;
  var invalid = {};

  if (typeof meals === 'string') {
    if (!validID(meals)) {
      error = true;
      invalid.mealId = "mealId ".concat(meals, " is invalid yes");
    }
  }

  if (_typeof(meals) === 'object') {
    var mNum = meals.length;

    for (var i = 0; i < mNum; i += 1) {
      if (!validID(meals[i])) {
        error = true;
        invalid["mealId ".concat(i + 1)] = "mealId ".concat(meals[i], " is invalid");
      }
    }
  }

  if (error) return {
    error: error,
    invalid: invalid
  };
  return {
    error: false
  };
};

exports.menuOptionValid = menuOptionValid;
//# sourceMappingURL=allHelpers.js.map