# jquery-css-mahoro [![Build Status](https://travis-ci.org/pc035860/jquery-css-mahoro.svg?branch=master)](https://travis-ci.org/pc035860/jquery-css-mahoro) [![npm](https://img.shields.io/npm/v/jquery-css-mahoro.svg)](https://www.npmjs.com/package/jquery-css-mahoro)

jQuery plugin for managing CSS animations in a simple way.

## What is does

CSS Mahoro adds/removes CSS animation classes for you at the right time

1. Adds CSS animation class
2. CSS animation running
3. Removes CSS animation class

## Usage

Example below are the usage with [Animate.css](https://github.com/daneden/animate.css/).
**You can use any CSS animation as long as it triggers CSS animation on the element.**

### Basic

```js
$(...).cssMahoro('animated bounce');
```

### Chaining animations with promise

```js
// Chaining animations with promise
$(...).cssMahoro('animated bounce')
.then(function (elm) {
  return $(elm).cssMahoro('animated flash');
})
.then(function () {
  return $.when(
    $(...).cssMahoro('animated fadeIn'),
    $(...).cssMahoro('animated fadeOut')
  );
});
```

### Hide

```js
// For CSS animation that hides element
$(visibleElement).cssMahoro('animated fadeOut', { hide: true });
```

### Show

```js
// For CSS animation that shows element
// default display is `block`
$(hiddenElement).cssMahoro('animated fadeIn', { show: true });

// Custom `display` property
$(hiddenElement).cssMahoro('animated fadeIn', { show: 'inline-block' })
```

## Install

### NPM

```sh
npm install jquery-css-mahoro
```

### CDN

CSS Mahoro uses [npmcdn](https://npmcdn.com/).

```html
<script src="https://npmcdn.com/jquery-css-mahoro/dist/jquery.css-mahoro.min.js"></script>
```

## License

jquery-css-mahoro is licensed under the MIT license. (http://opensource.org/licenses/MIT)

