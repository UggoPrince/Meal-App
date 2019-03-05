"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Sequelizer = require("./Sequelizer");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Orders =
/*#__PURE__*/
function () {
  function Orders() {
    _classCallCheck(this, Orders);

    this.order = _Sequelizer.sequelize.define('orders', {
      id: {
        type: _Sequelizer.dataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
      }
    });
  }

  _createClass(Orders, [{
    key: "getOrder",
    value: function getOrder() {
      return this.order;
    }
  }, {
    key: "association",
    value: function association(model) {
      this.order.belongsTo(model, {
        foreignKey: {
          allowNull: false
        }
      });
    }
  }]);

  return Orders;
}();

var _default = new Orders();

exports.default = _default;
//# sourceMappingURL=Orders.js.map