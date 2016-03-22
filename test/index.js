import expect from 'unexpected';
import React from 'react';
import selene from 'selene';
import retractor from '../selene';

import TodoItem from './fixture/TodoItem';

describe('retractor', () => {
  const se = selene().use(retractor);

  beforeEach(() =>
    se.goto(`file://${__dirname}/fixture/index.html`)
  );

  beforeEach(() => {
    se.executeScript(() => {
      const list1 = [
        {
          id: '31202915-f2e7-4506-a96a-8acdf3d2a680',
          title: 'Test React App',
          completed: true,
        }, {
          id: '39fb31e6-4539-4d77-9868-f3f0cab72297',
          title: 'Use Retractor',
          completed: false,
        },
      ];
      const list2 = [
        {
          id: 'fb03277a-e4ab-4346-9615-00cc4e75804c',
          title: 'Use Retractor Scoping',
          completed: false,
        }, {
          id: 'ccc26b71-e8ee-4073-bec8-1ccc6da239a0',
          title: 'Try out Selene',
          completed: false,
        },
      ];
      localStorage.setItem('todolist-1', JSON.stringify(list1));
      localStorage.setItem('todolist-2', JSON.stringify(list2));
    });
    return se.navigate().refresh();
  });

  it('should find a single element', () => {
    const item = se.find(<TodoItem />);
    return expect(item, 'when fulfilled', 'to be a', selene.webdriver.WebElement);
  });

  it('should find a single element by props', () => {
    const item = se.find(<TodoItem todo={{ title: /React/ }} />);
    return expect(item, 'when fulfilled', 'to be a', selene.webdriver.WebElement);
  });

  it('should find all elements', () => {
    const items = se.findAll(<TodoItem />);
    return expect(items, 'when fulfilled', 'to have length', 4);
  });

  it('should provide a descriptive error message', () => {
    const item = se.find(<TodoItem todo={{ title: /Not found/ }} />);
    return expect(item, 'when rejected', 'to have message',
      /No such element: <TodoItem props=\{\(\{ \'todo\': \{ \'title\': \/Not found\/ \} \}\)\} \/>/
    );
  });

  it('should support selene filters', () => {
    se.goto(`file://${__dirname}/fixture/index.html#/active`);

    const items = se.findAll(
      'li', { text: /^Use Retractor$/ }
    );
    return expect(items, 'when fulfilled', 'to have length', 1);
  });
});
