"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dataType = exports.sequelize = exports.seq = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv.default.config();

var Sequelizer =
/*#__PURE__*/
function () {
  function Sequelizer() {
    _classCallCheck(this, Sequelizer);

    this.sequel = new _sequelize.default('postgres://lcgmatquxeupai:586b19a0984f0fcaa10f440433cac7e7ad33cb66e5283a8e4815085d1c6dedea@ec2-174-129-236-21.compute-1.amazonaws.com:5432/dfietbbbsu1pub', {
      operatorsAliases: false
    });
    this.Sequelize = _sequelize.default;
  }

  _createClass(Sequelizer, [{
    key: "getSequelizer",
    value: function getSequelizer() {
      return this.sequel;
    }
  }, {
    key: "createTables",
    value: function () {
      var _createTables = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(truthy) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.sequel.sync({
                  force: truthy
                });

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createTables(_x) {
        return _createTables.apply(this, arguments);
      }

      return createTables;
    }()
  }]);

  return Sequelizer;
}();

var seq = new Sequelizer();
exports.seq = seq;
var sequelize = seq.getSequelizer();
exports.sequelize = sequelize;
var dataType = seq.Sequelize;
exports.dataType = dataType;
//# sourceMappingURL=Sequelizer.js.map