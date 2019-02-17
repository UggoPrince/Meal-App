"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Menu = _interopRequireDefault(require("../models/Menu"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MenuService =
/*#__PURE__*/
function () {
  function MenuService() {
    _classCallCheck(this, MenuService);

    this.menu = [];
  }

  _createClass(MenuService, [{
    key: "getAllMenus",
    value: function getAllMenus() {
      return this.menu.map(function (data) {
        var menus = new _Menu.default();
        menus.id = data.id;
        menus.meals = data.meals;
        menus.caterer_id = data.caterer_id;
        menus.created_at = data.created_at;
        return menus;
      });
    }
  }, {
    key: "menuExist",
    value: function menuExist() {
      if (this.menu.length === 0) {
        return false;
      }

      return true;
    }
  }, {
    key: "get",
    value: function get() {
      return this.getAllMenus();
    }
  }, {
    key: "add",
    value: function add(meals, catererID, date) {
      var totalMenus = this.menu.length;
      var id = totalMenus + 1;

      if (totalMenus < 1) {
        var i = totalMenus;
        this.menu[i] = {
          id: id,
          meals: meals,
          caterer_id: catererID,
          created_at: date
        };
      } else {
        var menus = this.getAllMenus();

        for (var _i = 0; _i < menus.length; _i += 1) {
          if (menus[_i].caterer_id === catererID) {
            var _m = {
              id: id,
              meals: meals,
              caterer_id: catererID,
              created_at: date
            };
            this.menu[_i] = _m;
            return this.getAllMenus()[id - 1];
          }
        }

        var m = {
          id: id,
          meals: meals,
          caterer_id: catererID,
          created_at: date
        };
        this.menu.push(m);
      }

      return this.getAllMenus()[id - 1]; // -1 because it's an array
    }
  }]);

  return MenuService;
}();

var _default = MenuService;
exports.default = _default;
//# sourceMappingURL=MenuService.js.map