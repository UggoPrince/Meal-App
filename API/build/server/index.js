"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _mealsRoute = _interopRequireDefault(require("./routes/mealsRoute"));

var _menuRoute = _interopRequireDefault(require("./routes/menuRoute"));

var _ordersRoute = _interopRequireDefault(require("./routes/ordersRoute"));

var _customersRoute = _interopRequireDefault(require("./routes/customersRoute"));

var _caterersRoute = _interopRequireDefault(require("./routes/caterersRoute"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */

/* eslint-disable no-console */
_dotenv.default.config();

var app = (0, _express.default)();
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.json({
  type: 'application/json'
}));
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.get('/', function (req, res) {
  return res.status(200).send('<div>' + '<h1>Welcome to Meal-Booking-App api</h1>' + '<h3>Follow this <a href="https://app.swaggerhub.com/apis-docs/uggo/meal-booking-api/1.0.0" target="blank" style="text-decoration:none;color:#2581DC;">Documentation</a> to consume this API.</h3>' + '</div>');
});
app.use('/api/v1', _customersRoute.default);
app.use('/api/v1', _caterersRoute.default);
app.use('/api/v1', _mealsRoute.default);
app.use('/api/v1', _menuRoute.default);
app.use('/api/v1', _ordersRoute.default);
app.use(function (req, res) {
  res.status(404).json('Not Found');
});
var _default = app;
exports.default = _default;
//# sourceMappingURL=index.js.map