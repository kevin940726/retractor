const React = require('react');

module.exports = function TodoItem(props) {
  return (
    <li style={{ visibility: props.hidden ? 'hidden' : 'visible' }}>{props.text}</li>
  );
};
