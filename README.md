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

<br>
Override the size of a popup by passing these options (values in %):

```javascript
Popup("<div>Hello</div>", {width: 60, fromTop: 20})
```

If you need to do something after the popup slides onto the screen — play an animation and attach a handler to the "Close" button — pass a second argument to the `show` method:

```javascript
editInvoiceDetails = Popup("<%=j render @invoice %>").show('up', function () {
  blink($('.heading'))
  $(this).on('click', '#close.button', function () {
  	editInvoiceDetails.hide('down')
  })
})
```

That's all I ever need from it. Do you need something else? Feel free to contribute.

## Credits

The code and the animated demo were extracted from [Invoices for Milestones](http://invoicesformilestones.com), a dead simple invoicing tool for self-employed. If you work for yourself, check it out.
