const uneval = require('./uneval');

module.exports = exports = function (component, props) {
  return find(component.displayName || component.name, props);
};

function find(name, props) {
  // Return a custom WebDriver locator function
  const filter = props ? uneval({ props }) : null;
  const fn = function (driver) {
    return byJSX(driver, name, filter).then((result) => {
      if (result.length === 0) return reduxWrappedFind(driver, name, filter);
      return result;
    });
  };
  fn.displayName = `<${name}${format(props)} />`;
  return fn;
}

function reduxWrappedFind(driver, name, filter) {
  const innerName = /^.*\((.*)\)$/.exec(name)[1];

  return byJSX(driver, name).then((parentComponents) =>
    Promise.all(parentComponents.map((parentComponent) =>
      byJSX(parentComponent, innerName, filter))
    ).then((elements) =>
      elements.reduce((prev, curr) => prev.concat(curr), [])
    )
  );
}

function format(props) {
  if (!props) return '';
  const attrs = Object.keys(props).map(p => `${p}={${uneval(props[p])}}`);
  if (!attrs.length) return '';
  return [''].concat(attrs).join(' ');
}

function waitForRetractor(driver) {
  return driver.wait(() => driver.executeScript(retractorPresent), 60000);
}

// eslint-disable-next-line no-unused-vars
function byJSX(scope, name, filter) {
  function findScoped(element) {
    const driver = element.getDriver();
    return waitForRetractor(driver).then(
      () => driver.executeScript(findDOMNodes, name, filter, element)
    );
  }

  if (isWebElementPromise(scope)) {
    return scope.then(element => findScoped(element));
  } else if (isWebElement(scope)) {
    return findScoped(scope);
  }

  return waitForRetractor(scope).then(
    () => scope.executeScript(findDOMNodes, name, filter)
  );
}


function isWebElementPromise(obj) {
  return !!obj.getId && !!obj.then;
}

function isWebElement(obj) {
  return !!obj.getId;
}

/* globals __retractor */

function retractorPresent() {
  return typeof __retractor === 'function';
}

function findDOMNodes(name, filter, scope) {
  if (typeof __retractor !== 'function') throw new Error('Retractor not loaded');
  return __retractor(name, eval(filter), scope);
}
