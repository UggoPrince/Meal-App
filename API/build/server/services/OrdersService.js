"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = require("../models/index");

var _MealsService = _interopRequireDefault(require("./MealsService"));

var _CaterersService = _interopRequireDefault(require("./CaterersService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var OrdersService =
/*#__PURE__*/
function () {
  function OrdersService() {
    _classCallCheck(this, OrdersService);

    this.orders = _index.orders;
  }

  _createClass(OrdersService, [{
    key: "getAllOrders",
    value: function () {
      var _getAllOrders = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(id) {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.orders.findAndCountAll({
                  where: {
                    catererId: id
                  }
                });

              case 3:
                result = _context.sent;
                return _context.abrupt("return", result);

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", _context.t0);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 7]]);
      }));

      function getAllOrders(_x) {
        return _getAllOrders.apply(this, arguments);
      }

      return getAllOrders;
    }()
  }, {
    key: "getOrderByMealCust",
    value: function () {
      var _getOrderByMealCust = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(ID, mealID, custID) {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return this.orders.findAndCountAll({
                  where: {
                    id: ID,
                    mealId: mealID,
                    customerId: custID
                  }
                });

              case 3:
                result = _context2.sent;
                return _context2.abrupt("return", result);

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", _context2.t0);

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 7]]);
      }));

      function getOrderByMealCust(_x2, _x3, _x4) {
        return _getOrderByMealCust.apply(this, arguments);
      }

      return getOrderByMealCust;
    }()
    /* async orderIdExist(orderId) {
      try {
        const result = await this.orders.findAndCountAll({
          where: { id: orderId },
        });
        return result.count;
      } catch (error) {
        return error;
      }
    } */

  }, {
    key: "add",
    value: function () {
      var _add = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(orderData) {
        var result, meal, caterer;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return this.orders.create(orderData);

              case 3:
                result = _context3.sent;
                _context3.next = 6;
                return _MealsService.default.getMealById(result.mealId);

              case 6:
                meal = _context3.sent;
                _context3.next = 9;
                return _CaterersService.default.getCatererById(result.catererId);

              case 9:
                caterer = _context3.sent;
                return _context3.abrupt("return", [{
                  order: result
                }, {
                  meal: meal
                }, {
                  caterer: caterer
                }]);

              case 13:
                _context3.prev = 13;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", _context3.t0);

              case 16:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 13]]);
      }));

      function add(_x5) {
        return _add.apply(this, arguments);
      }

      return add;
    }()
  }, {
    key: "modify",
    value: function () {
      var _modify = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(ID, newMealId, custID) {
        var result;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return this.orders.update({
                  mealId: newMealId
                }, {
                  returning: true,
                  where: {
                    id: ID,
                    customerId: custID
                  }
                });

              case 3:
                result = _context4.sent;
                return _context4.abrupt("return", result);

              case 7:
                _context4.prev = 7;
                _context4.t0 = _context4["catch"](0);
                return _context4.abrupt("return", _context4.t0);

              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 7]]);
      }));

      function modify(_x6, _x7, _x8) {
        return _modify.apply(this, arguments);
      }

      return modify;
    }()
  }]);

  return OrdersService;
}();

var _default = new OrdersService();

exports.default = _default;
//# sourceMappingURL=OrdersService.js.map