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

    // Delegate to real devtools (if present)
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
