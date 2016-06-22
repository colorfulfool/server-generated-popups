You need to briefly show something to the user. You decide on a popup. You look at your options: `window.open()` is easy, but is blocked by the browser when called not in a `click` handler; JavaScript plugins are over-engineered and want you to create dedicated routes, hidden links or embed your content where it doesn't belong just to accomodate them. Oh boy. Does it have to be that bad? No.

Now you can do this:

```javascript
Popup("<%=j render @invoice %>").show('up')
```

![Animated demonstration](http://i.giphy.com/3oEjI0kLsPZ7u6l8ru.gif)

Animations, styles — all included. One line gets you a fully working solution.

Perfect with [Server-generated JavaScript Responses](https://signalvnoise.com/posts/3697-server-generated-javascript-responses) and [Turbolinks™](https://github.com/turbolinks/turbolinks), but not limited to them.

## Installation

The plugin depends on jQuery, but you already have it, do you?

### Rails

```ruby
gem 'server-generated-popups'
```

Then `require popup` into both your styleheet and javascript files.

### Any framework

Download this repo. Grab `popup.js` and `popup.css` from the `assets` directory and put them wherever you put JS and CSS in your framework.

## Usage

Override the size of a popup by passing these options (values in %):

```javascript
Popup("<div>Hello</div>", {width: 60, fromTop: 20})
```

<br />
Raise a popup from the bottom of the screen:

```javascript
popup = Popup("<div>Hello</div>").show('up')
```

Fall a popup from the top of the screen:

```javascript
popup = Popup("<div>Hello</div>").show('down')
```

Launch the popup away through the top of the screen:

```javascript
popup.hide('up')
```

Sink the popup down through the bottom of the screen:

```javascript
popup.hide('down')
```

That's all I ever need from it. Do you need something else? Feel free to contribute.

### Events

Say, you have buttons in your popup and want to handle clicks on them. Well, my usual advice is to go for `<%= link_to 'Button', remote: true %>` and a [JavaScript response](https://signalvnoise.com/posts/3697-server-generated-javascript-responses), but sometimes you want to do something right there on the front-end. In such case, hook up to `popup:show` event:

```javascript
$(document).on('popup:show', function (popup) {
  $('.popup #close.button').on('click', function () {
    popup.hide('down')
  })
})
```

## Credits

[Anton Khamets](http://colorfulfool.github.io)
