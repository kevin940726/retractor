import React from 'react';
import { render } from 'react-dom';
import TodoModel from './TodoModel';
import TodoApp from './TodoApp';

const model = new TodoModel('react-todos');
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from './constants';

function renderApp(route) {
  render(
    <TodoApp model={ model } route={route} />,
    document.getElementById('app')
  );
}

const getHashRoute = () => {
  const hash = document.location.hash;
  const route = hash.substring(2); // TODO improve

  switch (route) {
    case COMPLETED_TODOS:
      return COMPLETED_TODOS;
    case ACTIVE_TODOS:
      return ACTIVE_TODOS;
    default:
      return ALL_TODOS;
  }
};

window.onpopstate = function handler() {
  const route = getHashRoute();
  renderApp(route);
};


model.subscribe(renderApp);
renderApp(getHashRoute());
