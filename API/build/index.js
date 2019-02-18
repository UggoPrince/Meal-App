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
  return res.status(200).send('<div>' + '<h1>Welcome to Meal-Booking-App</h1>' + '<h3>Below are the endpoints to access this API</h3>' + '<ul>' + '<li>GET /api/v1/meals</li>' + '<li>POST /api/v1/meals</li>' + '<li>PUT /api/v1/meals/mealId</li>' + '<li>DELETE /api/v1/meals/mealId</li>' + '<li>POST /api/v1/menu</li>' + '<li>GET /api/v1/menu</li>' + '<li>POST /api/v1/orders</li>' + '<li>PUT /api/v1/orders</li>' + '<li>GET /api/v1/orders</li>' + '</ul>' + '</div>');
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