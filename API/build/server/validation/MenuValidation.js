"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _allHelpers = require("./allHelpers");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MenuValidation =
/*#__PURE__*/
function () {
  function MenuValidation() {
    _classCallCheck(this, MenuValidation);

    this.error = false;
    this.regEx = /^\d+$/ig;
  }

  _createClass(MenuValidation, [{
    key: "validateAddMenu",
    value: function validateAddMenu(mealId, catererId) {
      var invalid = {};

      if (!mealId && !catererId) {
        this.error = true;
        invalid.mealId = 'The mealId(s) is required.';
        invalid.catererId = 'Your catererId is required.';
        return {
          error: this.error,
          invalid: invalid
        };
      }

      if (!mealId) {
        this.error = true;
        invalid.mealId = 'The mealId(s) is required.';
        return {
          error: this.error,
          invalid: invalid
        };
      }

      if (!catererId) {
        this.error = true;
        invalid.catererId = 'Your catererId is required';
        return {
          error: this.error,
          invalid: invalid
        };
      }

      var menuOptValid = (0, _allHelpers.menuOptionValid)(mealId);

      if (menuOptValid.error) {
        this.error = true;
        invalid.mealId = menuOptValid.invalid;
      }

      if ((0, _allHelpers.validID)(catererId) === false) {
        this.error = true;
        invalid.catererId = "caterer id [".concat(catererId, "] is invalid.");
      }

      return {
        error: this.error,
        invalid: invalid
      };
    }
  }]);

  return MenuValidation;
}();

exports.default = MenuValidation;
//# sourceMappingURL=MenuValidation.js.map