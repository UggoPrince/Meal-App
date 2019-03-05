'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

let _index = require('../models/index');

let _MealsService = _interopRequireDefault(require('./MealsService'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { let self = this; var 
args = arguments; return new Promise(((resolve, reject) => { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); })); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _defineProperties(target, props) { for (let i = 0; i < props.length; i++) { let descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

let MenuService =
/* #__PURE__*/
(function () {
  function MenuService() {
    _classCallCheck(this, MenuService);

    this.menu = _index.menu;
  }

  _createClass(MenuService, [{
    key: "getAllMenus",
    value: function () {
      var _getAllMenus = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.menu.findAndCountAll();

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

      function getAllMenus() {
        return _getAllMenus.apply(this, arguments);
      }

      return getAllMenus;
    }()
  }, {
    key: "add",
    value: function () {
      var _add = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(menuData) {
        var result, meal, i;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return this.menu.create(menuData);

              case 3:
                result = _context2.sent;
                meal = [];
                i = 0;

              case 6:
                if (!(i < result.mealId.length)) {
                  _context2.next = 13;
                  break;
                }

                _context2.next = 9;
                return _MealsService.default.getMealById(result.mealId[i]);

              case 9:
                meal[i] = _context2.sent;

              case 10:
                i += 1;
                _context2.next = 6;
                break;

              case 13:
                return _context2.abrupt("return", [{
                  menu: result
                }, {
                  meals: meal
                }]);

              case 16:
                _context2.prev = 16;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", _context2.t0);

              case 19:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 16]]);
      }));

      function add(_x) {
        return _add.apply(this, arguments);
      }

      return add;
    }()
  }]);

  return MenuService;
}());

let _default = new MenuService();

exports.default = _default;
// # sourceMappingURL=MenuService.js.map
