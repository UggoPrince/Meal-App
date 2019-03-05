"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _MealsController = _interopRequireDefault(require("../controllers/MealsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */
var Router = _express.default.Router();

Router.get('/meals', _MealsController.default.getMeals);
Router.post('/meals', _MealsController.default.addMeal);
Router.put('/meals/:id', _MealsController.default.modifyMeal);
Router.delete('/meals/:id', _MealsController.default.deleteMeal);
var _default = Router;
exports.default = _default;
//# sourceMappingURL=mealsRoute.js.map