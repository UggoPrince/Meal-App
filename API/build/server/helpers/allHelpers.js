"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* eslint-disable linebreak-style */
var getErrorMessage = function getErrorMessage(errors) {
  var err = errors.map(function (data) {
    var error = data.message;
    return error;
  });
  return err;
};

var _default = getErrorMessage;
exports.default = _default;
//# sourceMappingURL=allHelpers.js.map