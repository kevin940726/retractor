var retractor = require('.');
var type = require('./type');

module.exports = function (selene) {
  selene.addLocator(function (el, all) {
    if (type.isValidElement(el)) {
      return all ? retractor.all(el) : retractor.one(el);
    }
  });
};

module.exports.isInstalled = function (driver) {
  return driver.executeScript(function () {
    return window && !!window.__retractor;
  })
  .then(function (installed) {
    return installed;
  });
};
