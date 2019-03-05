"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Sequelizer = require("./Sequelizer");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Meals =
/*#__PURE__*/
function () {
  function Meals() {
    _classCallCheck(this, Meals);

    this.meal = _Sequelizer.sequelize.define('meal', {
      id: {
        type: _Sequelizer.dataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: _Sequelizer.dataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'name is required.'
          }
        }
      },
      size: {
        type: _Sequelizer.dataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'size is required.'
          }
        }
      },
      price: {
        type: _Sequelizer.dataType.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: {
            args: true,
            msg: 'price must be numeric'
          },
          notEmpty: {
            msg: 'price is required.'
          }
        }
      },
      currency: {
        type: _Sequelizer.dataType.STRING,
        allowNull: false,
        validate: {
          isAlpha: {
            arg: true,
            msg: 'currency must be letters.'
          },
          notEmpty: {
            msg: 'currency is required.'
          }
        }
      }
    });
  }

  _createClass(Meals, [{
    key: "getMeal",
    value: function getMeal() {
      return this.meal;
    }
  }, {
    key: "associationWithCaterer",
    value: function associationWithCaterer(model) {
      this.meal.belongsTo(model, {
        foreignKey: {
          allowNull: false
        }
      });
    }
  }]);

  return Meals;
}();

var _default = new Meals();

exports.default = _default;
//# sourceMappingURL=Meals.js.map