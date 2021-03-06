"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var api = require('../api');

function queues(config) {
  return {
    register: function register(initialParams) {
      var url = "".concat(config.apiURL, "/register");

      var params = _objectSpread({}, initialParams);

      if (params.event_types) {
        params.event_types = JSON.stringify(params.event_types);
      }

      return api(url, config, 'POST', params);
    },
    deregister: function deregister(params) {
      var url = "".concat(config.apiURL, "/events");
      return api(url, config, 'DELETE', params);
    }
  };
}

module.exports = queues;