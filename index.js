/* global __retractor */

exports.one = function one(el) {
  return __retractor.findOneDOMNode(el.type.name, { props: el.props });
};

exports.all = function one(el) {
  return __retractor.findAllDOMNodes(el.type.name, { props: el.props });
};
