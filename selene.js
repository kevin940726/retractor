var retractor = require('.');
var type = require('./type');

module.exports = function (selene) {
  selene.addLocator(function (query, all) {
    if (type.isValidElement(query)) {
      return all ? retractor.all(query) : retractor.one(query);
    }
  });
};

module.exports.isInstalled = function (driver) {
  return driver.executeScript(function () {
    return window && !!window.__retractor;
  });
};
