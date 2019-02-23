"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _MealsService = _interopRequireDefault(require("../services/MealsService"));

var _MealsValidation = _interopRequireDefault(require("../validation/MealsValidation"));

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
          catererId = _req$body.catererId;
      var mealsValid = new _MealsValidation.default();
      var validReqData = mealsValid.validateAddMeal(name, size, price, currency, catererId);

      if (validReqData.error) {
        res.status(404).send({
          message: 'error',
          error: validReqData.invalid
        });
      } else {
        var addedMeal = mealsService.add(name, size, price, currency, catererId);
        res.status(201).send({
          message: 'success',
          meal: addedMeal
        });
      }
    }
  }, {
    key: "modifyMeal",
    value: function modifyMeal(req, res) {
      var mealId = req.params.id;
      var mealName = req.body.name;
      var mealPrice = req.body.price;
      var mealExist = mealsService.mealExist(parseInt(mealId, 10));
      var mealsValid = new _MealsValidation.default();
      var validReqData = mealsValid.validateModifyMeal(mealId, mealName, mealPrice);

      if (validReqData.error) {
        res.status(404).send({
          message: 'error',
          error: validReqData.invalid
        });
      } else if (mealExist.exist === false) {
        res.status(404).send({
          message: 'error',
          error: "No meal with mealId: ".concat(mealId, ".")
        });
      } else {
        var modifiedMeal = mealsService.modify(mealExist.index, mealName, mealPrice);
        res.status(201).send({
          message: 'success',
          body: modifiedMeal
        });
      }
    }
  }, {
    key: "deleteMeal",
    value: function deleteMeal(req, res) {
      var mealId = req.params.id;
      var mealExist = mealsService.mealExist(parseInt(mealId, 10));
      var mealsValid = new _MealsValidation.default();
      var validReqData = mealsValid.validateDeleteMeal(mealId);

      if (validReqData.error) {
        res.status(404).send({
          message: 'error',
          error: validReqData.invalid
        });
      } else if (mealExist.exist === false) {
        res.status(404).send({
          message: 'error',
          error: "No meal with mealId: ".concat(mealId, ".")
        });
      } else {
        var deletedMeal = mealsService.delete(mealExist.index);
        res.status(200).send({
          message: 'success',
          body: deletedMeal
        });
      }
    }
  }]);

  return MealsController;
}();

var _default = new MealsController();

exports.default = _default;
//# sourceMappingURL=MealsController.js.map