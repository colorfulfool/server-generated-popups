function Popup(html, options) {
  return new PopupClass(html, options)
}

function createElement(html) {
  div = document.createElement('div')
  div.innerHTML = html
  generated = div.childNodes
  return (generated.length == 1 ? generated[0] : generated)
}

function setStyle(element, properties) {
  Object.assign(element.style, properties)
}

function defaultsFor(options, defaultOptions) {
  Object.assign(defaultOptions, options)
}


// Constructs a Popup object.
// Options: width, padding
function PopupClass(html, options) {
  this.options = defaultsFor(options, {width: 600})

  this.popupWindow = createElement('<div class="popup">' + html + '</div>')

  actualWidth = Math.min(window.innerWidth, this.options.width)
  setStyle(this.popupWindow, {
    'width': actualWidth.toString() + 'px', 
    'margin-left': (actualWidth/2 * -1).toString() + 'px',
    'padding': this.options.padding
  })

  this.createBackdrop()
}


PopupClass.prototype.distanceFromTop = function () {
  return (window.innerHeight - this.popupWindow.offsetHeight)/2
}
PopupClass.prototype.translate = function (from, to, callback) {
  setStyle(this.popupWindow, {top: from})
  this.popupWindow.animate({top: to}, callback)
}


PopupClass.prototype.createBackdrop = function () {
  this.backdrop = createElement('<div id="popup-backdrop"></div>')
  document.body.appendChild(this.backdrop)
}
PopupClass.prototype.showBackdrop = function () {
  setStyle(this.backdrop, {visibility: 'visible'})
  setStyle(this.backdrop, {opacity: 0.5})
}
PopupClass.prototype.hideBackdrop = function () {
  backdrop = this.backdrop
  setStyle(backdrop, {opacity: 0})
  setTimeout(function () {
    setStyle(backdrop, {visibility: 'hidden'})
  }, 400)
}

PopupClass.prototype.createCloseButton = function () {
  closeButton = createElement('<div class="closeButton"></div>')
  margin = this.options.closeButtonPadding || this.options.padding || '16px'
  setStyle(closeButton, {top: margin, right: margin})

  thisObject = this
  closeButton.click(function () {
    thisObject.hide('down')
  })
  this.popupWindow.appendChild(closeButton)
}


// Slides the popup onto the screen.
// Options: backdrop, closeButton, callback
PopupClass.prototype.show = function (direction, options) {
  options = defaultsFor(options, {backdrop: true, closeButton: true})

  document.body.appendChild(this.popupWindow)
  beyondScreen = (direction == 'up') ? '180%' : '-80%'
  this.translate(beyondScreen, this.distanceFromTop(), options.callback)

  if (options.backdrop)
    this.showBackdrop()
  if (options.closeButton)
    this.createCloseButton()
  return this
}


// Slides the popup out of the screen.
// Accepts no options.
PopupClass.prototype.hide = function (direction) {
  beyondScreen = (direction == 'down') ? '180%' : '-80%'
  this.translate(this.distanceFromTop(), beyondScreen, function () {
    this.remove() // here, `this` means $('.popup')
  })

  this.hideBackdrop()
}