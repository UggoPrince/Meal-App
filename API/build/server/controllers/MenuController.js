"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _MenuService = _interopRequireDefault(require("../services/MenuService"));

var _allHelpers = _interopRequireDefault(require("../helpers/allHelpers"));

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

      if (mealId && catererId) {
        var mealNum = mealId;
        var catID = parseInt(catererId, 10);

        var validMealId = _allHelpers.default.menuOptionValid(mealNum);

        if (validMealId.message === 'error') {
          res.status(200).send({
            message: 'error',
            error: "meal id [".concat(validMealId.error, "] is not valid.")
          });
        } else if (!_allHelpers.default.validID(catID)) {
          res.status(200).send({
            message: 'error',
            error: "caterer id [".concat(catererId, "] is not valid.")
          });
        } else {
          var addedMenu = menuService.add(mealNum, catID, Date.now());
          res.status(200).send({
            message: 'success',
            body: addedMenu
          });
        }
      } else if (!mealId && !catererId) {
        res.status(200).send({
          message: 'error',
          error: 'No meal id(s) (mealId) and caterer id (catererId) was sent'
        });
      } else if (!mealId) {
        res.status(200).send({
          message: 'error',
          error: 'No meal id(s) (mealId) was sent!'
        });
      } else if (!catererId) {
        res.status(200).send({
          message: 'error',
          error: 'No caterer id (catererId) was sent!'
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
          body: 'No Menu. Set up a Menu now.'
        });
      } else {
        res.status(200).send({
          message: 'success',
          body: menuService.get()
        });
      }
    }
  }]);

  return MenuController;
}();

var _default = new MenuController();

exports.default = _default;
//# sourceMappingURL=MenuController.js.map