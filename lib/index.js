const uneval = require('./uneval');

module.exports = exports = function (component, props) {
  return find(component.displayName || component.name, props);
};

function find(name, props) {
  // Return a custom WebDriver locator function
  const filter = props ? uneval({ props }) : null;
  const fn = function (driver) {
    return byJSX(driver, name, filter);
  };
  fn.displayName = `<${name}${format(props)} />`;
  return fn;
}

function format(props) {
  if (!props) return '';
  const attrs = Object.keys(props).map(p => `${p}={${uneval(props[p])}}`);
  if (!attrs.length) return '';
  return [''].concat(attrs).join(' ');
}

// eslint-disable-next-line no-unused-vars
function byJSX(driver, name, filter) {
  if (isWebElementPromise(driver)) {
    return driver.then(element =>
      element.getDriver().executeScript(findDOMNodes, name, filter, element)
    );
  }
  return driver.executeScript(findDOMNodes, name, filter);
}


function isWebElementPromise(obj) {
  return obj.getId && obj.then;
}

function findDOMNodes(name, filter, scope) {
  return window && window.__retractor
    && window.__retractor.findDOMNodes(name, eval(filter), scope);
}
