"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _MealsService = _interopRequireDefault(require("../services/MealsService"));

var _allHelpers = _interopRequireDefault(require("../helpers/allHelpers"));

var _JWT = _interopRequireDefault(require("../helpers/JWT"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MealsController =
/*#__PURE__*/
function () {
  function MealsController() {
    _classCallCheck(this, MealsController);
  }

  _createClass(MealsController, [{
    key: "getMeals",
    value: function () {
      var _getMeals = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var sentToken, jwt, meals;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                sentToken = req.get('Authorization');

                if (!sentToken) {
                  _context.next = 15;
                  break;
                }

                _context.next = 4;
                return _JWT.default.verifyToken(sentToken);

              case 4:
                jwt = _context.sent;

                if (!(!jwt.tokenExp && jwt.decode.role === 'caterer')) {
                  _context.next = 12;
                  break;
                }

                _context.next = 8;
                return _MealsService.default.getAllMeals();

              case 8:
                meals = _context.sent;

                if (meals.count === 0) {
                  res.status(200).send(['No meals yets. Add a meal.']);
                } else {
                  res.status(200).send(meals);
                }

                _context.next = 13;
                break;

              case 12:
                res.status(401).send(['Session expired. Login as a Caterer to get meals.']);

              case 13:
                _context.next = 16;
                break;

              case 15:
                res.status(401).send(['No Authorization header sent. Login and send a token.']);

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getMeals(_x, _x2) {
        return _getMeals.apply(this, arguments);
      }

      return getMeals;
    }()
  }, {
    key: "addMeal",
    value: function () {
      var _addMeal = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var sentToken, jwt, reqBody, addedMeal, err;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                sentToken = req.get('Authorization');

                if (!sentToken) {
                  _context2.next = 16;
                  break;
                }

                _context2.next = 4;
                return _JWT.default.verifyToken(sentToken);

              case 4:
                jwt = _context2.sent;

                if (!(!jwt.tokenExp && jwt.decode.role === 'caterer')) {
                  _context2.next = 13;
                  break;
                }

                reqBody = {
                  name: req.body.name,
                  size: req.body.size,
                  price: req.body.price,
                  currency: req.body.currency,
                  catererId: jwt.decode.data.id
                };
                _context2.next = 9;
                return _MealsService.default.add(reqBody);

              case 9:
                addedMeal = _context2.sent;

                if (addedMeal.errors) {
                  err = (0, _allHelpers.default)(addedMeal.errors);
                  res.status(400).send(err);
                } else {
                  res.status(201).send(addedMeal);
                }

                _context2.next = 14;
                break;

              case 13:
                res.status(401).send(['Session expired. Login as a Caterer to add meals.']);

              case 14:
                _context2.next = 17;
                break;

              case 16:
                res.status(401).send(['No Authorization header sent. Login and send a token.']);

              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function addMeal(_x3, _x4) {
        return _addMeal.apply(this, arguments);
      }

      return addMeal;
    }()
  }, {
    key: "modifyMeal",
    value: function () {
      var _modifyMeal = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var sentToken, jwt, mealId, modMeal, err;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                sentToken = req.get('Authorization');

                if (!sentToken) {
                  _context3.next = 16;
                  break;
                }

                _context3.next = 4;
                return _JWT.default.verifyToken(sentToken);

              case 4:
                jwt = _context3.sent;

                if (!(!jwt.tokenExp && jwt.decode.role === 'caterer')) {
                  _context3.next = 13;
                  break;
                }

                mealId = req.params.id;
                _context3.next = 9;
                return _MealsService.default.modify(req.body, mealId);

              case 9:
                modMeal = _context3.sent;

                if (modMeal[0] === 0 || modMeal.name === 'SequelizeDatabaseError') {
                  res.status(404).send(['Invalid meal id.']);
                } else if (modMeal.errors) {
                  err = (0, _allHelpers.default)(modMeal.errors);
                  res.status(400).send(err);
                } else {
                  res.status(200).send(modMeal);
                }

                _context3.next = 14;
                break;

              case 13:
                res.status(401).send(['Session expired. Login as a Caterer to update meals.']);

              case 14:
                _context3.next = 17;
                break;

              case 16:
                res.status(401).send(['No Authorization header sent. Login and send a token.']);

              case 17:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function modifyMeal(_x5, _x6) {
        return _modifyMeal.apply(this, arguments);
      }

      return modifyMeal;
    }()
  }, {
    key: "deleteMeal",
    value: function () {
      var _deleteMeal = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res) {
        var sentToken, jwt, mealId, delMeal;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                sentToken = req.get('Authorization');

                if (!sentToken) {
                  _context4.next = 16;
                  break;
                }

                _context4.next = 4;
                return _JWT.default.verifyToken(sentToken);

              case 4:
                jwt = _context4.sent;

                if (!(!jwt.tokenExp && jwt.decode.role === 'caterer')) {
                  _context4.next = 13;
                  break;
                }

                mealId = req.params.id;
                _context4.next = 9;
                return _MealsService.default.delete(mealId);

              case 9:
                delMeal = _context4.sent;

                if (delMeal.name === 'SequelizeDatabaseError' || delMeal === 0) {
                  res.status(404).send(['Invalid meal id.']);
                } else {
                  res.status(200).send(['Meal successfully deleted.']);
                }

                _context4.next = 14;
                break;

              case 13:
                res.status(401).send(['Session expired. Login as Caterer to update meals.']);

              case 14:
                _context4.next = 17;
                break;

              case 16:
                res.status(401).send(['No Authorization header sent. Login and send a token.']);

              case 17:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function deleteMeal(_x7, _x8) {
        return _deleteMeal.apply(this, arguments);
      }

      return deleteMeal;
    }()
  }]);

  return MealsController;
}();

var _default = new MealsController();

exports.default = _default;
//# sourceMappingURL=MealsController.js.map