"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _MenuController = _interopRequireDefault(require("../controllers/MenuController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */

/* eslint-disable no-console */
var Router = _express.default.Router();

Router.post('/menu', _MenuController.default.addMenu);
Router.get('/menu', _MenuController.default.getMenu);
var _default = Router;
exports.default = _default;
//# sourceMappingURL=menuRoute.js.map