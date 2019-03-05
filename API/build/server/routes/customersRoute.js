"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _CustomersController = _interopRequireDefault(require("../controllers/CustomersController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */
var Router = _express.default.Router();

Router.post('/customers/auth/login', _CustomersController.default.getCustomer);
Router.post('/customers/auth/signup', _CustomersController.default.addCustomer);
var _default = Router;
exports.default = _default;
//# sourceMappingURL=customersRoute.js.map