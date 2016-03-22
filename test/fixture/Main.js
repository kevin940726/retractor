import React, { Component, PropTypes } from 'react';
import TodoItem from './TodoItem';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editing: null,
    };
    this.save = this.save.bind(this);
    this.cancel = this.cancel.bind(this);
    this.edit = this.edit.bind(this);
  }

  edit(todo) {
    this.setState({ editing: todo.id });
  }

  save(todoToSave, text) {
    this.props.onSave(todoToSave, text);
    this.setState({ editing: null });
  }

  cancel() {
    this.setState({ editing: null });
  }

  resolveActiveTodoCount(todos) {
    return todos.reduce((accum, todo) => (
      todo.completed ? accum : accum + 1
    ), 0);
  }

  render() {
    const { todos, onToggle, onToggleAll, onDestroy } = this.props;
    const activeTodoCount = this.resolveActiveTodoCount(todos);
    const todoItems = todos.map(todo =>
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDestroy={onDestroy}
          onEdit={this.edit}
          editing={this.state.editing === todo.id}
          onSave={this.save}
          onCancel={this.cancel}
        />
    );

    if (todos.length) {
      return (
        <section className="main">
          <input
            className="toggle-all"
            type="checkbox"
            onChange={onToggleAll}
            checked={activeTodoCount === 0}
          />
          <ul className="todo-list">
            {todoItems}
          </ul>
        </section>
      );
    }
    return null;
  }

}

Main.propTypes = {
  todos: PropTypes.array.isRequired,
  onToggle: PropTypes.func.isRequired,
  onToggleAll: PropTypes.func.isRequired,
  onDestroy: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default Main;
