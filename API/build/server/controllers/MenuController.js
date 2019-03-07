"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _MenuService = _interopRequireDefault(require("../services/MenuService"));

var _MealsService = _interopRequireDefault(require("../services/MealsService"));

var _allHelpers = _interopRequireDefault(require("../helpers/allHelpers"));

var _JWT = _interopRequireDefault(require("../helpers/JWT"));

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
        var sentToken, jwt, meals, mealNO, errMes, i, mealExist, reqBody, addedMenu, err;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                sentToken = req.get('Authorization');

                if (!sentToken) {
                  _context.next = 33;
                  break;
                }

                _context.next = 4;
                return _JWT.default.verifyToken(sentToken);

              case 4:
                jwt = _context.sent;

                if (!(!jwt.tokenExp && jwt.decode.role === 'caterer')) {
                  _context.next = 30;
                  break;
                }

                meals = req.body.mealId;
                mealNO = false;
                errMes = [];

                if (!meals) {
                  _context.next = 19;
                  break;
                }

                i = 0;

              case 11:
                if (!(i < meals.length)) {
                  _context.next = 19;
                  break;
                }

                _context.next = 14;
                return _MealsService.default.getMealById(meals[i]);

              case 14:
                mealExist = _context.sent;

                if (mealExist.count === 0) {
                  mealNO = true;
                  errMes.push("meal id ".concat(meals[i], " is invalid."));
                }

              case 16:
                i += 1;
                _context.next = 11;
                break;

              case 19:
                if (!mealNO) {
                  _context.next = 23;
                  break;
                }

                res.status(404).send(errMes);
                _context.next = 28;
                break;

              case 23:
                reqBody = {
                  mealId: meals,
                  catererId: jwt.decode.data.id
                };
                _context.next = 26;
                return _MenuService.default.add(reqBody);

              case 26:
                addedMenu = _context.sent;

                if (addedMenu.errors) {
                  err = (0, _allHelpers.default)(addedMenu.errors);
                  res.status(400).send(err);
                } else if (addedMenu.name === 'SequelizeDatabaseError') {
                  res.status(400).send(['A meal id is invalid.']);
                } else {
                  res.status(201).send(addedMenu);
                }

              case 28:
                _context.next = 31;
                break;

              case 30:
                res.status(401).send(['Session expired. Login as a Caterer to add a Menu.']);

              case 31:
                _context.next = 34;
                break;

              case 33:
                res.status(401).send(['No Authorization header sent. Login and send a token.']);

              case 34:
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
        var sentToken, jwt, menu;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                sentToken = req.get('Authorization');

                if (!sentToken) {
                  _context2.next = 15;
                  break;
                }

                _context2.next = 4;
                return _JWT.default.verifyToken(sentToken);

              case 4:
                jwt = _context2.sent;

                if (jwt.tokenExp) {
                  _context2.next = 12;
                  break;
                }

                _context2.next = 8;
                return _MenuService.default.getAllMenus();

              case 8:
                menu = _context2.sent;

                if (menu.count === 0) {
                  res.status(200).send(['No menu available. Add one.']);
                } else {
                  res.status(200).send(menu);
                }

                _context2.next = 13;
                break;

              case 12:
                res.status(401).send(['Session expired. Login to view menus.']);

              case 13:
                _context2.next = 16;
                break;

              case 15:
                res.status(401).send(['No Authorization header sent. Login and send a token.']);

              case 16:
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