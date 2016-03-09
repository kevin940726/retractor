var deepMatch = require('deep-match');
var type = require('./type');

// Keep a reference to the real devtools
var devtools = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;

if (devtools) {
  // Overwrite the inject method to get hold of the renderer
  var _inject = devtools.inject;
  devtools.inject = function (renderer) {
    inject(renderer);
    _inject.call(devtools, renderer);
  };
} else {
  // Create a fake devtools hook
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = {
    inject: inject
  };
}

function inject(renderer) {
  window.__retractor = {
    renderer: renderer,
    findAllComponents: function (name, filter) {
      return findAllComponentsInternal(renderer, name)
        .filter(function (inst) {
          return !filter || deepMatch(inst, filter);
        });
    },
    findOneComponent: function (name, filter) {
      var result = this.findAllComponents(name, filter);
      if (result.length >= 1) return result[0];
    },
    findAllDOMNodes: function (name, filter) {
      return this.findAllComponents(name, filter)
        .map(function (inst) {
          return renderer.Mount.getNodeFromInstance(inst);
        });
    },
    findOneDOMNode: function (name, filter) {
      var result = this.findAllDOMNodes(name, filter);
      if (result.length >= 1) return result[0];
    }
  };
}

function findAllComponentsInternal(renderer, name) {
  var root = renderer.Mount._instancesByReactRootID['.0'];
  return find(root, function (el) {
    var inst = el._reactInternalInstance;
    if (!name) return inst && inst.getName;
    return inst && inst.getName && inst.getName() === name;
  });
}

/**
 * This is an internal function taken from React TestUtils. See:
 * https://github.com/facebook/react/blob/v0.14.7/src/test/ReactTestUtils.js#L41
 */
function find(inst, test) {
  if (!inst || !inst.getPublicInstance) {
    return [];
  }
  var publicInst = inst.getPublicInstance() || inst._instance;
  var ret = publicInst && test(publicInst) ? [publicInst] : [];
  var currentElement = inst._currentElement;
  if (type.isDOMComponent(publicInst)) {
    var renderedChildren = inst._renderedChildren;
    var key;
    for (key in renderedChildren) {
      if (!renderedChildren.hasOwnProperty(key)) {
        continue;
      }
      ret = ret.concat(
        find(
          renderedChildren[key],
          test
        )
      );
    }
  } else if (
    type.isValidElement(currentElement) &&
    typeof currentElement.type === 'function'
  ) {
    ret = ret.concat(
      find(inst._renderedComponent, test)
    );
  }
  return ret;
}
