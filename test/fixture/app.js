/* eslint-disable react/prefer-es6-class  */
import React, { PropTypes } from 'react';
import { Router } from 'director';
import Header from './Header';
import TodoList from './TodoList';
import TodoFooter from './Footer';

import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from './constants';

const TodoApp = React.createClass({

  propTypes: {
    model: PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      route: ALL_TODOS,
    };
  },

  componentDidMount() {
    const setState = this.setState;
    const router = new Router({
      '/': setState.bind(this, { route: ALL_TODOS }),
      '/active': setState.bind(this, { route: ACTIVE_TODOS }),
      '/completed': setState.bind(this, { route: COMPLETED_TODOS }),
    });
    router.init('/');
  },

  toggleAll(event) {
    const checked = event.target.checked;
    this.props.model.toggleAll(checked);
  },

  toggle(todoToToggle) {
    this.props.model.toggle(todoToToggle);
  },

  destroy(todo) {
    this.props.model.destroy(todo);
  },

  save(todoToSave, text) {
    this.props.model.save(todoToSave, text);
  },

  clearCompleted() {
    this.props.model.clearCompleted();
  },

  resolveTodosByFilter(todos) {
    return todos.filter(todo => {
      switch (this.state.route) {
        case ACTIVE_TODOS:
          return !todo.completed;
        case COMPLETED_TODOS:
          return todo.completed;
        default:
          return true;
      }
    });
  },

  renderFooter(todos) {
    const activeTodoCount = todos.reduce((accum, todo) => (
      todo.completed ? accum : accum + 1
    ), 0);

    const completedCount = todos.length - activeTodoCount;

    if (activeTodoCount || completedCount) {
      return (
        <TodoFooter
          count={activeTodoCount}
          completedCount={completedCount}
          route={this.state.route}
          onClearCompleted={this.clearCompleted}
        />
      );
    }
    return null;
  },

  render() {
    const { model } = this.props;
    const { todos } = model;
    const shownTodos = this.resolveTodosByFilter(todos);
    const footer = this.renderFooter(todos);

    return (
      <div>
        <Header model={ model } />
        <TodoList todos={shownTodos}
          onToggle={this.toggle}
          onToggleAll={this.toggleAll}
          onDestroy={this.destroy}
          onSave={this.save}
        />
      {footer}
      </div>
    );
  },
});

export default TodoApp;
