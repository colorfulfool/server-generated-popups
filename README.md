*What if your controller could respond with a modal dialog instead of a page visit? Well guess what, now it can!*

<sub>views/invoices/show.js.erb<sub>
```javascript
Popup("<%=j render @invoice %>").show('up')
```

![Animated demonstration](http://i.giphy.com/3oEjI0kLsPZ7u6l8ru.gif)

Check the [live demo](https://colorfulfool.github.io/server-generated-popups/demo/).

Animations, styles — all included. One line gets you a fully working solution.

Perfect with Rails and its [Server-generated JavaScript Responses](https://signalvnoise.com/posts/3697-server-generated-javascript-responses), but not limited to them.

## Installation

### Rails

```ruby
gem 'server-generated-popups'
```

Then `require popup` into both your styleheet and javascript files.

### Any framework

Download this repo. Grab `popup.js` and `popup.css` from the `assets` directory and put them wherever you put JS and CSS in your framework. Follow examples in the following section, they are written to apply to any web framework.

## Usage

Raise a popup from the bottom of the screen:

```javascript
popup = Popup("<div>Hello</div>").show('up')
```

Sink the popup down through the bottom of the screen:

```javascript
popup.hide('down')
```

### Options

Your popup content needs extra **padding** around it to look good? Pass the value in any units:

```javascript
Popup("<div>Hello</div>", {padding: '20px'})
```

Override **width** of the popup by passing the value in px:

```javascript
Popup("<div>Hello</div>", {width: 300})
```

By default the popup will show with a **close button** in the top right corner and a **semi-transparent backdrop** beind ([like this](https://colorfulfool.github.io/server-generated-popups/demo/)). You can disable either or both:

```javascript
Popup("<div>Hello</div>", {closeButton: false, backdrop: false}).show('up')
```

If you need to **do something after the popup slides onto the screen** — pass a callback to `show`.

```javascript
editInvoiceDetails = Popup("<%=j render @invoice %>").show('up', function (popupWindow) {
    popupWindow.style.backgroundColor = "red"
    this.hide('down')
  }
})
```

## Development

### Roadmap

- [x] implement animations and positioning with CSS instead of Javascript
- [x] drop jQuery dependence (use vanilla Javascript instead)

### Tools

Open demo/index.html in your browser. Make changes to the code, see the results in real time.
