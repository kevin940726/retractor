const uneval = require('./uneval');

module.exports = exports = function (component, props) {
  const componentNames = [(component.displayName || component.name)];

  const wrappedComponent = component.WrappedComponent;
  if (wrappedComponent) componentNames.push(wrappedComponent.displayName);

  return find(componentNames, props);
};

// Returns a custom WebDriver locator function
function find(componentNames, props) {
  const filter = props ? uneval({ props }) : null;
  const parentName = componentNames[0];
  const wrappedName = componentNames[1];

  function fn(driver) {
    return byJSX(driver, parentName, filter).then((result) => {
      if (result.length === 0 && wrappedName) {
        return byJSX(driver, wrappedName, filter);
      }

      return result;
    });
  }

  fn.displayName = `<${componentNames.join(' or ')}${format(props)} />`;

  return fn;
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

function byJSX(scope, name, filter) {
  function findScoped(element) {
    const driver = element.getDriver();
    return waitForRetractor(driver).then(
      () => driver.executeScript(findDOMNodes, name, filter, element)
    );
  }

  if (isWebElementPromise(scope)) {
    return scope.then(element => findScoped(element));
  }

  return waitForRetractor(scope).then(
    () => scope.executeScript(findDOMNodes, name, filter)
  );
}

function isWebElementPromise(obj) {
  return !!obj.getId && !!obj.then;
}

/* globals __retractor */

function retractorPresent() {
  return typeof __retractor === 'function';
}

function findDOMNodes(name, filter, scope) {
  if (typeof __retractor !== 'function') throw new Error('Retractor not loaded');
  return __retractor(name, eval(filter), scope);
}
