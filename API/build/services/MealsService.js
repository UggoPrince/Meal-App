"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Meals = _interopRequireDefault(require("../models/Meals"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MealService =
/*#__PURE__*/
function () {
  function MealService() {
    _classCallCheck(this, MealService);

    this.meals = [{
      id: 1,
      name: 'Jollof Rice',
      size: 'plates',
      price: '500',
      currency: 'NGN',
      caterer_id: '1'
    }, {
      id: 2,
      name: 'Bread and Beans',
      size: 'plates',
      price: '600',
      currency: 'NGN',
      caterer_id: '1'
    }, {
      id: 3,
      name: 'Dodo and Beans',
      size: 'plates',
      price: '500',
      currency: 'NGN',
      caterer_id: '12'
    }];
  }

  _createClass(MealService, [{
    key: "getAllMeals",
    value: function getAllMeals() {
      return this.meals.map(function (data) {
        var meal = new _Meals.default();
        meal.id = data.id;
        meal.name = data.name;
        meal.size = data.size;
        meal.price = data.price;
        meal.currency = data.currency;
        meal.caterer_id = data.caterer_id;
        return meal;
      });
    }
  }, {
    key: "getAll",
    value: function getAll() {
      return this.getAllMeals();
    }
  }, {
    key: "getMeal",
    value: function getMeal(id) {
      var meals = this.getAllMeals();
      var meal = '';

      for (var i = 0; i < meals.length; i += 1) {
        if (meals[i].id === id) {
          meal = meals[i];
          break;
        }
      }

      return meal;
    }
  }, {
    key: "mealExist",
    value: function mealExist(id) {
      for (var i = 0; i < this.meals.length; i += 1) {
        if (this.meals[i].id === id) return {
          true: true,
          index: i
        };
      }

      return {
        true: false,
        index: -1
      };
    }
  }, {
    key: "maxId",
    value: function maxId() {
      var max = this.meals[0].id;

      for (var j = 1; j < this.meals.length; j += 1) {
        if (max < this.meals[j].id) max = this.meals[j].id;
      }

      return max;
    }
  }, {
    key: "add",
    value: function add(name, size, price, currency, catererId) {
      var biggestID = this.maxId();
      var id = biggestID + 1;
      var meal = {
        id: id,
        name: name,
        size: size,
        price: price,
        currency: currency,
        caterer_id: catererId
      };
      this.meals.push(meal);
      return this.getMeal(id);
    }
  }, {
    key: "modify",
    value: function modify(index, name, price) {
      var meal = this.meals[index];
      if (name) meal.name = name;
      if (price) meal.price = price;
      this.meals[index] = meal;
      return this.getMeal(meal.id);
    }
  }, {
    key: "delete",
    value: function _delete(index) {
      var deletedMeal = this.meals.splice(index, 1);
      return deletedMeal[0];
    }
  }]);

  return MealService;
}();

var _default = MealService;
exports.default = _default;
//# sourceMappingURL=MealsService.js.map