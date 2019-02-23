"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _MenuService = _interopRequireDefault(require("../services/MenuService"));

var _MenuValidation = _interopRequireDefault(require("../validation/MenuValidation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var menuService = new _MenuService.default();

var MenuController =
/*#__PURE__*/
function () {
  function MenuController() {
    _classCallCheck(this, MenuController);
  }

  _createClass(MenuController, [{
    key: "addMenu",
    value: function addMenu(req, res) {
      var _req$body = req.body,
          mealId = _req$body.mealId,
          catererId = _req$body.catererId;
      var mealNum = mealId;
      var menuValidation = new _MenuValidation.default();
      var validReqData = menuValidation.validateAddMenu(mealNum, catererId);

      if (!validReqData.error) {
        var addedMenu = menuService.add(mealId, catererId, Date.now());
        res.status(201).send({
          menu: addedMenu
        });
      } else {
        res.status(404).send({
          message: 'error',
          error: validReqData.invalid
        });
      }
    }
  }, {
    key: "getMenu",
    value: function getMenu(req, res) {
      var menuExist = menuService.menuExist();

      if (!menuExist) {
        res.status(200).send({
          message: 'success',
          body: 'No Menu in your account. Set up a Menu now with the following fields below.',
          fields: ' mealId(s) (one or meal id with the same key name [ mealId ]), and catererId (only one!)'
        });
      } else {
        res.status(200).send({
          menus: menuService.get()
        });
      }
    }
  }]);

  return MenuController;
}();

var _default = new MenuController();

exports.default = _default;
//# sourceMappingURL=MenuController.js.map