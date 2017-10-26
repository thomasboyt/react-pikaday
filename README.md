# react-pikaday

[![Build Status](https://travis-ci.org/thomasboyt/react-pikaday.svg?branch=master)](https://travis-ci.org/thomasboyt/react-pikaday) [![npm](https://img.shields.io/npm/v/react-pikaday.svg)](https://www.npmjs.com/package/react-pikaday)

A component wrapper around [Pikaday](https://github.com/dbushell/Pikaday).

**[View Example](http://thomasboyt.github.io/react-pikaday/)**

## Importing

### Normal

To import Pikaday without any CSS:

```javascript
import Pikaday from 'react-pikaday';
```

You'll then need to make sure you include the CSS from `pikaday/css/pikaday.css`.

### Bundled

If you're using [webpack](http://webpack.github.io/) with a configured
[style-loader](https://github.com/webpack/style-loader) for CSS, you can actually require this
component along with the Pikaday CSS in one go:

```javascript
import Pikaday from 'react-pikaday/bundled';
```

See the example app in this repo and the `webpack.config.js` for an example of how this can be configured.

## Usage

```javascript
import React from 'react';
import Pikaday from 'react-pikaday';

class MyComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      date: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({ date });
  }

  render() {
    const date = this.state.date;
    return (
      <div>
        <p>
          The date is {date.toDateString()}
        </p>
        <Pikaday value={date} onChange={this.handleChange} />
      </div>
    );
  }
}
```

## Properties

<table>
  <tr>
    <td><code>value</code></td>
    <td>A Date object to set the currently-displayed date to.</td>
  </tr>
  <tr>
    <td><code>onChange</code></td>
    <td>
      A callback called when the date is updated by the user. Passes a Date object as the first
      argument.
    </td>
  </tr>
  <tr>
    <td><code>valueLink</code></td>
    <td>
      Instead of manually hooking up value/onChange to a state variable, you can instead use
      <a href="http://facebook.github.io/react/docs/two-way-binding-helpers.html">LinkedStateMixin</a>
      to bind the two.
    </td>
  </tr>
</table>
