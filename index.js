var generate = require('escodegen').generate;
var lave = require('lave');

/* global __retractor */
/* eslint-disable no-eval */
exports.one = function one(el) {
  var filter = lave({ props: el.props }, { generate: generate });
  return function (driver) {
    return driver.executeScript(
      function (name, filterString) {
        return window && window.__retractor
          && window.__retractor.findOneDOMNode(name, eval(filterString));
      },
      el.type.name, filter
    );
  };
};

exports.all = function one(el) {
  var filter = lave({ props: el.props }, { generate: generate });
  return function (driver) {
    return driver.executeScript(
      function (name, filterString) {
        return window && window.__retractor
          && window.__retractor.findAllDOMNodes(name, eval(filterString));
      },
      el.type.name, filter
    );
  };
};
