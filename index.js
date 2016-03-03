var devtools = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;

window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = {
  inject: function(renderer) {

    var components = [];

    decorate(renderer.Reconciler, 'mountComponent',
      function(internalInstance, rootID, transaction, context) {
        components.push(internalInstance);
      }
    );

    window.__retractor = {
      components: components
    };

    if (typeof devtools !== 'undefined'
      && typeof devtools.inject === 'function') {
      devtools.inject(renderer);
    }
  }
};

function decorate(obj, attr, fn) {
  var old = obj[attr];
  obj[attr] = function(instance) {
    var res = old.apply(this, arguments);
    fn.apply(this, arguments);
    return res;
  };
  return old;
}

/*
{
    ComponentTree: {
      getClosestInstanceFromNode:
        ReactDOMComponentTree.getClosestInstanceFromNode,
      getNodeFromInstance: function(inst) {
        // inst is an internal instance (but could be a composite)
        if (inst._renderedComponent) {
          inst = getNativeComponentFromComposite(inst);
        }
        if (inst) {
          return ReactDOMComponentTree.getNodeFromInstance(inst);
        } else {
          return null;
        }
      },
    },
    Mount: ReactMount,
    Reconciler: ReactReconciler,
  });
}
*/
//Object.keys(__retractor.cache).map(k => __retractor.cache[k].exports).filter(e => e._instancesByReactRootID)[0]
