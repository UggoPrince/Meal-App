"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testTables = exports.orders = exports.menu = exports.meals = exports.caterers = exports.customers = void 0;

var _Sequelizer = require("./Sequelizer");

var _Customers = _interopRequireDefault(require("./Customers"));

var _Caterers = _interopRequireDefault(require("./Caterers"));

var _Meals = _interopRequireDefault(require("./Meals"));

var _Menu = _interopRequireDefault(require("./Menu"));

var _Orders = _interopRequireDefault(require("./Orders"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */
var customers = _Customers.default.getCustomer();

exports.customers = customers;

var caterers = _Caterers.default.getCaterer();

exports.caterers = caterers;

var meals = _Meals.default.getMeal();

exports.meals = meals;

var menu = _Menu.default.getMenu();

exports.menu = menu;

var orders = _Orders.default.getOrder(); // create associations


exports.orders = orders;

_Customers.default.associationWithCaterer(caterers, 'CustomersCaterer');

_Caterers.default.associationWithCustomer(customers, 'CustomersCaterer');

_Meals.default.associationWithCaterer(caterers);

_Menu.default.associationWithCaterer(caterers);

_Orders.default.association(meals);

_Orders.default.association(customers);

_Orders.default.association(caterers);

var testTables = _Sequelizer.buildTables;
exports.testTables = testTables;
//# sourceMappingURL=index.js.map