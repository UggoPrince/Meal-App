"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Sequelizer = require("./Sequelizer");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Menu =
/*#__PURE__*/
function () {
  function Menu() {
    _classCallCheck(this, Menu);

    this.menu = _Sequelizer.sequelize.define('menu', {
      id: {
        type: _Sequelizer.dataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      mealId: {
        type: _Sequelizer.dataType.ARRAY(_Sequelizer.dataType.INTEGER),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'At least on meal id should be provided,'
          }
        }
      }
    });
  }

  _createClass(Menu, [{
    key: "getMenu",
    value: function getMenu() {
      return this.menu;
    }
  }, {
    key: "associationWithCaterer",
    value: function associationWithCaterer(model) {
      this.menu.belongsTo(model, {
        foreignKey: {
          allowNull: false
        }
      });
    }
  }]);

  return Menu;
}();

var _default = new Menu();

exports.default = _default;
//# sourceMappingURL=Menu.js.map