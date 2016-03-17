const React = require('react');

module.exports = function TodoList(props) {
  return (
    <ul>
      {props.children}
    </ul>
  );
};
