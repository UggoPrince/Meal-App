"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Sequelizer = require("./Sequelizer");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Caterers =
/*#__PURE__*/
function () {
  function Caterers() {
    _classCallCheck(this, Caterers);

    this.caterer = _Sequelizer.sequelize.define('caterer', {
      id: {
        type: _Sequelizer.dataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      firstname: {
        type: _Sequelizer.dataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'firstname is required.'
          }
        }
      },
      lastname: {
        type: _Sequelizer.dataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'lastname is required.'
          }
        }
      },
      restaurant: {
        type: _Sequelizer.dataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'restaurant is required.'
          }
        }
      },
      address: {
        type: _Sequelizer.dataType.STRING
      },
      phone: {
        type: _Sequelizer.dataType.STRING
      },
      email: {
        type: _Sequelizer.dataType.STRING,
        unique: {
          args: true,
          msg: 'This email is already registered. Login.'
        },
        allowNull: false,
        validate: {
          isEmail: {
            args: true,
            msg: 'Invalid email.'
          }
        }
      },
      password: {
        type: _Sequelizer.dataType.STRING,
        allowNull: false,
        validate: {
          is: {
            args: ['^[A-Za-z0-9@_]*$', 'i'],
            msg: 'Password must be leters, numbers, underscore and/or @ symbol.'
          },
          len: {
            args: [8, 20],
            msg: 'Password must be between 8 and 20 characters.'
          }
        }
      }
    });
  }

  _createClass(Caterers, [{
    key: "getCaterer",
    value: function getCaterer() {
      return this.caterer;
    }
  }, {
    key: "associationWithCustomer",
    value: function associationWithCustomer(model, newModel) {
      this.caterer.belongsToMany(model, {
        through: newModel
      });
    }
  }]);

  return Caterers;
}();

var _default = new Caterers();

exports.default = _default;
//# sourceMappingURL=Caterers.js.map