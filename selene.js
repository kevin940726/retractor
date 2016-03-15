var retractor = require('.');

var uneval = require('./uneval');
var type = require('./type');

module.exports = function (selene) {
  selene.addLocator(function (el) {
    if (type.isValidElement(el)) {
      var filter = '';
      if (el.props) filter = ' props={' + uneval(el.props) + '}';
      return {
        description: '<' + el.type.name + filter + ' />',
        by: retractor.all(el)
      };
    }
  });
};
