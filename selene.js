var retractor = require('.');

var uneval = require('./uneval');
var type = require('./type');

module.exports = function (selene) {
  selene.addLocator(function (el) {
    if (type.isValidElement(el)) {
      var filter = '';
      if (el.props) filter = ' props={' + uneval(el.props) + '}';
      var componentName = el.type.displayName || el.type.name;

      return {
        description: '<' + componentName + filter + ' />',
        by: retractor(el)
      };
    }
  });
};
