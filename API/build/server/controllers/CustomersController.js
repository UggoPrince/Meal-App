"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CustomersService = _interopRequireDefault(require("../services/CustomersService"));

var _allHelpers = _interopRequireDefault(require("../helpers/allHelpers"));

var _JWT = _interopRequireDefault(require("../helpers/JWT"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CustomersController =
/*#__PURE__*/
function () {
  function CustomersController() {
    _classCallCheck(this, CustomersController);
  }

  _createClass(CustomersController, [{
    key: "getCustomer",
    value: function () {
      var _getCustomer = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var cust, token;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _CustomersService.default.login(req.body);

              case 2:
                cust = _context.sent;

                if (cust.count === 0) {
                  res.status(404).send(['Invalid Customer email and/or password. Simply Register.']);
                } else {
                  token = _JWT.default.signToken({
                    data: cust.rows[0],
                    role: 'customer'
                  });
                  res.status(200).send({
                    token: token
                  });
                }

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getCustomer(_x, _x2) {
        return _getCustomer.apply(this, arguments);
      }

      return getCustomer;
    }()
  }, {
    key: "addCustomer",
    value: function () {
      var _addCustomer = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var cust, err, token;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _CustomersService.default.register(req.body);

              case 2:
                cust = _context2.sent;

                if (cust.errors) {
                  err = (0, _allHelpers.default)(cust.errors);
                  res.status(404).send(err);
                } else {
                  token = _JWT.default.signToken({
                    data: cust,
                    role: 'customer'
                  });
                  res.status(201).send({
                    token: token
                  });
                }

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function addCustomer(_x3, _x4) {
        return _addCustomer.apply(this, arguments);
      }

      return addCustomer;
    }()
  }]);

  return CustomersController;
}();

var _default = new CustomersController();

exports.default = _default;
//# sourceMappingURL=CustomersController.js.map