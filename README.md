# jquery-css-mahoro

jQuery plugin for managing CSS animations in a simple way.

## Usage

Example below are the usage with [Animate.css](https://github.com/daneden/animate.css/). You can use any other CSS animations as long as it triggers CSS animation on the element.

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
// For CSS animation that hides element,
$(visibleElement).cssMahoro('animated fadeOut', { hide: true });
```

### Show

```js
// For CSS animation that shows element,
$(hiddenElement).cssMahoro('animated fadeIn', { show: true });

// Custom `display` property
$(hiddenElement).cssMahoro('animated fadeIn', { show: 'inline-block' })
```

## Install

```sh
npm install jquery-css-mahoro
```

## License

jquery.cssMahoro is licensed under the MIT license. (http://opensource.org/licenses/MIT)

