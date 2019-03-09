"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Orders = _interopRequireDefault(require("../models/Orders"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var OrdersService =
/*#__PURE__*/
function () {
  function OrdersService() {
    _classCallCheck(this, OrdersService);

    this.orders = [];
  }

  _createClass(OrdersService, [{
    key: "getAllOrders",
    value: function getAllOrders() {
      return this.orders.map(function (data) {
        var order = new _Orders.default();
        order.id = data.id;
        order.meal_id = data.meal_id;
        order.customer_id = data.customer_id;
        order.caterer_id = data.caterer_id;
        order.created_at = data.created_at;
        return order;
      });
    }
  }, {
    key: "orderIdExist",
    value: function orderIdExist(orderID) {
      if (this.orders.length !== 0) {
        for (var i = 0; i < this.orders.length; i += 1) {
          if (this.orders[i].id === orderID) return {
            exist: true,
            index: i
          };
        }

        return {
          exist: false
        };
      }

      return {
        exist: false
      };
    }
  }, {
    key: "totalOrders",
    value: function totalOrders() {
      return this.orders.length;
    }
  }, {
    key: "add",
    value: function add(mealID, custID, catID, date) {
      var totalOrders = this.orders.length;
      var orderId = totalOrders + 1;
      var orderIndex = orderId - 1;
      var order = {
        id: orderId,
        meal_id: mealID,
        customer_id: custID,
        caterer_id: catID,
        created_id: date
      };
      this.orders.push(order);
      return this.getAllOrders()[orderIndex];
    }
  }, {
    key: "modify",
    value: function modify(index, mealId) {
      this.orders[index].meal_id = mealId;
      return this.getAllOrders()[index];
    }
  }]);

  return OrdersService;
}();

var _default = OrdersService;
exports.default = _default;
//# sourceMappingURL=OrdersService.js.map