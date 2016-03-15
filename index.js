var uneval = require('./uneval');

/* global __retractor */
/* eslint-disable no-eval */
exports.one = function one(el) {
  return function (driver) {
    return driver.executeScript(
      function (name, filter) {
        return window && window.__retractor
          && window.__retractor.findOneDOMNode(name, eval(filter));
      },
      el.type.name, uneval({ props: el.props })
    );
  };
};

exports.all = function one(el) {
  return function (driver) {
    return driver.executeScript(
      function (name, filter) {
        return window && window.__retractor
          && window.__retractor.findAllDOMNodes(name, eval(filter));
      },
      el.type.name, uneval({ props: el.props })
    );
  };
};
