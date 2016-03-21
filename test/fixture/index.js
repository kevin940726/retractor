import React from 'react';
import { render } from 'react-dom';
import TodoModel from './TodoModel';
import TodoApp from './App';

const model = new TodoModel('react-todos');

function renderApp() {
  render(
    <TodoApp model={ model } />,
    document.getElementById('app')
  );
}

model.subscribe(renderApp);
renderApp();
