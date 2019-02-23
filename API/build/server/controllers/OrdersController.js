"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _OrdersService = _interopRequireDefault(require("../services/OrdersService"));

var _OrdersValidation = _interopRequireDefault(require("../validation/OrdersValidation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ordersService = new _OrdersService.default();

var OrdersController =
/*#__PURE__*/
function () {
  function OrdersController() {
    _classCallCheck(this, OrdersController);
  }

  _createClass(OrdersController, [{
    key: "addOrder",
    value: function addOrder(req, res) {
      var _req$body = req.body,
          mealId = _req$body.mealId,
          customerId = _req$body.customerId,
          catererId = _req$body.catererId;
      var ordersValidation = new _OrdersValidation.default();
      var validReqData = ordersValidation.validateAddOrder(mealId, customerId, catererId);

      if (!validReqData.error) {
        var addedOrder = ordersService.add(mealId, customerId, catererId, Date.now());
        res.status(201).send({
          message: 'success',
          order: addedOrder
        });
      } else {
        res.status(404).send({
          message: 'error',
          error: validReqData.invalid
        });
      }
    }
  }, {
    key: "modifyOrder",
    value: function modifyOrder(req, res) {
      var mealID = req.body.mealId;
      var orderId = req.params.id;
      var ordersValidation = new _OrdersValidation.default();
      var validReqData = ordersValidation.validateModifyOrder(mealID, orderId);

      if (!validReqData.error) {
        var orderIdExist = ordersService.orderIdExist(parseInt(orderId, 10));

        if (orderIdExist.exist) {
          var modifiedOrder = ordersService.modify(orderIdExist.index, mealID);
          res.status(201).send({
            message: 'success',
            order: modifiedOrder
          });
        } else {
          res.status(404).send({
            message: 'error',
            error: "No order with the id [".concat(orderId, "]")
          });
        }
      } else {
        res.status(404).send({
          message: 'error',
          error: validReqData.invalid
        });
      }
    }
  }, {
    key: "getOrders",
    value: function getOrders(req, res) {
      var totalOrders = ordersService.totalOrders();

      if (totalOrders < 1) {
        res.status(200).send({
          message: 'success',
          error: 'No orders available. You can make one with the field below.',
          fields: 'mealId'
        });
      } else {
        var allOrders = ordersService.getAllOrders();
        res.status(200).send({
          message: 'success',
          orders: allOrders
        });
      }
    }
  }]);

  return OrdersController;
}();

var _default = new OrdersController();

exports.default = _default;
//# sourceMappingURL=OrdersController.js.map