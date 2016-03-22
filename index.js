var uneval = require('./uneval');

/* global __retractor */
/* eslint-disable no-eval */

exports.all = function (el) {
  var name = el.type.displayName || el.type.name;
  var filter = uneval({ props: el.props });

  return function (driver) {
    if (isWebElementPromise(driver)) {
      return driver.then(function (element) {
        return element.getDriver().executeScript(findDOMNodes, name, filter, element);
      });
    }
    return driver.executeScript(findDOMNodes, name, filter);
  };
};

function isWebElementPromise(obj) {
  return obj.getId && obj.then;
}

function findDOMNodes(name, filter, scope) {
  return window && window.__retractor
    && window.__retractor.findAllDOMNodes(name, eval(filter), scope);
}
