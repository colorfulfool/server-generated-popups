You want to briefly show something to the user. You decide on a popup. You look at your options: `window.open()` is easy, but is blocked by the browser when called not in a `click` handler; JavaScript plugins out there are over-engineered and want you to create dedicated routes, hidden links or embed your content where it doesn't belong just to accomodate them. Oh boy. Does it have to be that bad?

No. Now you can do this:

```javascript
window.invoicePreview = Popup("<%=j render @invoice %>").show('up')

$('#approve.button').click(function () {
  window.invoicePreview.hide('up')
})
```

Animations, styles -- all included. One line gets you fully working thing.

Perfect with [Server-generated JavaScript Responses](https://signalvnoise.com/posts/3697-server-generated-javascript-responses) and [Turbolinks™](https://github.com/turbolinks/turbolinks), but not limited to them.

## Installation

### Rails

	gem 'server-generated-popups'

### Any framework

Download this repo. Grab `popup.js` and `popup.css` from the `assets` directory and put them wherever you put JS and CSS in your framework.

## Usage

Raise a popup from the bottom of the screen:

	popup = Popup("<div>Hello</div>").show('up')

Fall a popup from the top of the screen:

	popup = Popup("<div>Hello</div>").show('down')

Lauch the popup away through the top of the screen:

	popup.hide('up')

Sink the popup down into the bottom of the screen:

	popup.hide('down')

That's all I ever needed from it. Do you need somethting else? Feel free to contribute.

## Credits

colorfulfool.github.io