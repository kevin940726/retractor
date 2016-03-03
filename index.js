var isMatch = require('lodash.ismatch')
var devtools = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;

if (devtools) {
  var _inject = devtools.inject;
  devtools.inject = function(renderer) {
    inject(renderer);
    _inject.call(devtools, renderer);
  }
}
else {
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = {
    inject: inject
  };
}

function inject(renderer) {
  window.__retractor = {
    renderer: renderer,
    findAllComponents: function(name, filter) {
      return findAllComponentsInternal(renderer, name).filter(componentFilter(filter));
    },
    findOneComponent: function(name, filter) {
      var result = this.findAllComponents(name, filter);
      if(result.length >= 1) return result[0];
    },
    findAllDOMNodes: function(name, filter) {
      return this.findAllComponents(name, filter)
        .map(function(inst) {
          return renderer.Mount.getNodeFromInstance(inst);
        });
    },
    findOneDOMNode: function(name, filter) {
      var result = this.findAllDOMNodes(name, filter);
      if(result.length >= 1) return result[0];
    }
  };
}

function findAllComponentsInternal(renderer, name) {
  var root = renderer.Mount._instancesByReactRootID['.0'];
  return find(root, function(el) {
    var inst = el._reactInternalInstance
    if(!name) return inst && inst.getName;
    return inst && inst.getName && inst.getName() === name;
  })
}

function componentFilter(filter) {
  return function(inst) {
    if (filter) {
      if (filter.props) {
        for (var prop in filter.props) {
          return isMatch(inst.props[prop], filter.props[prop]);
        }
      }
    }
    return true;
  }
}

function isDOMComponent(inst) {
  return !!(inst && inst.nodeType === 1 && inst.tagName);
}

var REACT_ELEMENT_TYPE =
  (typeof Symbol === 'function'
  && Symbol.for
  && Symbol.for('react.element'))
  || 0xeac7;

function isValidElement(object) {
  return (
    typeof object === 'object' &&
    object !== null &&
    object.$$typeof === REACT_ELEMENT_TYPE
  );
}
/**
 * This is an internal function taken from React TestUtils. See:
 * https://github.com/facebook/react/blob/v0.14.7/src/test/ReactTestUtils.js#L41
 */
function find(inst, test) {
  if (!inst || !inst.getPublicInstance) {
    return [];
  }
  var publicInst = inst.getPublicInstance();
  var ret = test(publicInst) ? [publicInst] : [];
  var currentElement = inst._currentElement;
  if (isDOMComponent(publicInst)) {
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
    isValidElement(currentElement) &&
    typeof currentElement.type === 'function'
  ) {
    ret = ret.concat(
      find(inst._renderedComponent, test)
    );
  }
  return ret;
}
