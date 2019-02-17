"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _MealsService = _interopRequireDefault(require("../services/MealsService"));

var _allHelpers = _interopRequireDefault(require("../helpers/allHelpers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var mealsService = new _MealsService.default();

var MealsController =
/*#__PURE__*/
function () {
  function MealsController() {
    _classCallCheck(this, MealsController);
  }

  _createClass(MealsController, [{
    key: "getMeals",
    value: function getMeals(req, res) {
      res.status(200).send(mealsService.getAll());
    }
  }, {
    key: "addMeal",
    value: function addMeal(req, res) {
      var _req$body = req.body,
          name = _req$body.name,
          size = _req$body.size,
          price = _req$body.price,
          currency = _req$body.currency,
          caterer = _req$body.caterer;

      if (!name && !size && !price && !currency && !caterer) {
        res.status(200).send({
          message: 'error',
          error: 'No meal was sent.'
        });
      } else if (!name) {
        res.status(200).send({
          message: 'error',
          error: 'No meal (name) was sent.'
        });
      } else if (!size) {
        res.status(200).send({
          message: 'error',
          error: 'No meal (size) was sent.'
        });
      } else if (!price) {
        res.status(200).send({
          message: 'error',
          error: 'No meal (price) was sent.'
        });
      } else if (!currency) {
        res.status(200).send({
          message: 'error',
          error: 'No meal (currency) was sent.'
        });
      } else if (!caterer) {
        res.status(200).send({
          message: 'error',
          error: 'No catererId (caterer) was sent.'
        });
      } else {
        var addedMeal = mealsService.add(name, size, price, currency, caterer);
        res.status(200).send({
          message: 'success',
          body: addedMeal
        });
      }
    }
  }, {
    key: "modifyMeal",
    value: function modifyMeal(req, res) {
      var mealId = parseInt(req.params.id, 10);
      var mealName = req.body.name;
      var mealPrice = req.body.price;
      var mealExist = mealsService.mealExist(mealId);

      if (_allHelpers.default.validID(mealId) && mealExist.true) {
        if (!_allHelpers.default.canModifyMeal(mealName, mealPrice)) {
          res.status(200).send({
            message: 'error',
            error: 'No data for the name and/or price update of meal was submitted'
          });
        } else {
          var modifiedMeal = mealsService.modify(mealExist.index, mealName, mealPrice);
          res.status(200).send({
            message: 'success',
            body: modifiedMeal
          });
        }
      } else {
        res.status(200).send({
          message: 'error',
          error: 'invalid ID'
        });
      }
    }
  }, {
    key: "deleteMeal",
    value: function deleteMeal(req, res) {
      var mealId = parseInt(req.params.id, 10);
      var mealExist = mealsService.mealExist(mealId);

      if (_allHelpers.default.validID(mealId) && mealExist.true) {
        var deletedMeal = mealsService.delete(mealExist.index);
        res.status(200).send({
          message: 'success',
          body: deletedMeal
        });
      } else {
        res.status(200).send({
          message: 'error',
          error: 'invalid ID'
        });
      }
    }
  }]);

  return MealsController;
}();

var _default = new MealsController();

exports.default = _default;
//# sourceMappingURL=MealsController.js.map