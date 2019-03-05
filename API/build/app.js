"use strict";

require("babel-polyfill");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _Sequelizer = require("./server/models/Sequelizer");

var _index = _interopRequireDefault(require("./server/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */

/* eslint-disable import/no-extraneous-dependencies */

/* eslint-disable no-console */
_dotenv.default.config();

var port = process.env.PORT || 4000;

_Sequelizer.seq.createTables(false).then(function () {
  _index.default.listen(port, function () {
    return console.log("App listening on port ".concat(port, "!"));
  });
});
//# sourceMappingURL=app.js.map