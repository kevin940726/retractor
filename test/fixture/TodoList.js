import React from 'react';
import TodoItem from './TodoItem';

export default function () {
  return (
    <ul>
      <TodoItem text="Test React App" />
      <TodoItem text="Use Retractor" />
    </ul>
  );
}
