"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _OrdersController = _interopRequireDefault(require("../controllers/OrdersController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */
var Router = _express.default.Router();

Router.post('/orders', _OrdersController.default.addOrder);
Router.put('/orders/:id', _OrdersController.default.modifyOrder);
Router.get('/orders', _OrdersController.default.getOrders);
var _default = Router;
exports.default = _default;
//# sourceMappingURL=ordersRoute.js.map