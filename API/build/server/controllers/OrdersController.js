"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _OrdersService = _interopRequireDefault(require("../services/OrdersService"));

var _allHelpers = _interopRequireDefault(require("../helpers/allHelpers"));

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

      if (mealId && customerId && catererId) {
        var milID = parseInt(mealId, 10);
        var custID = parseInt(customerId, 10);
        var catID = parseInt(catererId, 10);

        if (!_allHelpers.default.validID(milID)) {
          res.status(200).send({
            message: 'error',
            error: "meal id [".concat(mealId, "] is not valid.")
          });
        } else if (!_allHelpers.default.validID(custID)) {
          res.status(200).send({
            message: 'error',
            error: "customer id [".concat(customerId, "] is not valid.")
          });
        } else if (!_allHelpers.default.validID(catID)) {
          res.status(200).send({
            message: 'error',
            error: "caterer id [".concat(catererId, "] is not valid.")
          });
        } else {
          var addedOrder = ordersService.add(milID, custID, catID, Date.now());
          res.status(200).send({
            message: 'success',
            body: addedOrder
          });
        }
      } else if (!mealId && !customerId && !catererId) {
        res.status(200).send({
          message: 'error',
          error: 'No mealId, customerId and catererId was sent'
        });
      } else if (!mealId) {
        res.status(200).send({
          message: 'error',
          error: 'No mealId was sent!'
        });
      } else if (!customerId) {
        res.status(200).send({
          message: 'error',
          error: 'No customerId was sent!'
        });
      } else if (!catererId) {
        res.status(200).send({
          message: 'error',
          error: 'No catererId was sent!'
        });
      }
    }
  }, {
    key: "modifyOrder",
    value: function modifyOrder(req, res) {
      var mealID = req.body.mealId;
      var orderID = parseInt(req.params.id, 10);

      var orderIdNum = _allHelpers.default.validID(orderID);

      if (orderIdNum) {
        if (mealID) {
          var milId = parseInt(mealID, 10);

          if (!_allHelpers.default.validID(milId)) {
            res.status(200).send({
              message: 'error',
              error: 'invalid meal id'
            });
          } else {
            var orderIdExist = ordersService.orderIdExist(orderID);

            if (orderIdExist.exist) {
              var modifiedOrder = ordersService.modify(orderIdExist.index, milId);
              res.status(200).send({
                message: 'success',
                body: modifiedOrder
              });
            } else {
              res.status(200).send({
                message: 'error',
                error: "No order with the id [".concat(orderID, "]")
              });
            }
          }
        } else {
          res.status(200).send({
            message: 'error',
            error: 'no meal id was sent.'
          });
        }
      } else {
        res.status(200).send({
          message: 'error',
          error: 'Invalid Order id.'
        });
      }
    }
  }, {
    key: "getOrders",
    value: function getOrders(req, res) {
      var totalOrders = ordersService.totalOrders();

      if (totalOrders < 1) {
        res.status(200).send({
          message: 'error',
          error: 'No orders available.'
        });
      } else {
        var allOrders = ordersService.getAllOrders();
        res.status(200).send({
          message: 'success',
          body: allOrders
        });
      }
    }
  }]);

  return OrdersController;
}();

var _default = new OrdersController();

exports.default = _default;
//# sourceMappingURL=OrdersController.js.map