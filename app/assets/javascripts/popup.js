function Popup(html, options) {
  return new PopupClass(html, options)
}

function PopupClass(html, options) {
  contents = $(html)
  this.popupWindow = $('<div class="popup"></div>')

  options = $.extend({}, {width: 300}, options || {})
  this.popupWindow.css({
    'width': options.width.toString() + 'px', 
    'margin-left': (options.width/2 * -1).toString() + 'px'
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
  this.backdrop.css('opacity', 0.5)
}
PopupClass.prototype.hideBackdrop = function () {
  this.backdrop.css('opacity', 0)
}
PopupClass.prototype.createCloseButton = function () {
  closeButton = $('<img class="closeButton" src="../app/assets/images/close-button-grey.svg">')
  popupObject = this
  closeButton.click(function () {
    popupObject.hide('down')
  })
  this.popupWindow.append(closeButton)
}

PopupClass.prototype.show = function (direction, options) {
  options = options || {}

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