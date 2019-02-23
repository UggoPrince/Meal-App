"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _mealsRoute = _interopRequireDefault(require("./server/routes/mealsRoute"));

var _menuRoute = _interopRequireDefault(require("./server/routes/menuRoute"));

var _ordersRoute = _interopRequireDefault(require("./server/routes/ordersRoute"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */

/* eslint-disable no-console */
_dotenv.default.config();

var app = (0, _express.default)();
var port = process.env.PORT || 4000;
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.json({
  type: 'application/json'
}));
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.get('/', function (req, res) {
  return res.status(200).send('<div>' + '<h1>Welcome to Meal-Booking-App</h1>' + '<h3>Below are the endpoints to access this API</h3>' + '<ul>' + '<li><p>GET /api/v1/meals<p></li>' + '<li><p>POST /api/v1/meals<p><span>With the follow keys: ' + '<b>name (string), size (string), price (integer), currency (string), catererId (integer).</b></span></li>' + '<li><p>PUT /api/v1/meals/id<p><span>With the following keys: <b>name, price.</b></span></li>' + '<li><p>DELETE /api/v1/meals/id<p></li>' + '<li><p>POST /api/v1/menu<p><span>With the following keys: ' + '<b>mealId(s) (integer) (one or more with same key name [mealId]), catererId (interger).</b></span></li>' + '<li><p>GET /api/v1/menu</p></li>' + '<li><p>POST /api/v1/orders</p><span>With the following keys: ' + '<b>mealId (integer), customerId (integer), catererId (integer)</b></span></li>' + '<li><p>PUT /api/v1/orders/id</p><span>With the following keys: ' + '<b>mealId (integer)</b></span></li>' + '<li><p>GET /api/v1/orders</p></li>' + '</ul>' + '</div>');
});
app.use('/api/v1', _mealsRoute.default);
app.use('/api/v1', _menuRoute.default);
app.use('/api/v1', _ordersRoute.default);
app.use(function (req, res) {
  res.status(404).json('Not Found');
});
app.listen(port); // , () => console.log(`Example app listening on port ${port}!`));

var _default = app;
exports.default = _default;
//# sourceMappingURL=index.js.map