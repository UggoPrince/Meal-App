"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _allHelpers = require("./allHelpers");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var OrdersValidtion =
/*#__PURE__*/
function () {
  function OrdersValidtion() {
    _classCallCheck(this, OrdersValidtion);

    this.error = false;
  }

  _createClass(OrdersValidtion, [{
    key: "validateAddOrder",
    value: function validateAddOrder(mealId, customerId, catererId) {
      var invalid = {};

      if (!mealId && !customerId && !catererId) {
        this.error = true;
        invalid.mealId = 'The mealId is required.';
        invalid.customerId = 'Your customerId is reqiured.';
        invalid.catererId = 'The catererId is required.';
      } else {
        if (!mealId) {
          this.error = true;
          invalid.mealId = 'The mealId is required.';
        }

        if (!customerId) {
          this.error = true;
          invalid.customerId = 'The customerId is required.';
        }

        if (!catererId) {
          this.error = true;
          invalid.catererId = 'The catererId is required.';
        }
      }

      if (!(0, _allHelpers.validID)(mealId)) {
        this.error = true;
        invalid.mealId = 'Invalid mealId.';
      }

      if (!(0, _allHelpers.validID)(customerId)) {
        this.error = true;
        invalid.customerId = 'Invalid customerId.';
      }

      if (!(0, _allHelpers.validID)(catererId)) {
        this.error = true;
        invalid.catererId = 'Invalid catererId.';
      }

      return {
        error: this.error,
        invalid: invalid
      };
    }
  }, {
    key: "validateModifyOrder",
    value: function validateModifyOrder(mealId, orderId) {
      var invalid = {};

      if (!(0, _allHelpers.validID)(orderId)) {
        this.error = true;
        invalid.mealId = 'Invalid orderId.';
      }

      if (!mealId) {
        this.error = true;
        invalid.mealId = 'The mealId is required.';
      }

      if (!(0, _allHelpers.validID)(mealId)) {
        this.error = true;
        invalid.mealId = 'Invalid mealId.';
      }

      return {
        error: this.error,
        invalid: invalid
      };
    }
  }]);

  return OrdersValidtion;
}();

exports.default = OrdersValidtion;
//# sourceMappingURL=OrdersValidation.js.map