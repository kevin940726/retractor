const React = require('react');

module.exports = function TodoItem(props) {
  return (
    <li>{props.text}</li>
  );
};
