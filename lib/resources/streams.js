"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var api = require('../api');

function streams(config) {
  return {
    retrieve: function retrieve(params) {
      var url = "".concat(config.apiURL, "/streams");
      return api(url, config, 'GET', params);
    },
    getStreamId: function getStreamId(initialParams) {
      var url = "".concat(config.apiURL, "/get_stream_id");

      var params = _objectSpread({}, initialParams);

      if (typeof initialParams === 'string') {
        params = {
          stream: initialParams
        };
      }

      return api(url, config, 'GET', params);
    },
    subscriptions: {
      retrieve: function retrieve(params) {
        var url = "".concat(config.apiURL, "/users/me/subscriptions");
        return api(url, config, 'GET', params);
      }
    },
    topics: {
      retrieve: function retrieve(params) {
        var url = "".concat(config.apiURL, "/users/me/").concat(params.stream_id, "/topics");
        return api(url, config, 'GET');
      }
    },
    deleteById: function deleteById(params) {
      var url = "".concat(config.apiURL, "/streams/").concat(params.stream_id);
      return api(url, config, 'DELETE', params);
    }
  };
}

module.exports = streams;