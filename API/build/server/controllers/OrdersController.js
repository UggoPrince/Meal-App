"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _OrdersService = _interopRequireDefault(require("../services/OrdersService"));

var _MealsService = _interopRequireDefault(require("../services/MealsService"));

var _JWT = _interopRequireDefault(require("../helpers/JWT"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var OrdersController =
/*#__PURE__*/
function () {
  function OrdersController() {
    _classCallCheck(this, OrdersController);
  }

  _createClass(OrdersController, [{
    key: "addOrder",
    value: function () {
      var _addOrder = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var sentToken, jwt, mealID, meal, catId, reqBody, addedOrder;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                sentToken = req.get('Authorization');

                if (!sentToken) {
                  _context.next = 25;
                  break;
                }

                _context.next = 4;
                return _JWT.default.verifyToken(sentToken);

              case 4:
                jwt = _context.sent;

                if (!(!jwt.tokenExp && jwt.decode.role === 'customer')) {
                  _context.next = 22;
                  break;
                }

                mealID = req.body.mealId;
                _context.next = 9;
                return _MealsService.default.getMealById(mealID);

              case 9:
                meal = _context.sent;

                if (!(meal.count === 0 || meal.name === 'SequelizeDatabaseError')) {
                  _context.next = 14;
                  break;
                }

                res.status(404).send(["No meal with mealId ".concat(mealID, ".")]);
                _context.next = 20;
                break;

              case 14:
                catId = meal.rows[0].catererId;
                reqBody = {
                  mealId: mealID,
                  catererId: catId,
                  customerId: jwt.decode.data.id
                };
                _context.next = 18;
                return _OrdersService.default.add(reqBody);

              case 18:
                addedOrder = _context.sent;
                res.status(201).send(addedOrder);

              case 20:
                _context.next = 23;
                break;

              case 22:
                res.status(401).send(['Session expired. Login as a Customer to make an orders.']);

              case 23:
                _context.next = 26;
                break;

              case 25:
                res.status(401).send(['No Authorization header sent. Login as a Customer and send a token.']);

              case 26:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function addOrder(_x, _x2) {
        return _addOrder.apply(this, arguments);
      }

      return addOrder;
    }()
  }, {
    key: "modifyOrder",
    value: function () {
      var _modifyOrder = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var sentToken, jwt, orderID, mealID, modOrder;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                sentToken = req.get('Authorization');

                if (!sentToken) {
                  _context2.next = 17;
                  break;
                }

                _context2.next = 4;
                return _JWT.default.verifyToken(sentToken);

              case 4:
                jwt = _context2.sent;

                if (!(!jwt.tokenExp && jwt.decode.role === 'customer')) {
                  _context2.next = 14;
                  break;
                }

                orderID = req.params.id;
                mealID = req.body.mealId;
                _context2.next = 10;
                return _OrdersService.default.modify(orderID, mealID, jwt.decode.data.id);

              case 10:
                modOrder = _context2.sent;

                if (modOrder[0] === 0) {
                  res.status(404).send(['Invalid orderId.']);
                } else if (modOrder.name === 'SequelizeDatabaseError') {
                  res.status(404).send(['Invalid mealId/orderId.']);
                } else {
                  res.status(200).send(modOrder);
                }

                _context2.next = 15;
                break;

              case 14:
                res.status(401).send(['Session expired. Login as a Customer to modify your orders.']);

              case 15:
                _context2.next = 18;
                break;

              case 17:
                res.status(401).send(['No Authorization header sent. Login as a Customer and send a token.']);

              case 18:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function modifyOrder(_x3, _x4) {
        return _modifyOrder.apply(this, arguments);
      }

      return modifyOrder;
    }()
  }, {
    key: "getOrders",
    value: function () {
      var _getOrders = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var sentToken, jwt, allOrders;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                sentToken = req.get('Authorization');

                if (!sentToken) {
                  _context3.next = 15;
                  break;
                }

                _context3.next = 4;
                return _JWT.default.verifyToken(sentToken);

              case 4:
                jwt = _context3.sent;

                if (!(!jwt.tokenExp && jwt.decode.role === 'caterer')) {
                  _context3.next = 12;
                  break;
                }

                _context3.next = 8;
                return _OrdersService.default.getAllOrders(jwt.decode.data.id);

              case 8:
                allOrders = _context3.sent;

                if (allOrders.count === 0) {
                  res.status(200).send(['Your Customers have made no order(s).']);
                } else {
                  res.status(200).send(allOrders);
                }

                _context3.next = 13;
                break;

              case 12:
                res.status(401).send(['Session expired. Login as a Caterer to view orders.']);

              case 13:
                _context3.next = 16;
                break;

              case 15:
                res.status(401).send(['No Authorization header sent. Login as a Caterer and send a token.']);

              case 16:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getOrders(_x5, _x6) {
        return _getOrders.apply(this, arguments);
      }

      return getOrders;
    }()
  }]);

  return OrdersController;
}();

var _default = new OrdersController();

exports.default = _default;
//# sourceMappingURL=OrdersController.js.map