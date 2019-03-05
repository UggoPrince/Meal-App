"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _MenuService = _interopRequireDefault(require("../services/MenuService"));

var _MealsService = _interopRequireDefault(require("../services/MealsService"));

var _allHelpers = _interopRequireDefault(require("../helpers/allHelpers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MenuController =
/*#__PURE__*/
function () {
  function MenuController() {
    _classCallCheck(this, MenuController);
  }

  _createClass(MenuController, [{
    key: "addMenu",
    value: function () {
      var _addMenu = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var meals, mealNO, errMes, i, mealExist, addedMenu, err;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                meals = req.body.mealId;
                mealNO = false;
                errMes = [];

                if (!meals) {
                  _context.next = 13;
                  break;
                }

                i = 0;

              case 5:
                if (!(i < meals.length)) {
                  _context.next = 13;
                  break;
                }

                _context.next = 8;
                return _MealsService.default.getMealById(meals[i]);

              case 8:
                mealExist = _context.sent;

                if (mealExist.count === 0) {
                  mealNO = true;
                  errMes.push("meal id ".concat(meals[i], " is invalid."));
                }

              case 10:
                i += 1;
                _context.next = 5;
                break;

              case 13:
                if (!mealNO) {
                  _context.next = 17;
                  break;
                }

                res.status(404).send(errMes);
                _context.next = 21;
                break;

              case 17:
                _context.next = 19;
                return _MenuService.default.add(req.body);

              case 19:
                addedMenu = _context.sent;

                if (addedMenu.errors) {
                  err = (0, _allHelpers.default)(addedMenu.errors);
                  res.status(400).send(err);
                } else if (addedMenu.name === 'SequelizeDatabaseError') {
                  res.status(400).send(['A meal id is invalid.']);
                } else if (addedMenu.name === 'SequelizeForeignKeyConstraintError') {
                  res.status(400).send([addedMenu.original.detail]);
                } else {
                  res.status(201).send(addedMenu);
                }

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function addMenu(_x, _x2) {
        return _addMenu.apply(this, arguments);
      }

      return addMenu;
    }()
  }, {
    key: "getMenu",
    value: function () {
      var _getMenu = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var menu;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _MenuService.default.getAllMenus();

              case 2:
                menu = _context2.sent;

                if (menu.count === 0) {
                  res.status(200).send(['No menu available. Add one.']);
                } else {
                  res.status(200).send(menu);
                }

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getMenu(_x3, _x4) {
        return _getMenu.apply(this, arguments);
      }

      return getMenu;
    }()
  }]);

  return MenuController;
}();

var _default = new MenuController();

exports.default = _default;
//# sourceMappingURL=MenuController.js.map