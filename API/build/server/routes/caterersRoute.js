"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _CaterersController = _interopRequireDefault(require("../controllers/CaterersController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */
var Router = _express.default.Router();

Router.post('/caterers/auth/login', _CaterersController.default.getCaterer);
Router.post('/caterers/auth/signup', _CaterersController.default.addCaterer);
var _default = Router;
exports.default = _default;
//# sourceMappingURL=caterersRoute.js.map