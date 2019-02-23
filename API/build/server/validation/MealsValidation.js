"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _allHelpers = require("./allHelpers");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MealsValidation =
/*#__PURE__*/
function () {
  function MealsValidation() {
    _classCallCheck(this, MealsValidation);

    this.error = false;
  }

  _createClass(MealsValidation, [{
    key: "validateAddMeal",
    value: function validateAddMeal(name, size, price, currency, catererId) {
      var invalid = {};

      if (!name && !size && !price && !currency && !catererId) {
        this.error = true;
        invalid.name = 'The name is required.';
        invalid.size = 'The size is required.';
        invalid.price = 'The price is required';
        invalid.currency = 'The currency is required.';
        invalid.catererId = 'Your catererId is required';
      } else {
        if (!name) {
          this.error = true;
          invalid.name = 'The name is required.';
        }

        if (name && (0, _allHelpers.validID)(name)) {
          this.error = true;
          invalid.name = 'name must be string';
        }

        if (!size) {
          this.error = true;
          invalid.size = 'The size is required.';
        }

        if (size && (0, _allHelpers.validID)(size)) {
          this.error = true;
          invalid.size = 'Invalid size.';
        }

        if (!price) {
          this.error = true;
          invalid.price = 'The price is required.';
        }

        if (price && !(0, _allHelpers.validID)(price)) {
          this.error = true;
          invalid.price = 'Invalid price.';
        }

        if (!currency) {
          this.error = true;
          invalid.currency = 'The currecny is required.';
        }

        if (currency && typeof currency !== 'string') {
          this.error = true;
          invalid.currency = 'Invalid currency.';
        }

        if (!catererId) {
          this.error = true;
          invalid.catererId = 'Your catererId is required';
        }

        if (catererId && !(0, _allHelpers.validID)(catererId)) {
          this.error = true;
          invalid.catererId = 'Invalid catererId.';
        }
      }

      return {
        error: this.error,
        invalid: invalid
      };
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "validateModifyMeal",
    value: function validateModifyMeal(mealId, mealName, mealPrice) {
      var invalid = {};

      if ((0, _allHelpers.validID)(mealId) === false) {
        this.error = true;
        invalid.mealId = 'Invalid mealId.';
        return {
          error: this.error,
          invalid: invalid
        };
      }

      if (!mealName && !mealPrice) {
        this.error = true;
        invalid.mealName = 'mealName is required.';
        invalid.mealPrice = 'mealPrice is required.';
        return {
          error: this.error,
          invalid: invalid
        };
      }

      return {
        error: this.error,
        invalid: invalid
      };
    }
  }, {
    key: "validateDeleteMeal",
    value: function validateDeleteMeal(id) {
      var invalid = {};

      if ((0, _allHelpers.validID)(id) === false) {
        this.error = true;
        invalid.mealId = 'Invalid mealId.';
        return {
          error: this.error,
          invalid: invalid
        };
      }

      return {
        error: this.error,
        invalid: invalid
      };
    }
  }]);

  return MealsValidation;
}();

exports.default = MealsValidation;
//# sourceMappingURL=MealsValidation.js.map