"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var api = require('../api');

function messages(config) {
  var baseURL = "".concat(config.apiURL, "/messages");
  var flagsURL = "".concat(baseURL, "/flags");
  return {
    retrieve: function retrieve(initialParams) {
      var url = "".concat(config.apiURL, "/messages");

      var params = _objectSpread({}, initialParams);

      if (params.narrow) {
        params.narrow = JSON.stringify(params.narrow);
      }

      return api(url, config, 'GET', params);
    },
    send: function send(params) {
      var url = "".concat(config.apiURL, "/messages");
      return api(url, config, 'POST', params);
    },
    render: function render(initialParams) {
      var url = "".concat(config.apiURL, "/messages/render");

      var params = _objectSpread({}, initialParams);

      if (typeof initialParams === 'string') {
        params = {
          content: initialParams
        };
      }

      return api(url, config, 'POST', params);
    },
    update: function update(params) {
      var url = "".concat(config.apiURL, "/messages/").concat(params.message_id);
      return api(url, config, 'PATCH', params);
    },
    flags: {
      add: function add(initialParams) {
        // params.flag can be one of 'read', 'starred', 'mentioned',
        // 'wildcard_mentioned', 'has_alert_word', 'historical',
        var params = _objectSpread({}, initialParams);

        params.op = 'add';

        if (params.messages) {
          params.messages = JSON.stringify(params.messages);
        }

        return api(flagsURL, config, 'POST', params);
      },
      remove: function remove(initialParams) {
        // params.flag can be one of 'read', 'starred', 'mentioned',
        // 'wildcard_mentioned', 'has_alert_word', 'historical',
        var params = _objectSpread({}, initialParams);

        params.op = 'remove';

        if (params.messages) {
          params.messages = JSON.stringify(params.messages);
        }

        return api(flagsURL, config, 'POST', params);
      }
    },
    getById: function getById(params) {
      var url = "".concat(config.apiURL, "/messages/").concat(params.message_id);
      return api(url, config, 'GET', params);
    },
    getHistoryById: function getHistoryById(params) {
      var url = "".concat(config.apiURL, "/messages/").concat(params.message_id, "/history");
      return api(url, config, 'GET', params);
    },
    deleteReactionById: function deleteReactionById(params) {
      var url = "".concat(config.apiURL, "/messages/").concat(params.message_id, "/reactions");
      return api(url, config, 'DELETE', params);
    },
    deleteById: function deleteById(params) {
      var url = "".concat(config.apiURL, "/messages/").concat(params.message_id);
      return api(url, config, 'DELETE', params);
    }
  };
}

module.exports = messages;