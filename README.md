# E2E Testing for React Apps

Retractor exposes the internals of a React application for end-to-end testing purposes. This allows you to select DOM nodes based on the name of the React Component that rendered the node as well as its state or properties.


> A retractor is a surgical instrument with which a surgeon can either actively separate the edges of a surgical incision or wound, or can hold back underlying organs and tissues, so that body parts under the incision may be accessed. – [Wikipedia][1]

![retractor](retractor.png)

## Installation

```javascript
npm install --save retractor
```

### Setup

Retractor uses the React Dev-Tools hooks to expose your app's internals. In order for this to work, Retractor must be loaded before React gets initialized.

In a [webpack][4] based setup this can be achieved by adding `retractor/client` to the beginning of the `entry` array:

```javascript
module.exports = {
  entry: [
    'retractor/client',
    './index' //your application entry
  ],
  output: {},
  plugins: [],
  module: {
    loaders: []
  }
}
```

You can verify that Retractor is installed by typing `__retractor` in your Browser's console.

### Interacting with Retractor via Selenium

Once your app exposes the Retractor API you can interact with it via Selenium:

```js
import React from 'react';
import byJSX from 'retractor';
import webdriver from 'selenium-webdriver';

import TodoItem from '../components/TodoItem';

const driver = new webdriver.Builder().forBrowser('phantomjs').build();

driver.get('http://localhost:3000/');

// Find all TodoItems
driver.findElements(byJSX(<TodoItem />));

// Find one TodoItem with a given text
driver.findElement(byJSX(
  <TodoItem todo={{ text: 'Use retractor' }} />
));
```

### Integrating with Selene

Working with the plain webdriver API like in the example above is often quite verbose. Retractor provides bindings for [Selene][3], a 100% backwards compatible wrapper around the official Selenium driver. With Selene the very same example can be written as:

```js
import React from 'react';
import selene from 'selene';
import retractor from 'retractor/selene';

import TodoItem from '../components/TodoItem';

const se = selene({browser: 'phantomjs'}).use(retractor);

se.get('http://localhost:3000/');

// Find all TodoItems
se.findAll(<TodoItem />);

// Find one TodoItem with a given text
se.find(<TodoItem todo={{ text: 'Use retractor' }} />);
```

## Features

### Filter by props

```js
  se.find(<TodoItem todo={{ title: /retractor/ }} />);
  se.find(<TodoItem todo={{ title: /retractor/, completed: false }} />);
  se.find(<TodoItem editing />);
```

Using [deep-match][5] ...

NOTE: note on React warnings

```
"scripts":
  "test-e2e": "NODE_ENV=production mocha ..."
}
```

### Scoped lookups

```js
  se.find(<TodoList key="1" />).findAll(<TodoItem todo={{completed: true}} />);
```

## Integrating with unexpected-webdriver

...


[1]: https://en.wikipedia.org/wiki/Retractor_(medical)
[2]: https://github.com/SeleniumHQ/selenium
[3]: https://github.com/LiquidLabsGmbH/selene
[4]: https://github.com/webpack/webpack
[5]: https://github.com/fgnass/deep-match
