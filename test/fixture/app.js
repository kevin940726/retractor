const React = require('react');
const ReactDOM = require('react-dom');
const TodoList = require('./TodoList');
const TodoItem = require('./TodoItem');

function App() {
  return (
    <div>
      <TodoList id="1">
        <TodoItem text="Test React App" />
        <TodoItem text="Use Retractor" />
      </TodoList>
      <TodoList id="2">
        <TodoItem text="Use Retractor Scoping" />
      </TodoList>
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
