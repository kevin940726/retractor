/* global __retractor */
exports.one = function one(el) {
  return function (driver) {
    return driver.executeScript(
      function (name, filter) {
        return window.__retractor.findOneDOMNode(name, filter);
      },
      el.type.name, { props: el.props }
    );
  };
};

exports.all = function one(el) {
  return function (driver) {
    return driver.executeScript(
      function (name, filter) {
        return window.__retractor.findAllDOMNodes(name, filter);
      },
      el.type.name, { props: el.props }
    );
  };
};
