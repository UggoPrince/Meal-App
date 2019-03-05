"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = require("../models/index");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MealService =
/*#__PURE__*/
function () {
  function MealService() {
    _classCallCheck(this, MealService);

    this.meals = _index.meals;
  }

  _createClass(MealService, [{
    key: "getAllMeals",
    value: function () {
      var _getAllMeals = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.meals.findAndCountAll();

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

      function getAllMeals() {
        return _getAllMeals.apply(this, arguments);
      }

      return getAllMeals;
    }()
  }, {
    key: "getMealById",
    value: function () {
      var _getMealById = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(mealId) {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return this.meals.findAndCountAll({
                  where: {
                    id: mealId
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

      function getMealById(_x) {
        return _getMealById.apply(this, arguments);
      }

      return getMealById;
    }()
  }, {
    key: "add",
    value: function () {
      var _add = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(mealData) {
        var result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return this.meals.create(mealData);

              case 3:
                result = _context3.sent;
                return _context3.abrupt("return", result);

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", _context3.t0);

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 7]]);
      }));

      function add(_x2) {
        return _add.apply(this, arguments);
      }

      return add;
    }()
  }, {
    key: "modify",
    value: function () {
      var _modify = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(mealData, mealId) {
        var result;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return this.meals.update(mealData, {
                  returning: true,
                  where: {
                    id: mealId
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

      function modify(_x3, _x4) {
        return _modify.apply(this, arguments);
      }

      return modify;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(mealId) {
        var m;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return this.meals.destroy({
                  where: {
                    id: mealId
                  }
                });

              case 3:
                m = _context5.sent;
                return _context5.abrupt("return", m);

              case 7:
                _context5.prev = 7;
                _context5.t0 = _context5["catch"](0);
                return _context5.abrupt("return", _context5.t0);

              case 10:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 7]]);
      }));

      function _delete(_x5) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }]);

  return MealService;
}();

var _default = new MealService();

exports.default = _default;
//# sourceMappingURL=MealsService.js.map