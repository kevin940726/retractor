/* eslint-disable react/prefer-es6-class  */
import React, { PropTypes } from 'react';
import { ENTER_KEY } from './constants';
import { wrapper } from './wrapper';

const Header = React.createClass({

  propTypes: {
    model: PropTypes.object.isRequired,
    placeholder: PropTypes.string,
  },

  getInitialState() {
    return {
      newTodo: '',
    };
  },

  handleNewTodoKeyDown(event) {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }

    event.preventDefault();

    const val = this.state.newTodo.trim();

    if (val) {
      this.props.model.addTodo(val);
      this.setState({ newTodo: '' });
    }
  },

  handleChange(event) {
    this.setState({ newTodo: event.target.value });
  },

  render() {
    const { placeholder } = this.props;
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder={ placeholder }
          value={this.state.newTodo}
          onKeyDown={this.handleNewTodoKeyDown}
          onChange={this.handleChange}
          autoFocus
        />
      </header>
    );
  },
});

export default wrapper(Header);
