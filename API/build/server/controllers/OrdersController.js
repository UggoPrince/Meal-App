'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

let _OrdersService = _interopRequireDefault(require('../services/OrdersService'));

let _OrdersValidation = _interopRequireDefault(require('../validation/OrdersValidation'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { let self = this; var 
args = arguments; return new Promise(((resolve, reject) => { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); })); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _defineProperties(target, props) { for (let i = 0; i < props.length; i++) { let descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

let OrdersController =
/* #__PURE__*/
(function () {
  function OrdersController() {
    _classCallCheck(this, OrdersController);
  }

  _createClass(OrdersController, [{
    key: "addOrder",
    value: function () {
      var _addOrder = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var addedOrder, err;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _OrdersService.default.add(req.body);

              case 2:
                addedOrder = _context.sent;

                if (addedOrder.errors) {
                  err = (0, _allHelpers.default)(addedOrder.errors);
                  res.status(400).send(err);
                } else if (addedOrder.name === 'SequelizeDatabaseError') {
                  res.status(400).send(['An invalid id was sent.']);
                } else if (addedOrder.name === 'SequelizeForeignKeyConstraintError') {
                  res.status(404).send([addedOrder.original.detail]);
                } else {
                  res.status(201).send(addedOrder);
                }

              case 4:
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
        var modOrder, err;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _OrdersService.default.modify(req.body.mealId, req.params.id);

              case 2:
                modOrder = _context2.sent;

                if (modOrder.errors) {
                  err = (0, _allHelpers.default)(modOrder.errors);
                  res.status(400).send(err);
                } else if (modOrder.name === 'SequelizeDatabaseError') {
                  res.status(404).send(['Invalid mealId.']);
                } else if (modOrder[0] === 0) {
                  res.status(404).send(['Invalid orderId.']);
                } else {
                  res.status(200).send(modOrder);
                }

              case 4:
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
        var allOrders;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _OrdersService.default.getAllOrders();

              case 2:
                allOrders = _context3.sent;

                if (allOrders.count === 0) {
                  res.status(200).send(['No orders available.']);
                } else {
                  res.status(200).send(allOrders);
                }

              case 4:
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
}());

let _default = new OrdersController();

exports.default = _default;
// # sourceMappingURL=OrdersController.js.map
