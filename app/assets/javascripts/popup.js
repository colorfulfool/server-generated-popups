function Popup(html, options) {
  return new PopupClass(html, options)
}

function PopupClass(html, options) {
  contents = $(html)
  this.popupWindow = $('<div class="popup"></div>')

  this.options = $.extend({}, {width: 600}, options || {})
  actualWidth = Math.min($(window).width(), this.options.width) // TODO: use CSS
  this.popupWindow.css({
    'width': actualWidth.toString() + 'px', 
    'margin-left': (actualWidth/2 * -1).toString() + 'px',
    'padding': this.options.padding
  })
  this.popupWindow.append(contents)

  this.createBackdrop()
}

PopupClass.prototype.distanceFromTop = function () {
  return ($(window).height() - this.popupWindow.height())/2
}
PopupClass.prototype.translate = function (from, to, callback) {
  this.popupWindow.css('top', from)
  this.popupWindow.animate({top: to}, callback)
}

PopupClass.prototype.createBackdrop = function () {
  this.backdrop = $('<div id="popup-backdrop"></div>')
  $('body').append(this.backdrop)
}
PopupClass.prototype.showBackdrop = function () {
  this.backdrop.css('visibility', 'visible')
  this.backdrop.css('opacity', 0.5)
}
PopupClass.prototype.hideBackdrop = function () {
  backdrop = this.backdrop
  backdrop.css('opacity', 0)
  setTimeout(function () {
    backdrop.css('visibility', 'hidden')
  }, 400)
}
PopupClass.prototype.createCloseButton = function () {
  closeButton = $('<div class="closeButton"></div>')
  margin = this.options.closeButtonPadding || this.options.padding || '16px'
  closeButton.css({top: margin, right: margin})
  popupObject = this
  closeButton.click(function () {
    popupObject.hide('down')
  })
  this.popupWindow.append(closeButton)
}

PopupClass.prototype.show = function (direction, options) {
  options = $.extend({backdrop: true, closeButton: true}, options)

  $('body').append(this.popupWindow)
  beyondScreen = (direction == 'up') ? '180%' : '-80%'
  this.translate(beyondScreen, this.distanceFromTop(), options.callback)

  if (options.backdrop)
    this.showBackdrop()
  if (options.closeButton)
    this.createCloseButton()
  return this
}

PopupClass.prototype.hide = function (direction) {
  beyondScreen = (direction == 'down') ? '180%' : '-80%'
  this.translate(this.distanceFromTop(), beyondScreen, function () {
    this.remove() // this == $('.popup') here
  })

  this.hideBackdrop()
}