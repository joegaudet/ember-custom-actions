define('ember-custom-actions/utils/normalize-payload', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (payload, operation) {
    if (operation) {
      (false && !(!!transformFunctions[operation]) && Ember.assert("This normalize method of custom action's payload does not exist. Check Ember.String documentation!", !!transformFunctions[operation]));

      return transformObject(payload, operation);
    } else {
      return payload;
    }
  };

  var transformFunctions = {
    camelize: Ember.String.camelize,
    capitalize: Ember.String.capitalize,
    classify: Ember.String.classify,
    dasherize: Ember.String.dasherize,
    decamelize: Ember.String.decamelize,
    underscore: Ember.String.underscore
  };

  function transformObject(object, operation) {
    if (object instanceof Object && !Ember.isArray(object)) {
      var data = {};

      Object.keys(object).forEach(function (key) {
        var transform = transformFunctions[operation];
        data[transform(key)] = transformObject(object[key], operation);
      });

      return data;
    } else {
      return object;
    }
  }
});